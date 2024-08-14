import React, { useState, useRef, useEffect, useCallback } from 'react';

const DEFAULT_TRANSITION_DURATION = 300;
const DEFAULT_PADDING = 10;
const DEFAULT_ARROW_SIZE = 30;

export enum DropdownVisibility {
  Opening,  // Animating open
  Open,     // Fully open
  Closing,  // Animating close
  Closed,   // Fully closed
}

export interface ListItemEventTarget extends EventTarget {
  clientHeight: number;
  clientLeft: number;
  clientTop: number;
  clientWidth: number;

  offsetHeight: number;
  offsetLeft: number;
  offsetTop: number;
  offsetWidth: number;

  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
}

export interface Border {
  color?: string;
  width: number;
  style?: string;
  radius?: string | number;
}

interface CommonStyle {
  border?: Border | string;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  cursor?: string;
}

export interface Placeholder {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
}

export interface ComponentStyle extends CommonStyle {
  arrowColor?: string;
  arrowBorderColor?: string;
  arrowHeight?: number;
  arrowWidth?: number;
}

export interface DropdownStyle extends CommonStyle {
  animationDuration?: number;
  dropdownDirection?: 'up' | 'down';
  hoverColor?: string;
  maxDropHeight?: number;
  selectedColor?: string;
  selectedBackgroundColor?: string;
  separatorColor?: string;
  separatorThickness?: number;
  separatorStyle?: 'solid' | 'dotted' | 'dashed';
}

export interface Size {
  height: number;
  width: number;
}

export interface ArrowComponentProps {
  size: Size;
  color: string;
  borderColor?: string;
  visibility: DropdownVisibility;
  animationDuration: number;
}

interface ScrollData {
  visibleHeight: number;
  totalHeight: number;
  scrollPosition: number;
  maxScroll: number;
  client: {
    height: number | undefined;
    left: number | undefined;
    top: number | undefined;
    width: number | undefined;
  };
  offset: {
    height: number | undefined;
    left: number | undefined;
    top: number | undefined;
    width: number | undefined;
  };
  scroll: {
    height: number | undefined;
    left: number | undefined;
    top: number | undefined;
    width: number | undefined;
  };
}

interface DropdownProps<T> {
  items: T[];
  ArrowComponent?: React.FC<ArrowComponentProps>;
  renderItem: (item: T | null, index: number, isSelected: boolean) => React.ReactNode;
  width?: number | string;
  padding?: number;
  onSelect?: (item: T | null, index: number) => void;
  border?: Border | string;
  placeholder?: Placeholder;
  componentStyle?: ComponentStyle;
  dropdownStyle?: DropdownStyle;
  disabled?: boolean;
  allowNoSelection?: boolean;
}

export function Dropdown<T>({
  ArrowComponent = DefaultArrow,
  items,
  renderItem,
  onSelect,
  width = 'auto',
  padding = DEFAULT_PADDING,
  placeholder,
  componentStyle,
  dropdownStyle,
  border = { color: 'transparent', width: 0, style: 'none', radius: 0 },
  disabled = false,
  allowNoSelection = false,
}: DropdownProps<T>) {
  const [visibility, setVisibility] = useState<DropdownVisibility>(DropdownVisibility.Closed);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const scrollData = useRef<ScrollData | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const animationTimeout = useRef<NodeJS.Timeout>();
  
  // Animation related
  const animationDuration = dropdownStyle?.animationDuration || DEFAULT_TRANSITION_DURATION;
  const transition = `max-height ${animationDuration / 1000}s ease, opacity ${animationDuration / 1000}s ease`;

  // Ensure the selected item is fully visible within the dropdown
  const ensureVisible = useCallback(() => {
    if (selectedIndex < 0 || !listRef.current || !itemRefs.current[selectedIndex]) return;
    
    const { client, offset, scroll } = scrollData.current || {};
    if (!client || !offset || !scroll) return;

    // Safe numbers
    const scrollTop = scroll.top || 0;
    const clientHeight = client.height || 0;

    // The position and height of the selected item
    const selectedItemPosition = itemRefs.current[selectedIndex].offsetTop;
    const selectedItemHeight = itemRefs.current[selectedIndex].offsetHeight;

    // Guard clause to prevent scrolling if the selected item is already visible
    if (selectedItemPosition >= scrollTop && selectedItemPosition + selectedItemHeight <= scrollTop + clientHeight) return;

    // Move the selected item to the top of the dropdown list
    listRef.current.scrollTo({
      top: selectedItemPosition - (Math.floor(client.height || 0)) / 2 + selectedItemHeight / 2,
      behavior: 'smooth',
    })
  }, [selectedIndex]);

  // Start the closing dropdown animation. The callback is used when the animation is done
  // to delay updating the parent component until the animation is done.
  function closeDropdown(callback: () => void = () => { }) {
    setVisibility(DropdownVisibility.Closing);
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => {
      setVisibility(DropdownVisibility.Closed)
      callback();
    }, animationDuration);
  }

  // Start the opening dropdown animation
  function openDropdown() {
    ensureVisible();
    setVisibility(DropdownVisibility.Opening);
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => {
      setVisibility(DropdownVisibility.Open);
    }, animationDuration);
  }

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node | null))
        closeDropdown();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Adjusting the selected index by +/- 1. Updates the selected item as well.
  function wheelAdjustment(increase: boolean) {
    setSelectedIndex((prev) => {
      if (increase) {
        return prev === items.length - 1 ? prev : prev + 1;
      } else {
        return prev <= 0 ? allowNoSelection ? -1 : 0 : prev - 1;
      }
    });
    setSelectedItem((prev) => {
      if (prev === null) return increase ? items[0] : null;
      if (increase) {
        const nextIndex = items.indexOf(prev) + 1;
        return nextIndex === items.length ? prev : items[nextIndex];
      } else {
        const nextIndex = items.indexOf(prev) - 1;
        return nextIndex === -1 ? allowNoSelection ? null : prev : items[nextIndex];
      }
    });
  }

  // Handles the wheel event, adjusting the selected index by +/- 1
  const onWheel = (event: React.WheelEvent) => {
    if (disabled) return;
    const increase = event.deltaY > 0;
    wheelAdjustment(increase);
  };

  // Toggles the dropdown visibility
  const toggleDropdown = () => {
    if (disabled) return;
    if (visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  // Handles the selection of an item
  const handleItemClick = (item: T | null, index: number) => {
    setSelectedIndex(index);
    setSelectedItem(item);
    closeDropdown(() => {
      onSelect?.(item, index);
    });
  };

  // Create borderStyle... if border is a string, convert it to the object properties of Border
  const borderObject = toBorder(border);
  const borderStyle = `${borderObject.width}px ${borderObject.style} ${borderObject.color}`;

  let maxDropHeight = '60vh';
  if (dropdownStyle?.maxDropHeight) maxDropHeight = `${dropdownStyle?.maxDropHeight}px`;

  // Arrow size
  const arrowHeight = componentStyle?.arrowHeight || DEFAULT_ARROW_SIZE
  const arrowWidth = componentStyle?.arrowWidth || DEFAULT_ARROW_SIZE;
  let arrowSize: Size = { height: arrowHeight, width: arrowWidth };

  return (
    <>
      <div className="dropdown" ref={dropdownRef}>
        <div
          className="dropdown-header"
          onClick={toggleDropdown}
          style={componentStyle ? {
            ...componentStyle, border: borderStyle
          } : undefined}
          onWheel={onWheel}
        >
          <span
            onWheel={onWheel}
            style={{
              color: selectedItem ? componentStyle?.color : placeholder?.color || 'black',
              fontSize: selectedItem ? componentStyle?.fontSize : placeholder?.fontSize || 16,
              fontWeight: selectedItem ? componentStyle?.fontWeight : placeholder?.fontWeight || 400,
              fontFamily: selectedItem ? componentStyle?.fontFamily : placeholder?.fontFamily || 'undefined',
            }}
          >{selectedItem ? renderItem(selectedItem, selectedIndex, false) : (placeholder?.text || " ")}</span>
          <ArrowComponent
            size={arrowSize}
            color={componentStyle?.arrowColor || 'black'}
            borderColor={componentStyle?.arrowBorderColor || 'black'}
            visibility={visibility}
            animationDuration={animationDuration}
          />
        </div>
        <ul
          ref={listRef}
          className={`dropdown-list ${dropdownStyle?.dropdownDirection === 'up' ? 'up' : 'down'}`}
          style={{
            border: borderStyle,
            borderTop: 'none',
            maxHeight: visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening ? maxDropHeight : 0,
            opacity: visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening ? 1 : 0,
            transition: `max-height ${animationDuration / 1000}s ease, opacity ${animationDuration / 1000}s ease`,
          }}
          onScroll={(e) => {
            // This keeps track of the scroll data, like the visible height, total height, position, etc.
            scrollData.current = toScrollData(e.nativeEvent.target as ListItemEventTarget);
          }}
        >
          {allowNoSelection && (
            <li
              onClick={() => handleItemClick(null, -1)}
              style={{
                backgroundColor: selectedItem === null ? dropdownStyle?.selectedBackgroundColor : dropdownStyle?.backgroundColor,
              }}
            >
              {renderItem(null, -1, false)}
            </li>
          )}
          {items.map((item, index) => (
            <li
              key={index}
              ref={el => itemRefs.current[index] = el} // Attach the ref here
              onClick={() => !disabled && handleItemClick(item, index)}
              style={{
                color: selectedItem === item ? dropdownStyle?.selectedColor : dropdownStyle?.color,
                backgroundColor: selectedItem === item ? dropdownStyle?.selectedBackgroundColor : dropdownStyle?.backgroundColor,
              }}
            >
              {renderItem(item, index, selectedIndex === index)}
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .dropdown {
          position: relative;
          width: ${typeof width === "number" ? `${width}px` : width};
          font-family: ${componentStyle?.fontFamily};
          font-size: ${componentStyle?.fontSize}px;
          font-weight: ${componentStyle?.fontWeight};
          background-color: ${borderObject.color};
          border: none;
          cursor: default;
          padding: ${borderObject.width}px;
        }
        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: ${componentStyle?.backgroundColor};
          cursor: pointer;
          padding: ${padding}px;
          color: ${componentStyle?.color || 'black'};
        }
        .dropdown-arrow {
          margin-left: ${padding}px;
        }
        .dropdown-arrow.open {
          transform: rotate(180deg); // -180deg would be counter-clockwise rotation
        }
        .dropdown-list {
          position: absolute;
          left: 0%;
          right: 0;
          margin: 0;
          padding: 0;
          border: ${borderStyle};
          border-top: none;
          background-color: ${dropdownStyle?.backgroundColor};
          overflow-y: scroll;
          z-index: 1000;
          transition: ${transition};
        }
        .dropdown-list.up {
          top: auto;
          bottom: 100%;
        }
        .dropdown-list.down {
          top: 100%;
          bottom: auto;
        }          
        .dropdown-list li {
          color: ${dropdownStyle?.color || 'black'};
          padding: ${padding}px;
          cursor: pointer;
          ${dropdownStyle?.separatorColor ? `border-bottom: ${dropdownStyle?.separatorThickness || 1
          }px ${dropdownStyle?.separatorStyle || 'solid'
          } ${dropdownStyle?.separatorColor};` : ""}
        }      
        .dropdown-list li:hover {
          background-color: ${dropdownStyle?.hoverColor || 'transparent'} !important;
        }
      `}</style>
    </>
  );
}

function DefaultArrow({ size, visibility, color, borderColor, animationDuration }: ArrowComponentProps) {
  return (
    <svg
      className={`dropdown-arrow ${visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening
        ? 'open' : ''}`}
      style={{
        transition: `transform ${animationDuration / 1000}s ease`,
      }}
      width={size.width} height={size.height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" stroke={borderColor ? borderColor : color} strokeWidth="1" fill="none" />
      <text x="50" y="60" fontSize="60" textAnchor="middle" alignmentBaseline="middle" fill={color}>▼</text>
    </svg>
  );
}

function toBorder(border: Border | string): Border {
  if (typeof border === 'string') {
    const [width, style, color] = border.split(' ');
    return {
      width: parseInt(width) || 0,
      style: style || 'none',
      color: color || 'transparent',
      radius: "1px",
    };
  }
  return border;
}

function toScrollData(event: ListItemEventTarget | null): ScrollData | null {
  if (!event) return null;
  const {
    clientHeight,
    clientLeft,
    clientTop,
    clientWidth,
    offsetHeight,
    offsetLeft,
    offsetTop,
    offsetWidth,
    scrollHeight,
    scrollLeft,
    scrollTop,
    scrollWidth,
  } = event;

  // Height
  const visibleHeight = clientHeight || 0;
  const totalHeight = scrollHeight || 0;

  // Scroll position
  const scrollPosition = scrollTop || 0;
  const maxScroll = totalHeight - visibleHeight;

  return {
    visibleHeight,
    totalHeight,
    scrollPosition,
    maxScroll,
    client: {
      height: clientHeight,
      left: clientLeft,
      top: clientTop,
      width: clientWidth,
    },
    offset: {
      height: offsetHeight,
      left: offsetLeft,
      top: offsetTop,
      width: offsetWidth,
    },
    scroll: {
      height: scrollHeight,
      left: scrollLeft,
      top: scrollTop,
      width: scrollWidth,
    }
  }
}

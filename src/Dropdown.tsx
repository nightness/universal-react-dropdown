import React, { useState, useRef, useEffect } from 'react';

const TRANSITION_DURATION = 300;

enum DropdownState {
  Opening,
  Open,
  Closing,
  Closed,
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
}

export interface DropdownStyle extends CommonStyle {
  hoverColor?: string;
  separatorColor?: string;
}

interface DropdownProps<T> {
  items: T[];
  ArrowComponent?: React.FC<{ color: string, borderColor?: string }>;
  renderItem: (item: T | null) => React.ReactNode;
  width?: number | string;
  maxDropHeight?: number;
  padding?: number;
  onSelect?: (item: T | null) => void;
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
  maxDropHeight,
  onSelect,
  width = 'auto',
  padding = 10,
  placeholder,
  componentStyle,
  dropdownStyle,
  border = { color: 'transparent', width: 0, style: 'none', radius: 0 },
  disabled = false,
  allowNoSelection = false,
}: DropdownProps<T>) {
  const [visibility, setVisibility] = useState<DropdownState>(DropdownState.Closed);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const animationTimeout = useRef<NodeJS.Timeout>();

  function closeDropdown() {
    setVisibility(DropdownState.Closing);
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => setVisibility(DropdownState.Closed), TRANSITION_DURATION); // Match this with the transition duration
  }

  function openDropdown() {
    setVisibility(DropdownState.Opening);
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => setVisibility(DropdownState.Open), TRANSITION_DURATION); // Match this with the transition duration
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOpen = visibility === DropdownState.Open || visibility === DropdownState.Opening;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (visibility === DropdownState.Open || visibility === DropdownState.Opening) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const handleItemClick = (item: T | null) => {
    onSelect?.(item);
    setSelectedItem(item);
    toggleDropdown();
  };

  // Create borderStyle... if border is a string, conver it to the object properties of Border
  const borderObject: Border = typeof border === 'string' ? {
    // Parse the border string to get the width, style, and color
    color: border.split(' ').pop() || 'transparent',
    width: parseInt(border.split(' ')[0]) || 0,
    style: border.split(' ')[1] || 'none',
    radius: "1px",
  } : border;

  const borderStyle = `${borderObject.width}px ${borderObject.style} ${borderObject.color}`;

  return (
    <>
      <div className="dropdown" ref={dropdownRef}>
        <div
          className="dropdown-header"
          onClick={toggleDropdown}
          style={componentStyle ? {
            ...componentStyle, border: borderObject.color
          } : undefined}
        >
          <span
            style={{
              color: selectedItem ? componentStyle?.color : placeholder?.color || 'black',
              fontSize: selectedItem ? componentStyle?.fontSize : placeholder?.fontSize || 16,
              fontWeight: selectedItem ? componentStyle?.fontWeight : placeholder?.fontWeight || 400,
              fontFamily: selectedItem ? componentStyle?.fontFamily : placeholder?.fontFamily || 'undefined',
            }}
          >{selectedItem ? renderItem(selectedItem) : placeholder?.text}</span>
          <ArrowComponent color={componentStyle?.arrowColor || 'black'} borderColor={
            componentStyle?.arrowBorderColor || 'black'
          } />
        </div>
        <ul className={`dropdown-list ${visibility === DropdownState.Open || visibility === DropdownState.Opening ? 'dropdown-open' : 'dropdown-closed'
          }`}>
          {allowNoSelection && (
            <li onClick={() => handleItemClick(null)}>
              {renderItem(null)}
            </li>
          )}
          {items.map((item, index) => (
            <li key={index} onClick={() => !disabled && handleItemClick(item)}>
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .dropdown {
          position: relative;
          width: ${width};
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
        }
        .dropdown-arrow {
          margin-left: 10px;
          transition: transform ${TRANSITION_DURATION / 1000
        }s ease;
        }
        .dropdown-arrow.open {
          transform: rotate(180deg);
        }
        .dropdown-list {
          position: absolute;
          top: 100%;
          left: 0%;
          right: 0;
          margin: 0;
          padding: 0;
          border: ${borderStyle};
          border-top: none;
          background-color: ${dropdownStyle?.backgroundColor};
          overflow-y: scroll;
          z-index: 1000;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }
        .dropdown-open {
          max-height: ${maxDropHeight}px;
          opacity: 1;
        }
        .dropdown-closed {
          max-height: 0;
          opacity: 0;
        }
        .dropdown-list li {
          padding: 10px;
          cursor: pointer;
          ${dropdownStyle?.separatorColor ? `border-bottom: 1px solid ${dropdownStyle?.separatorColor};` : ""}
        }      
        .dropdown-list li:hover {
          background-color: ${dropdownStyle?.hoverColor || 'transparent'};
        }
      `}</style>
    </>
  );
}

function DefaultArrow({ color, borderColor }: { color: string, borderColor?: string }) {
  return (
    <svg
      width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" stroke={borderColor ? borderColor : color} strokeWidth="1" fill="none" />
      <text x="50" y="60" fontSize="60" textAnchor="middle" alignmentBaseline="middle" fill={color}>▼</text>
    </svg>
  );
}
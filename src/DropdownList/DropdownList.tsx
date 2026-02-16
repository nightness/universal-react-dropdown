import React, { MutableRefObject, ReactNode, RefObject, UIEvent, useEffect, useState } from 'react';
import { DEFAULT_ANIMATION_DURATION, DEFAULT_MAX_DROP_HEIGHT } from '../constants';
import { DropdownStyle, DropdownVisibility, DropdownVisibilityType, ScrollData } from '../types';

import "./DropdownList.css";

interface DropdownListProps<T> {
  items: T[];
  selectedItem: T | null;
  selectedIndex: number;
  allowNoSelection?: boolean;
  onItemClick: (item: T | null, index: number) => void;
  visibility: DropdownVisibilityType;
  dropdownStyle?: DropdownStyle;
  effectiveMaxHeight?: number;
  effectiveDirection?: 'up' | 'down';
  padding?: number;
  borderStyle?: string;
  listRef: RefObject<HTMLUListElement>;
  itemRefs: RefObject<(HTMLLIElement | null)[]>;
  scrollData: MutableRefObject<ScrollData | null>;
  renderItem: (item: T | null, index: number, isSelected: boolean) => ReactNode;
  disabled?: boolean;
  onScroll?: (e: UIEvent<HTMLUListElement>) => void;
  itemStyle?: React.CSSProperties;
  itemHoverColor?: string;
}

export function DropdownList<T>({
  items,
  selectedItem,
  selectedIndex,
  allowNoSelection = false,
  onItemClick,
  visibility,
  dropdownStyle,
  effectiveMaxHeight,
  effectiveDirection,
  padding = 0,
  borderStyle = 'none',
  listRef,
  itemRefs,
  scrollData,
  renderItem,
  disabled = false,
  onScroll,
  itemStyle = {},
  itemHoverColor = 'transparent',
}: DropdownListProps<T>) {
  const maxDropHeight = effectiveMaxHeight ?? dropdownStyle?.maxDropHeight ?? DEFAULT_MAX_DROP_HEIGHT;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex < 0 || !listRef.current || !itemRefs.current?.[selectedIndex]) return;

    const list = listRef.current;
    const scrollTop = list.scrollTop;
    const clientHeight = list.clientHeight;
    const itemTop = itemRefs.current[selectedIndex].offsetTop;
    const itemHeight = itemRefs.current[selectedIndex].offsetHeight;
    const itemBottom = itemTop + itemHeight;

    // Already fully visible — do nothing
    if (itemTop >= scrollTop && itemBottom <= scrollTop + clientHeight) return;

    // Item is below the viewport — scroll down just enough to show it at the bottom
    if (itemBottom > scrollTop + clientHeight) {
      list.scrollTo({ top: itemBottom - clientHeight, behavior: 'smooth' });
    }
    // Item is above the viewport — scroll up just enough to show it at the top
    else if (itemTop < scrollTop) {
      list.scrollTo({ top: itemTop, behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const animationDuration = dropdownStyle?.animationDuration || DEFAULT_ANIMATION_DURATION;
  const transition = `max-height ${animationDuration / 1000}s ease, opacity ${animationDuration / 1000}s ease`;

  const getItemStyle = (item: T | null, index: number): React.CSSProperties => {
    const isSelected = selectedItem === item;
    const isHovered = hoveredIndex === index;
    return {
      ...itemStyle,
      color: isSelected ? dropdownStyle?.selectedColor : dropdownStyle?.color || 'black',
      backgroundColor: isHovered
        ? itemHoverColor
        : isSelected
          ? dropdownStyle?.selectedBackgroundColor
          : dropdownStyle?.backgroundColor,
    };
  };

  return (
    <ul
      ref={listRef}
      className={`dropdown-list ${(effectiveDirection ?? dropdownStyle?.dropdownDirection) === 'up' ? 'up' : 'down'}`}
      style={{
        border: borderStyle,
        borderTop: 'none',
        maxHeight: visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening ? maxDropHeight : 0,
        opacity: visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening ? 1 : 0,
        backgroundColor: dropdownStyle?.backgroundColor,
        transition,
      }}
      onScroll={onScroll}
    >
      {allowNoSelection && (
        <li
          onClick={() => onItemClick(null, -1)}
          onMouseEnter={() => setHoveredIndex(-1)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={getItemStyle(null, -1)}
        >
          {renderItem(null, -1, false)}
        </li>
      )}
      {items.map((item, index) => (
        <li
          key={index}
          ref={(el) => { if (itemRefs.current) itemRefs.current[index] = el; }}
          onClick={() => !disabled && onItemClick(item, index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={getItemStyle(item, index)}
        >
          {renderItem(item, index, selectedIndex === index)}
        </li>
      ))}
    </ul>
  );
}

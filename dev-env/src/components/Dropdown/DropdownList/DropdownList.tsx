import React, { useEffect } from 'react';
import { DEFAULT_ANIMATION_DURATION, DEFAULT_MAX_DROP_HEIGHT } from '../constants';
import { DropdownStyle, DropdownVisibility, ScrollData } from '../types';

import "./DropdownList.css";

interface DropdownListProps<T> {
  items: T[];
  selectedItem: T | null;
  selectedIndex: number;
  allowNoSelection?: boolean;
  onItemClick: (item: T | null, index: number) => void;
  visibility: DropdownVisibility;
  dropdownStyle?: DropdownStyle;
  padding?: number;
  borderStyle?: string;
  listRef: React.RefObject<HTMLUListElement>;
  itemRefs: React.RefObject<(HTMLLIElement | null)[]>;
  scrollData: React.MutableRefObject<ScrollData | null>;
  renderItem: (item: T | null, index: number, isSelected: boolean) => React.ReactNode;
  disabled?: boolean;
  onScroll?: (e: React.UIEvent<HTMLUListElement>) => void;
}

export function DropdownList<T>({
  items,
  selectedItem,
  selectedIndex,
  allowNoSelection = false,
  onItemClick,
  visibility,
  dropdownStyle,
  padding = 0,
  borderStyle = 'none',
  listRef,
  itemRefs,
  scrollData,
  renderItem,
  disabled = false,
  onScroll
}: DropdownListProps<T>) {
  const maxDropHeight = dropdownStyle?.maxDropHeight || DEFAULT_MAX_DROP_HEIGHT;

  useEffect(() => {
    if (selectedIndex < 0 || !listRef.current || !itemRefs.current?.[selectedIndex]) return;

    const dropdownHeight = listRef.current.offsetHeight;

    const { client, offset, scroll } = scrollData.current || {};
    if (!client || !offset || !scroll) return;
    const scrollTop = scroll.top || 0;
    const clientHeight = client.height || dropdownHeight;
    const selectedItemPosition = itemRefs.current[selectedIndex].offsetTop;
    const selectedItemHeight = itemRefs.current[selectedIndex].offsetHeight;

    if (selectedItemPosition >= scrollTop && selectedItemPosition + selectedItemHeight <= scrollTop + clientHeight) return;

    listRef.current.scrollTo({
      top: selectedItemPosition - (Math.floor(client.height || 0)) / 2 + selectedItemHeight / 2,
      behavior: 'smooth',
    });
  }, [selectedIndex]);

  const animationDuration = dropdownStyle?.animationDuration || DEFAULT_ANIMATION_DURATION;
  const transition = `max-height ${animationDuration / 1000}s ease, opacity ${animationDuration / 1000}s ease`; 

  return (
    <ul
      ref={listRef}
      className={`dropdown-list ${dropdownStyle?.dropdownDirection === 'up' ? 'up' : 'down'}`}
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
          ref={(el) => (itemRefs.current && (itemRefs.current[index] = el))}
          onClick={() => !disabled && onItemClick(item, index)}
          style={{
            color: selectedItem === item ? dropdownStyle?.selectedColor : dropdownStyle?.color,
            backgroundColor: selectedItem === item ? dropdownStyle?.selectedBackgroundColor : dropdownStyle?.backgroundColor,
          }}
        >
          {renderItem(item, index, selectedIndex === index)}
        </li>
      ))}
    </ul>
  );
}

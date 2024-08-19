import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DropdownVisibility, ScrollData } from '../types';
import { DEFAULT_MAX_DROP_HEIGHT, DEFAULT_ANIMATION_DURATION } from '../constants';

interface UseDropdownProps<T> {
  items: T[];
  onSelect?: (item: T | null, index: number) => void;
  maxDropHeight?: number;
  animationDuration?: number;
  disabled?: boolean;
  allowNoSelection?: boolean;
}

export function useDropdownList<T>({
  items,
  onSelect,
  maxDropHeight = DEFAULT_MAX_DROP_HEIGHT,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  disabled = false,
  allowNoSelection = false,
}: UseDropdownProps<T>) {
  const [visibility, setVisibility] = useState<DropdownVisibility>(DropdownVisibility.Closed);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const scrollData = useRef<ScrollData | null>(null) as React.MutableRefObject<ScrollData | null>;
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]) as React.MutableRefObject<(HTMLLIElement | null)[]>;
  const dropdownRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const listRef = useRef<HTMLUListElement>(null) as React.RefObject<HTMLUListElement>;
  const animationTimeout = useRef<NodeJS.Timeout>();

  const ensureVisible = () => {
    // console.log('ensureVisible', selectedIndex, selectedItem, !listRef.current, !itemRefs.current[selectedIndex]);
    // listRef.current?.offsetHeight
    if (selectedIndex < 0 || !listRef.current || !itemRefs.current[selectedIndex]) return;

    const { client, scroll } = scrollData.current || {};
    // console.log('client:', client, 'offset:', offset, 'scroll:', scroll);
    // if (!client || !offset || !scroll) return;

    // Safe numbers
    const scrollTop = scroll?.top || 0;
    const clientHeight = client?.height || 0;

    // The position and height of the selected item
    const selectedItemPosition = itemRefs.current[selectedIndex].offsetTop;
    const selectedItemHeight = itemRefs.current[selectedIndex].offsetHeight;

    // Guard clause to prevent scrolling if the selected item is already visible
    if (selectedItemPosition >= scrollTop && selectedItemPosition + selectedItemHeight <= scrollTop + clientHeight) return;

    // Move the selected item to the top of the dropdown list
    listRef.current.scrollTo({
      top: selectedItemPosition - (Math.floor(maxDropHeight || 0)) / 2 + selectedItemHeight / 2,
      behavior: 'smooth',
    })
  }

  // Start the closing dropdown animation. The callback is used when the animation is done
  // to delay updating the parent component until the animation is done.
  function closeDropdown(callback: () => void = () => { }) {
    setVisibility(DropdownVisibility.Closing);
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => {
      setVisibility(DropdownVisibility.Closed);
      callback();
    }, animationDuration);
  }

  // Start the opening dropdown animation
  const openDropdown = () => {
    if (visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening || disabled) return;
    ensureVisible();
    setVisibility(DropdownVisibility.Opening);
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => {
      setVisibility(DropdownVisibility.Open);
    }, animationDuration);
  }

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    if (visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening) {
      closeDropdown();
    } else {
      openDropdown();
    }
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

  // Handle item selection and closing the dropdown
  const onItemClick = useCallback(
    (item: T | null, index: number) => {
      setSelectedIndex(index);
      setSelectedItem(item);
      closeDropdown(() => onSelect?.(item, index));
    },
    [onSelect]
  );

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

  // Handles the wheel event, adjusting the selected index by +/- 1
  const onWheel = (event: React.WheelEvent) => {
    if (disabled) return;
    const increase = event.deltaY > 0;
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
  };

  return {
    visibility,
    selectedIndex,
    selectedItem,
    toggleDropdown,
    onItemClick,
    dropdownRef,
    scrollData,
    itemRefs,
    listRef,
    closeDropdown,
    openDropdown,
    ensureVisible,
    onWheel,
  };
}



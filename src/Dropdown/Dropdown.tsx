import React from 'react';
import { DEFAULT_ANIMATION_DURATION, DEFAULT_DROPDOWN_BORDER, DEFAULT_PADDING } from '../constants';
import { DefaultArrow } from '../DefaultArrow/DefaultArrow';
import { DropdownList } from '../DropdownList/DropdownList';
import { themeToCustomProperties, toBorder, toScrollData } from '../helpers';
import { Border, ComponentStyle, DropdownStyle, DropdownTheme, ArrowComponentProps, Placeholder } from '../types';
import { useDropdownList } from '../DropdownList/useDropdownList';
import { DropdownHeaderStyleResult, DropdownStyleResult, getStyles } from '../useStyles';

import './Dropdown.css';

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
  theme?: DropdownTheme;
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
  theme,
  border = DEFAULT_DROPDOWN_BORDER,
  disabled = false,
  allowNoSelection = false,
}: DropdownProps<T>) {
  const themeVars = themeToCustomProperties(theme);
  const {
    visibility,
    selectedIndex,
    selectedItem,
    effectiveMaxHeight,
    effectiveDirection,
    scrollData,
    itemRefs,
    dropdownRef,
    listRef,
    toggleDropdown,
    onItemClick,
    onKeyDown,
    onWheel,
  } = useDropdownList<T>({
    allowNoSelection,
    disabled,
    animationDuration: dropdownStyle?.animationDuration,
    maxDropHeight: dropdownStyle?.maxDropHeight,
    dropdownDirection: dropdownStyle?.dropdownDirection,
    items,
    onSelect,
  });

  const dropdownStyles = getStyles({
    name: 'dropdown',
    style: {
      width,
      componentStyle,
      border,
    },
  }) as DropdownStyleResult;
  const { border: borderStyle, ...dropDownStyle } = dropdownStyles;

  const { padding: headerPadding, ...headerStyle } = getStyles({
    name: 'dropdown-header',
    style: {
      componentStyle: componentStyle || { backgroundColor: 'var(--urd-bg)', color: 'var(--urd-color)' },
      padding,
    },
  }) as DropdownHeaderStyleResult;

  const animationDuration = dropdownStyle?.animationDuration || DEFAULT_ANIMATION_DURATION;

  const itemStyle: React.CSSProperties = {
    color: dropdownStyle?.color || 'var(--urd-list-color)',
    padding: `${padding}px`,
    cursor: 'pointer',
    ...(dropdownStyle?.separatorColor ? {
      borderBottom: `${dropdownStyle?.separatorThickness || 1}px ${dropdownStyle?.separatorStyle || 'solid'} ${dropdownStyle?.separatorColor}`,
    } : {}),
  };

  const itemHoverColor = dropdownStyle?.hoverColor || 'var(--urd-hover-bg)';

  const isOpen = visibility === 'Opening' || visibility === 'Open';
  const direction = effectiveDirection ?? dropdownStyle?.dropdownDirection ?? 'down';
  const borderWidth = toBorder(border).width;
  const r = dropdownStyles.borderRadius;
  const containerRadius = isOpen
    ? direction === 'down'
      ? `${r} ${r} 0 0`
      : `0 0 ${r} ${r}`
    : r;

  return (
    <div className="dropdown" ref={dropdownRef} style={{
      ...themeVars,
      ...dropDownStyle,
      border: borderStyle,
      borderRadius: containerRadius,
      ...(isOpen && direction === 'down' ? { borderBottom: 'none' } : {}),
      ...(isOpen && direction === 'up' ? { borderTop: 'none' } : {}),
    }}>
      <div
        className="dropdown-header"
        tabIndex={disabled ? -1 : 0}
        onClick={toggleDropdown}
        onKeyDown={onKeyDown}
        style={{
          ...headerStyle,
          padding,
        }}
        onWheel={onWheel}
      >
        <span
          style={{
            color: selectedItem ? componentStyle?.color : placeholder?.color || 'var(--urd-placeholder-color)',
            fontSize: selectedItem ? componentStyle?.fontSize : placeholder?.fontSize || 16,
            fontWeight: selectedItem ? componentStyle?.fontWeight : placeholder?.fontWeight || 900,
            fontFamily: selectedItem ? componentStyle?.fontFamily : placeholder?.fontFamily || 'inherit',
            paddingRight: `${padding}px`,
          }}
        >
          {selectedItem ? renderItem(selectedItem, selectedIndex, false) : placeholder?.text}
        </span>
        <ArrowComponent
          color={componentStyle?.arrowColor || 'var(--urd-arrow-color)'}
          borderColor={componentStyle?.arrowBorderColor || 'var(--urd-arrow-border-color)'}
          visibility={visibility}
          animationDuration={animationDuration}
        />
      </div>
      <DropdownList
        renderItem={renderItem}
        disabled={disabled}
        items={items}
        selectedItem={selectedItem}
        selectedIndex={selectedIndex}
        allowNoSelection={allowNoSelection}
        onItemClick={onItemClick}
        visibility={visibility}
        dropdownStyle={dropdownStyle}
        effectiveMaxHeight={effectiveMaxHeight}
        effectiveDirection={effectiveDirection}
        padding={padding}
        borderStyle={borderStyle}
        listRef={listRef}
        itemRefs={itemRefs}
        scrollData={scrollData}
        itemStyle={itemStyle}
        itemHoverColor={itemHoverColor}
        borderWidth={borderWidth}
        onScroll={(e) => scrollData.current = toScrollData(e.nativeEvent.target)}
      />
    </div>
  );
}

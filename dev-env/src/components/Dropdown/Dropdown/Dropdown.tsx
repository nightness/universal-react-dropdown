import React from 'react';
import { DEFAULT_ANIMATION_DURATION, DEFAULT_DROPDOWN_BORDER, DEFAULT_PADDING } from '../constants';
import { DefaultArrow } from '../DefaultArrow/DefaultArrow';
import { DropdownList } from '../DropdownList/DropdownList';
import { toScrollData } from '../helpers';
import { DropdownVisibility, Border, ComponentStyle, DropdownStyle, ArrowComponentProps } from '../types';
import { useDropdownList } from '../DropdownList/useDropdownList';
import { DropdownHeaderStyleResult, DropdownStyleResult, useStyles } from '../useStyles';

import './Dropdown.css';

export { DropdownVisibility };

interface Placeholder {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
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
  border = DEFAULT_DROPDOWN_BORDER,
  disabled = false,
  allowNoSelection = false,
}: DropdownProps<T>) {
  const {
    visibility,
    selectedIndex,
    selectedItem,
    scrollData,
    itemRefs,
    dropdownRef,
    listRef,
    // closeDropdown,
    // openDropdown,
    toggleDropdown,
    onItemClick,
    onWheel,    
  } = useDropdownList<T>({
    allowNoSelection,
    disabled,
    animationDuration: dropdownStyle?.animationDuration,
    maxDropHeight: dropdownStyle?.maxDropHeight,
    items,
    onSelect,
  });

  const { border: borderStyle, ...dropDownStyle } = useStyles({
    name: 'dropdown',
    style: {
      width,
      componentStyle,
      border,
    },
  }) as DropdownStyleResult;

  const { padding: headerPadding, ...headerStyle } = useStyles({
    name: 'dropdown-header',
    style: {
      componentStyle: componentStyle || { backgroundColor: 'transparent', color: 'black' },
      padding,
    },
  }) as DropdownHeaderStyleResult;

  const animationDuration = dropdownStyle?.animationDuration || DEFAULT_ANIMATION_DURATION;

  return (
    <>
      <div className="dropdown" ref={dropdownRef} style={dropDownStyle}>
        <div
          className="dropdown-header"
          onClick={toggleDropdown}
          style={{
            ...headerStyle,
            padding,
          }}
          onWheel={onWheel}
        >
          <span
            onWheel={onWheel}
            style={{
              color: selectedItem ? componentStyle?.color : placeholder?.color || 'black',
              fontSize: selectedItem ? componentStyle?.fontSize : placeholder?.fontSize || 16,
              fontWeight: selectedItem ? componentStyle?.fontWeight : placeholder?.fontWeight || 900,
              fontFamily: selectedItem ? componentStyle?.fontFamily : placeholder?.fontFamily || 'Times New Roman',
              paddingRight: `${padding}px`,
            }}
          >
            {selectedItem ? renderItem(selectedItem, selectedIndex, false) : placeholder?.text}
          </span>
          <ArrowComponent
            color={componentStyle?.arrowColor || 'black'}
            borderColor={componentStyle?.arrowBorderColor || 'black'}
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
          padding={padding}
          borderStyle={borderStyle}
          listRef={listRef}
          itemRefs={itemRefs}
          scrollData={scrollData}
          onScroll={(e) => scrollData.current = toScrollData(e.nativeEvent.target)}
        />
      </div>
      <style>
        {`
          .dropdown-list li {
            color: ${dropdownStyle?.color || 'black'};
            padding: ${padding}px;
            cursor: pointer;
            ${dropdownStyle?.separatorColor
            ? `border-bottom: ${dropdownStyle?.separatorThickness || 1}px ${dropdownStyle?.separatorStyle || 'solid'} ${dropdownStyle?.separatorColor};`
            : ''}
          }
          .dropdown-list li:hover {
            background-color: ${dropdownStyle?.hoverColor || 'transparent'} !important;
          }
        `}
      </style>

    </>
  );
}



# universal-react-dropdown

universal-react-dropdown is a customizable React Dropdown component designed for flexible integration into React applications. This component allows for easy customization of styles and behavior, making it suitable for various use cases.

## Key Features

- **React 18.x Compatibility**: The only dependency is React 18.x, ensuring seamless integration with your existing React project.

- **Fully Customizable**: Offers extensive customization options for styling, behavior, and layout to match your application's design needs.

- **RenderItem Prop Support**: Allows you to define a custom rendering logic for dropdown items, providing flexibility in how each item is displayed.

- **Mouse Wheel Scrolling**: Supports smooth scrolling of both closed and open lists using the mouse wheel, enhancing user experience.

- **Arrow Customization**: Easily replace the default dropdown arrow with a custom component, allowing for further visual customization.

- **Responsive Design**: Adapts well to different screen sizes and layouts, ensuring a consistent experience across devices.

- **Ensures the visibility of the selected item**: If there is a selected item, and the user scrolls the selected item outside the view window before closing the dropdown (without changing selected item); when the user reopen the dropdown the select item will be scrolled to the center of the dropdown's view window.

- **Conditional Placeholder**: Placeholder text can be customized with different colors, font sizes, and styles, appearing only when no item is selected.

- **Configurable Dropdown Direction**: Choose whether the dropdown list appears above or below the trigger element, making it versatile for various UI designs. 

- **Item Hover and Selection Styles**: Define custom hover and selection styles for dropdown items, enhancing visual feedback during user interactions.

- **Support for Disabled State**: Easily disable the dropdown to prevent user interaction when necessary, maintaining control over the user interface.

## Future Feature List

- **Keyboard Navigation**: Full keyboard accessibility, allowing users to navigate and select items using the keyboard.


## Installation

You can install the package via npm:

```bash
npm install universal-react-dropdown
```

## Usage

Here is a basic example of how to use the Dropdown component:

```jsx
import React from 'react';
import { Dropdown } from 'universal-react-dropdown';

const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
  { id: 7, name: 'Item 7' },
  { id: 8, name: 'Item 8' },
  { id: 9, name: 'Item 9' },
  { id: 10, name: 'Item 10' },
];

function App() {
  const handleSelect = (item) => {
    console.log('Selected item:', item);
  };

  const renderItem = (item, index, isSelected) => (
    <div style={{ minHeight: '22px', fontWeight: isSelected ? '800' : '400' }}>{item?.name}</div>
  );

  return (
    <Dropdown
      items={items}
      renderItem={renderItem}
      onSelect={handleSelect}
      placeholder={{ text: 'Select an item', color: 'black', fontSize: 16, fontWeight: 300 }}
      allowNoSelection
      width={300}
      padding={5}
      dropdownStyle={{
        maxDropHeight: 220
      }}
    />
  );
}

export default App;
```

## Props

The Dropdown component accepts the following props:

### `items` (required)
- **Type**: `T[]`
- **Description**: An array of items to display in the dropdown.

### `ArrowComponent`
- **Type**: `React.FC<{ color: string, borderColor?: string, visibility: DropdownVisibility }>`
- **Description**: A custom component to render the dropdown arrow. It receives `color` and `borderColor` as props.
- **Default**: `DefaultArrow` component provided by the package.
- **Example**:
```tsx
function ArrowComponent({ visibility, color, borderColor, animationDuration }: ArrowComponentProps) {
  return (
    <>
      <svg
        viewBox='0 0 30 30'
        xmlns='http://www.w3.org/2000/svg'
        height='30' width='30'
        style={{

          // Clockwise rotation
          transform: visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening ? 'rotate(45deg)' : 'rotate(-135deg)',

          // Counter-clockwise rotation
          // transform: visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening ? 'rotate(45deg)' : 'rotate(225deg)',

          transition: `transform ${
            animationDuration / 1000
          }s ease`,
        }}
      >
        <rect x='25%' y='25%' width='25%' height='25%' fill='tomato' opacity='0.75' />
        <rect x='25%' y='50%' width='25%' height='25%' fill='slategrey' opacity='0.75' />
        <rect x='50%' y='25%' width='25%' height='25%' fill='olive' opacity='0.75' />
      </svg>
    </>
  );
}
```

### `renderItem` (required)
- **Type**: `(item: T | null) => React.ReactNode`
- **Description**: A function to render each item in the dropdown. This allows for custom item rendering logic.

### `width` (recommended)
- **Type**: `number | string`
- **Description**: The width of the dropdown component. Specifying a width is recommended, without one the width will only be as wide as your widest element.
- **Default**: `'auto'`

### `padding`
- **Type**: `number`
- **Description**: The amount of padding to use inside the dropdown header and dropdown list.
- **Default**: `10`

### `onSelect`
- **Type**: `(item: T | null) => void`
- **Description**: Callback that informs the parent after an item is selected. Animations finish before this is called.

### `border`
- **Type**: `Border | string`
- **Description**: Defines the border style for the dropdown. Can be a string or an object specifying `color`, `width`, `style`, and `radius`.
- **Default**: `{ color: 'transparent', width: 0, style: 'none', radius: 0 }`

#### `Border` Object
- **Properties**:
  - `color`: `string` - Color of the border.
  - `width`: `number` - Width of the border in pixels.
  - `style`: `string` - Style of the border (e.g., `solid`, `dashed`).
  - `radius`: `string | number` - Border radius for rounded corners.

### `placeholder`
- **Type**: `Placeholder`
- **Description**: Configuration for the placeholder text when no item is selected.

#### `Placeholder` Object
- **Properties**:
  - `text`: `string` - Text to display as the placeholder.
  - `color`: `string` - Color of the placeholder text.
  - `fontSize`: `number` - Font size of the placeholder text.
  - `fontWeight`: `number` - Font weight of the placeholder text.
  - `fontFamily`: `string` - Font family of the placeholder text.

### `componentStyle`
- **Type**: `ComponentStyle`
- **Description**: Styles for the dropdown component, including colors, fonts, and cursor.

#### `ComponentStyle` Object
- **Properties**:
  - `border`: `Border | string` - Border style of the component.
  - `backgroundColor`: `string` - Background color of the component.
  - `color`: `string` - Text color of the component.
  - `fontSize`: `number` - Font size of the component text.
  - `fontWeight`: `number` - Font weight of the component text.
  - `fontFamily`: `string` - Font family of the component text.
  - `cursor`: `string` - Cursor style when hovering over the component.
  - `arrowColor`: `string` - Color of the dropdown arrow.
  - `arrowBorderColor`: `string` - Border color of the dropdown arrow.

### `dropdownStyle`
- **Type**: `DropdownStyle`
- **Description**: Styles for the dropdown list, including hover and separator colors.

#### `DropdownStyle` Object
- **Properties**:
  - `dropdownDirection?`: `'up' | 'down'` - Display the drop list below the header or above.
  - `border`: `Border | string` - Border style of the dropdown list.
  - `backgroundColor`: `string` - Background color of the dropdown list.
  - `color`: `string` - Text color of the dropdown list items.
  - `fontSize`: `number` - Font size of the dropdown list items.
  - `fontWeight`: `number` - Font weight of the dropdown list items.
  - `fontFamily`: `string` - Font family of the dropdown list items.
  - `hoverColor`: `string` - Background color of items when hovered.
  - `maxDropHeight`: `number` - Maximum height of the dropdown list when open, useful for limiting the visible area and enabling scrolling. Default: `'60vh'`
  - `selectedColor`: `string` - Selected text color
  - `selectedBackgroundColor`: `string` - Selected background color
  - `separatorColor`: `string` - Color of the separator between items.

### `disabled`
- **Type**: `boolean`
- **Description**: If `true`, the dropdown will be disabled and items cannot be selected.
- **Default**: `false`

### `allowNoSelection`
- **Type**: `boolean`
- **Description**: If `true`, allows deselecting the current selection, setting it to `null`.
- **Default**: `false`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

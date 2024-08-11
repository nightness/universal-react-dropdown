# universal-react-dropdown

universal-react-dropdown is a customizable React Dropdown component designed for flexible integration into React applications. This component allows for easy customization of styles and behavior, making it suitable for various use cases.

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

const items = ['Item 1', 'Item 2', 'Item 3'];

function App() {
  const handleSelect = (item) => {
    console.log('Selected item:', item);
  };

  const renderItem = (item) => (item ? <span>{item}</span> : <span>No Selection</span>);

  return (
    <Dropdown
      items={items}
      renderItem={renderItem}
      onSelect={handleSelect}
      placeholder={{ text: 'Select an item', color: '#999' }}
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
- **Type**: `React.FC<{ color: string, borderColor?: string }>`
- **Description**: A custom component to render the dropdown arrow. It receives `color` and `borderColor` as props.
- **Default**: `DefaultArrow` component provided by the package.

### `renderItem` (required)
- **Type**: `(item: T | null) => React.ReactNode`
- **Description**: A function to render each item in the dropdown. This allows for custom item rendering logic.

### `width`
- **Type**: `number | string`
- **Description**: The width of the dropdown component.
- **Default**: `'auto'`

### `maxDropHeight`
- **Type**: `number`
- **Description**: Maximum height of the dropdown list when open, useful for limiting the visible area and enabling scrolling.

### `padding`
- **Type**: `number`
- **Description**: Padding inside the dropdown header.
- **Default**: `10`

### `onSelect`
- **Type**: `(item: T | null) => void`
- **Description**: Callback function invoked when an item is selected.

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
  - `border`: `Border | string` - Border style of the dropdown list.
  - `backgroundColor`: `string` - Background color of the dropdown list.
  - `color`: `string` - Text color of the dropdown list items.
  - `fontSize`: `number` - Font size of the dropdown list items.
  - `fontWeight`: `number` - Font weight of the dropdown list items.
  - `fontFamily`: `string` - Font family of the dropdown list items.
  - `hoverColor`: `string` - Background color of items when hovered.
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

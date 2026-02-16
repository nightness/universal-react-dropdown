# universal-react-dropdown

universal-react-dropdown is a customizable React Dropdown component designed for flexible integration into React applications. This component allows for easy customization of styles and behavior, making it suitable for various use cases.

## Key Features

- **React 18 & 19 Compatibility**: Works with React 18.x and React 19.x, ensuring seamless integration with your existing React project.

- **Fully Customizable**: Offers extensive customization options for styling, behavior, and layout to match your application's design needs.

- **RenderItem Prop Support**: Allows you to define a custom rendering logic for dropdown items, providing flexibility in how each item is displayed.

- **Mouse Wheel Scrolling**: Supports smooth scrolling of both closed and open lists using the mouse wheel, enhancing user experience.

- **Arrow Customization**: Easily replace the default dropdown arrow with a custom component, allowing for further visual customization.

- **Stable Auto-Width**: When no explicit width is set, the dropdown automatically sizes to fit the widest item, eliminating layout jitter when selections change. A configurable maximum width (default `90vw`) prevents overflow on small screens.

- **Responsive Design**: Adapts well to different screen sizes and layouts, ensuring a consistent experience across devices.

- **Ensures the visibility of the selected item**: If there is a selected item, and the user scrolls the selected item outside the view window before closing the dropdown (without changing selected item); when the user reopen the dropdown the select item will be scrolled to the center of the dropdown's view window.

- **Conditional Placeholder**: Placeholder text can be customized with different colors, font sizes, and styles, appearing only when no item is selected.

- **Configurable Dropdown Direction**: Choose whether the dropdown list appears above or below the trigger element, making it versatile for various UI designs.

- **Viewport-Aware Auto-Flip**: Dropdown automatically flips direction when near viewport edges, ensuring the list is always visible regardless of scroll position.

- **ARIA Accessible**: Semantic `combobox`/`listbox` roles and ARIA attributes (`aria-expanded`, `aria-activedescendant`, `aria-selected`, etc.) are applied automatically. Unique IDs via `React.useId()` support multiple instances on the same page.

- **Controlled & Uncontrolled Modes**: Use `selectedIndex` for fully controlled selection, `defaultIndex` for an initial value in uncontrolled mode, or neither for default behavior.

- **Keyboard Navigation**: Full keyboard accessibility including Tab, Enter, Space, Escape, Arrow keys, PageUp/PageDown, and Home/End for navigating and selecting items.

- **Item Hover and Selection Styles**: Define custom hover and selection styles for dropdown items, enhancing visual feedback during user interactions.

- **Support for Disabled State**: Easily disable the dropdown to prevent user interaction when necessary, maintaining control over the user interface.

- **Theme Support**: Apply a complete color theme via a single `theme` prop. Themes set scoped CSS custom properties on the container, so multiple dropdowns on the same page can each have their own theme.

## Installation

### Via npm

```bash
npm install universal-react-dropdown
```

### Via shadcn CLI

Copy the component source directly into your project:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/nightness/universal-react-dropdown/main/public/r/dropdown.json
```

Or add as a namespaced registry in your `components.json`:

```json
{
  "registries": {
    "@nightness": {
      "url": "https://raw.githubusercontent.com/nightness/universal-react-dropdown/main/public/r"
    }
  }
}
```

Then install with:

```bash
npx shadcn add @nightness/dropdown
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
- **Type**: `React.FC<ArrowComponentProps>`
- **Description**: A custom component to render the dropdown arrow. It receives `color`, `borderColor`, `visibility`, and `animationDuration` as props.
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
- **Type**: `(item: T | null, index: number, isSelected: boolean) => React.ReactNode`
- **Description**: A function to render each item in the dropdown. Receives the item (or `null` when deselected), its index in the `items` array, and whether it is currently selected.

### `renderTrigger`
- **Type**: `(props: TriggerRenderProps<T>) => React.ReactNode`
- **Description**: Replaces the default trigger content (selected-item span + arrow) inside the header. The outer `.dropdown-header` div — including its click, keyboard, wheel handlers, and `tabIndex` — is preserved; only the inner content changes.

#### `TriggerRenderProps<T>` Object
- **Properties**:
  - `selectedItem`: `T | null` — The currently selected item, or `null` if nothing is selected.
  - `selectedIndex`: `number` — Index of the selected item in the `items` array (`-1` when nothing is selected).
  - `visibility`: `DropdownVisibilityType` — Current animation state (`'Opening'`, `'Open'`, `'Closing'`, `'Closed'`).
  - `isOpen`: `boolean` — `true` when the dropdown is opening or open.
  - `disabled`: `boolean` — Whether the dropdown is disabled.

#### Example

```tsx
import { Dropdown } from 'universal-react-dropdown';
import type { TriggerRenderProps } from 'universal-react-dropdown';

<Dropdown
  items={items}
  renderItem={renderItem}
  renderTrigger={({ selectedItem, isOpen }: TriggerRenderProps<Item>) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span>{selectedItem ? selectedItem.name : 'Choose…'}</span>
      <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
    </div>
  )}
/>
```

### `width`
- **Type**: `number | string`
- **Description**: The width of the dropdown component. When omitted (or set to `'auto'`), the dropdown auto-sizes to the widest item so the trigger never resizes on selection change. The auto-sized width is capped by `maxAutoWidth`.
- **Default**: `'auto'`

### `maxAutoWidth`
- **Type**: `number | string`
- **Description**: Maximum width of the dropdown when auto-sizing (i.e. when `width` is not explicitly set). Pass a number for pixels or a CSS string such as `'90vw'` or `'500px'`. When the widest item exceeds this cap, the dropdown list allows horizontal scrolling. Ignored when an explicit `width` is provided.
- **Default**: `'90vw'`

### `padding`
- **Type**: `number`
- **Description**: The amount of padding to use inside the dropdown header and dropdown list.
- **Default**: `10`

### `onSelect`
- **Type**: `(item: T | null, index: number) => void`
- **Description**: Callback that informs the parent after an item is selected. Receives the selected item (or `null` if deselected) and its index. Animations finish before this is called.

### `border`
- **Type**: `Border | string`
- **Description**: Defines the border style for the dropdown. Can be a string or an object specifying `color`, `width`, `style`, and `radius`.
- **Default**: `{ color: 'var(--urd-border-color)', width: 1, style: 'solid', radius: 4 }`

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
  - `fontWeight`: `number | "normal" | "bold" | "bolder" | "lighter"` - Font weight of the component text.
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
  - `fontWeight`: `number | "normal" | "bold" | "bolder" | "lighter"` - Font weight of the dropdown list items.
  - `fontFamily`: `string` - Font family of the dropdown list items.
  - `cursor`: `string` - Cursor style when hovering over list items.
  - `hoverColor`: `string` - Background color of items when hovered.
  - `animationDuration`: `number` - Duration of the open/close animation in milliseconds. Default: `300`
  - `maxDropHeight`: `number` - Maximum height of the dropdown list in pixels when open, useful for limiting the visible area and enabling scrolling. Default: `225`
  - `selectedColor`: `string` - Selected text color.
  - `selectedBackgroundColor`: `string` - Selected background color.
  - `separatorColor`: `string` - Color of the separator between items.
  - `separatorThickness`: `number` - Thickness of the separator in pixels. Default: `1`
  - `separatorStyle`: `'solid' | 'dotted' | 'dashed'` - Style of the separator line. Default: `'solid'`

### `theme`
- **Type**: `DropdownTheme`
- **Description**: Applies a color theme to the dropdown by setting scoped `--urd-*` CSS custom properties on the container element. Each dropdown instance can have its own theme. All fields are optional — only the properties you set will be overridden.

#### `DropdownTheme` Object
- **Properties**:
  - `backgroundColor`: `string` — Header background (`--urd-bg`)
  - `color`: `string` — Header text color (`--urd-color`)
  - `borderColor`: `string` — Border color (`--urd-border-color`)
  - `arrowColor`: `string` — Arrow fill color (`--urd-arrow-color`)
  - `arrowBorderColor`: `string` — Arrow border color (`--urd-arrow-border-color`)
  - `placeholderColor`: `string` — Placeholder text color (`--urd-placeholder-color`)
  - `listBackgroundColor`: `string` — List background (`--urd-list-bg`)
  - `listColor`: `string` — List text color (`--urd-list-color`)
  - `hoverBackgroundColor`: `string` — Item hover background (`--urd-hover-bg`)
  - `selectedBackgroundColor`: `string` — Selected item background (`--urd-selected-bg`)
  - `selectedColor`: `string` — Selected item text color (`--urd-selected-color`)
  - `separatorColor`: `string` — Item separator color (`--urd-separator-color`)
  - `focusRingColor`: `string` — Focus ring color (`--urd-focus-ring-color`)
  - `focusRingOffset`: `string` — Focus ring offset color (`--urd-focus-ring-offset`)

#### Style Priority

Styles are applied in the following order (each overrides the previous):

1. **CSS variables** — Light/dark defaults from `theme.css` on `:root`
2. **`theme` prop** — Sets `--urd-*` custom properties scoped to the instance
3. **Individual props** — `componentStyle`, `dropdownStyle`, `border`, etc. always win

#### Example

```tsx
import { Dropdown } from 'universal-react-dropdown';
import type { DropdownTheme } from 'universal-react-dropdown';

const oceanTheme: DropdownTheme = {
  backgroundColor: '#0a1628',
  color: '#b8d4e3',
  borderColor: '#1e3a5f',
  arrowColor: '#4a9ece',
  arrowBorderColor: '#4a9ece',
  placeholderColor: '#5a8aaa',
  listBackgroundColor: '#0d1f3c',
  listColor: '#b8d4e3',
  hoverBackgroundColor: '#1a3355',
  selectedBackgroundColor: '#1e4d7b',
  selectedColor: '#e0f0ff',
  separatorColor: '#1a3050',
  focusRingColor: '#4a9ece',
  focusRingOffset: '#0a1628',
};

<Dropdown
  items={items}
  renderItem={renderItem}
  theme={oceanTheme}
  placeholder={{ text: 'Pick one' }}
/>
```

### `selectedIndex`
- **Type**: `number`
- **Description**: Controlled mode — the parent owns the selected index. When provided, the dropdown reflects this value as the current selection. Use together with `onSelect` to update the value.

### `defaultIndex`
- **Type**: `number`
- **Description**: Uncontrolled mode with an initial value. Sets the initially selected index without requiring the parent to manage state afterward.

### `onOpen`
- **Type**: `() => void`
- **Description**: Callback fired when the dropdown begins opening (at the start of the open animation).

### `onClose`
- **Type**: `() => void`
- **Description**: Callback fired when the dropdown finishes closing (after the close animation completes).

### `ariaLabel`
- **Type**: `string`
- **Description**: Sets the `aria-label` attribute on the dropdown trigger for screen readers. Use when there is no visible label element.

### `ariaLabelledBy`
- **Type**: `string`
- **Description**: Sets the `aria-labelledby` attribute on the dropdown trigger. Use when a visible label element exists and you want to reference its `id`.

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

export const DropdownVisibility = {
  Opening: 'Opening', // Animating open
  Open: 'Open',       // Fully open
  Closing: 'Closing', // Animating close
  Closed: 'Closed',   // Fully closed
} as const;
type DropdownVisibilityValues<T> = T[keyof T];
export type DropdownVisibilityType = DropdownVisibilityValues<typeof DropdownVisibility>;

export interface Placeholder {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
}

export interface ArrowComponentProps {
  color: string;
  borderColor?: string;
  visibility: DropdownVisibilityType;
  animationDuration: number;
}

export interface ScrollData {
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
  fontWeight?: number | "normal" | "bold" | "bolder" | "lighter";
  fontFamily?: string;
  cursor?: string;
}

export interface ComponentStyle extends CommonStyle {
  arrowColor?: string;
  arrowBorderColor?: string;
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

export interface DropdownTheme {
  backgroundColor?: string;        // --urd-bg
  color?: string;                  // --urd-color
  borderColor?: string;            // --urd-border-color
  arrowColor?: string;             // --urd-arrow-color
  arrowBorderColor?: string;       // --urd-arrow-border-color
  placeholderColor?: string;       // --urd-placeholder-color
  listBackgroundColor?: string;    // --urd-list-bg
  listColor?: string;              // --urd-list-color
  hoverBackgroundColor?: string;   // --urd-hover-bg
  selectedBackgroundColor?: string; // --urd-selected-bg
  selectedColor?: string;          // --urd-selected-color
  separatorColor?: string;         // --urd-separator-color
  focusRingColor?: string;         // --urd-focus-ring-color
  focusRingOffset?: string;        // --urd-focus-ring-offset
}

export interface Size {
  width: number;
  height: number;
  top: number;
  left: number;
}


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

export interface Size {
  width: number;
  height: number;
  top: number;
  left: number;
}


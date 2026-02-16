import { toBorder } from "./helpers";
import { Border, ComponentStyle } from "./types";

type DropdownStyleInput = {
  name: 'dropdown';
  style: {
    width: number | string;
    componentStyle?: ComponentStyle;
    border: Border | string;
  };
} | {
  name: 'dropdown-header';
  style: {
    componentStyle: ComponentStyle;
    padding: number;
  };
};

export interface DropdownStyleResult {
  border: string;
  padding: string;
  width: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  backgroundColor: string;
}

export interface DropdownHeaderStyleResult {
  backgroundColor: string;
  padding: string;
  color: string;
}

export function getStyles(dStyle: DropdownStyleInput): DropdownStyleResult | DropdownHeaderStyleResult {
  switch (dStyle.name) {
    case 'dropdown':
      {
        const { width, componentStyle, border } = dStyle.style;
        const borderObject = toBorder(border);
        const borderStyle = `${borderObject.width}px ${borderObject.style} ${borderObject.color}`;
        return {
          width: `${typeof width === 'number' ? `${width}px` : width}`,
          fontFamily: `${componentStyle?.fontFamily || 'Arial'}`,
          fontSize: `${componentStyle?.fontSize || 16}px`,
          fontWeight: `${componentStyle?.fontWeight || 400}`,
          backgroundColor: `${componentStyle?.backgroundColor || 'transparent'}`,
          padding: `${borderObject.width}px`,
          border: borderStyle,
        } as DropdownStyleResult;
      }
    case 'dropdown-header':
      {
        const { componentStyle, padding } = dStyle.style;
        return {
          backgroundColor: `${componentStyle.backgroundColor}`,
          padding: `${padding}px`,
          color: `${componentStyle.color || 'black'}`,
        } as DropdownHeaderStyleResult ;
      }
  };
}

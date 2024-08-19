import { toBorder } from "./helpers";
import { Border, ComponentStyle } from "./types";

type DropdownStyle = {
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

export interface DropdownStyleResult extends Partial<CSSStyleSheet> {
  border: string;
  padding: string;
  width: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  backgroundColor: string;
};

export interface DropdownHeaderStyleResult {
  backgroundColor: string;
  padding: string;
  color: string;
}

export function useStyles(dStyle: DropdownStyle): DropdownStyleResult | DropdownHeaderStyleResult {
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
          backgroundColor: `${borderObject.color}`,
          padding: `${borderObject.width}px`,
          border: borderStyle,
          // borderRadius: `${borderObject.radius}px`,  // FIXME: Add support for border radius
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

import React from "react";
import { Border, DropdownTheme, ScrollData } from "./types";

const THEME_PROPERTY_MAP: Record<keyof DropdownTheme, string> = {
  backgroundColor: '--urd-bg',
  color: '--urd-color',
  borderColor: '--urd-border-color',
  arrowColor: '--urd-arrow-color',
  arrowBorderColor: '--urd-arrow-border-color',
  placeholderColor: '--urd-placeholder-color',
  listBackgroundColor: '--urd-list-bg',
  listColor: '--urd-list-color',
  hoverBackgroundColor: '--urd-hover-bg',
  selectedBackgroundColor: '--urd-selected-bg',
  selectedColor: '--urd-selected-color',
  separatorColor: '--urd-separator-color',
  focusRingColor: '--urd-focus-ring-color',
  focusRingOffset: '--urd-focus-ring-offset',
};

export function themeToCustomProperties(theme?: DropdownTheme): React.CSSProperties {
  if (!theme) return {};
  const vars: Record<string, string> = {};
  for (const key of Object.keys(theme) as (keyof DropdownTheme)[]) {
    const value = theme[key];
    if (value !== undefined) {
      vars[THEME_PROPERTY_MAP[key]] = value;
    }
  }
  return vars as React.CSSProperties;
}

export function toBorder(border: Border | string | undefined | null): Border {
  if (!border) {
    return { color: 'transparent', width: 0, style: 'none', radius: 0 };
  }
  if (typeof border === 'string') {
    const [width, style, color] = border.split(' ');
    return {
      width: parseInt(width) || 0,
      style: style || 'none',
      color: color || 'transparent',
      radius: 0,
    };
  }
  return border;
}

export function toScrollData(event: EventTarget | null): ScrollData | null {
  if (!event) return null;

  const el = event as HTMLElement;

  const visibleHeight = el.clientHeight || 0;
  const totalHeight = el.scrollHeight || 0;
  const scrollPosition = el.scrollTop || 0;
  const maxScroll = totalHeight - visibleHeight;

  return {
    visibleHeight,
    totalHeight,
    scrollPosition,
    maxScroll,
    client: {
      height: el.clientHeight,
      left: el.clientLeft,
      top: el.clientTop,
      width: el.clientWidth,
    },
    offset: {
      height: el.offsetHeight,
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
    },
    scroll: {
      height: el.scrollHeight,
      left: el.scrollLeft,
      top: el.scrollTop,
      width: el.scrollWidth,
    },
  };
}

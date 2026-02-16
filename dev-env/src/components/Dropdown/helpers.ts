import { Border, ScrollData } from "./types";

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

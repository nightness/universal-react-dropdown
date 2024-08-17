import { Border, ScrollData } from "./types";

export function toBorder(border: Border | string | undefined | null): Border {
  if (!border) {
    return { color: 'transparent', width: 0, style: 'none', radius: '1px' };
  }
  if (typeof border === 'string') {
    const [width, style, color] = border.split(' ');
    return {
      width: parseInt(width) || 0,
      style: style || 'none',
      color: color || 'transparent',
      radius: '1px',
    };
  }
  return border;
}

export function toScrollData(event: EventTarget | null): ScrollData | null {
  if (!event) return null;

  const clientHeight: number | undefined = (event as HTMLElement)?.clientHeight;
  const clientLeft: number | undefined = (event as HTMLElement)?.clientLeft;
  const clientTop: number | undefined = (event as HTMLElement)?.clientTop;
  const clientWidth: number | undefined = (event as HTMLElement)?.clientWidth;

  const offsetHeight: number | undefined = (event as HTMLElement)?.offsetHeight;
  const offsetLeft: number | undefined = (event as HTMLElement)?.offsetLeft;
  const offsetTop: number | undefined = (event as HTMLElement)?.offsetTop;
  const offsetWidth: number | undefined = (event as HTMLElement)?.offsetWidth;

  const scrollHeight: number | undefined = (event as HTMLElement)?.scrollHeight;
  const scrollLeft: number | undefined = (event as HTMLElement)?.scrollLeft;
  const scrollTop: number | undefined = (event as HTMLElement)?.scrollTop;
  const scrollWidth: number | undefined = (event as HTMLElement)?.scrollWidth;

  const visibleHeight = clientHeight || 0;
  const totalHeight = scrollHeight || 0;
  const scrollPosition = scrollTop || 0;
  const maxScroll = totalHeight - visibleHeight;

  return {
    visibleHeight,
    totalHeight,
    scrollPosition,
    maxScroll,
    client: {
      height: clientHeight,
      left: clientLeft,
      top: clientTop,
      width: clientWidth,
    },
    offset: {
      height: offsetHeight,
      left: offsetLeft,
      top: offsetTop,
      width: offsetWidth,
    },
    scroll: {
      height: scrollHeight,
      left: scrollLeft,
      top: scrollTop,
      width: scrollWidth,
    },
  };
}

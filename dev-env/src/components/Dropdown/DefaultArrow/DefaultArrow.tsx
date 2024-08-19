import React from 'react';
import { DropdownVisibility, ArrowComponentProps } from '../types';

export function DefaultArrow({ visibility, color, borderColor, animationDuration }: ArrowComponentProps) {
  return (
    <svg
      style={{
        transition: `transform ${animationDuration / 1000}s ease`,
        transform: visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening ? 'rotate(180deg)' : 'rotate(0deg',
      }}
      width="30"
      height="30"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="45" stroke={borderColor ? borderColor : color} strokeWidth="1" fill="none" />
      <text x="50" y="60" fontSize="60" textAnchor="middle" alignmentBaseline="middle" fill={color}>
        ▼
      </text>
    </svg>
  );
}

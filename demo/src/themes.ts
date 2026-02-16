import type { DropdownTheme } from "universal-react-dropdown";

export interface PresetTheme {
  name: string;
  theme: DropdownTheme;
}

export const presetThemes: PresetTheme[] = [
  {
    name: "Default",
    theme: {},
  },
  {
    name: "Ocean",
    theme: {
      backgroundColor: "#0a1628",
      color: "#b8d4e3",
      borderColor: "#1e3a5f",
      arrowColor: "#4a9ece",
      arrowBorderColor: "#4a9ece",
      placeholderColor: "#5a8aaa",
      listBackgroundColor: "#0d1f3c",
      listColor: "#b8d4e3",
      hoverBackgroundColor: "#1a3355",
      selectedBackgroundColor: "#1e4d7b",
      selectedColor: "#e0f0ff",
      separatorColor: "#1a3050",
      focusRingColor: "#4a9ece",
      focusRingOffset: "#0a1628",
    },
  },
  {
    name: "Sunset",
    theme: {
      backgroundColor: "#2d1b2e",
      color: "#f0d0c0",
      borderColor: "#6b3a5a",
      arrowColor: "#e87461",
      arrowBorderColor: "#e87461",
      placeholderColor: "#c08070",
      listBackgroundColor: "#341f35",
      listColor: "#f0d0c0",
      hoverBackgroundColor: "#4a2840",
      selectedBackgroundColor: "#7a3a50",
      selectedColor: "#ffe8d8",
      separatorColor: "#4a2540",
      focusRingColor: "#e87461",
      focusRingOffset: "#2d1b2e",
    },
  },
  {
    name: "Forest",
    theme: {
      backgroundColor: "#1a2e1a",
      color: "#c8e0c0",
      borderColor: "#2e5a2e",
      arrowColor: "#5aaa5a",
      arrowBorderColor: "#5aaa5a",
      placeholderColor: "#7aaa70",
      listBackgroundColor: "#1e331e",
      listColor: "#c8e0c0",
      hoverBackgroundColor: "#2a4a2a",
      selectedBackgroundColor: "#2e6a2e",
      selectedColor: "#e0ffe0",
      separatorColor: "#2a4028",
      focusRingColor: "#5aaa5a",
      focusRingOffset: "#1a2e1a",
    },
  },
  {
    name: "Neon",
    theme: {
      backgroundColor: "#0a0a1a",
      color: "#e0e0ff",
      borderColor: "#6a00ff",
      arrowColor: "#ff00aa",
      arrowBorderColor: "#ff00aa",
      placeholderColor: "#aa66ff",
      listBackgroundColor: "#0d0d22",
      listColor: "#e0e0ff",
      hoverBackgroundColor: "#1a1a3a",
      selectedBackgroundColor: "#2a0a4a",
      selectedColor: "#ff66dd",
      separatorColor: "#1a0a30",
      focusRingColor: "#ff00aa",
      focusRingOffset: "#0a0a1a",
    },
  },
];

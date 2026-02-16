import { useState } from "react";
import { Page } from "@components/index";
import { Dropdown } from "universal-react-dropdown";
import "./DemoPage.css";

interface Item {
  id: number;
  name: string;
}

const items: Item[] = Array.from({ length: 29 }, (_, i) => ({
  id: i + 1,
  name: i === 5 ? "Item 6 efefefewfewfew" : `Item ${i + 1}`,
}));

const renderItem = (item: Item | null, _index: number, isSelected: boolean) => (
  <div style={{ minHeight: "22px", fontWeight: isSelected ? "800" : "400" }}>
    {item?.name}
  </div>
);

type HAlign = "left" | "center" | "right";
type VAlign = "top" | "center" | "bottom";

const placements: { label: string; h: HAlign; v: VAlign }[] = [
  { label: "Top Left", h: "left", v: "top" },
  { label: "Top Center", h: "center", v: "top" },
  { label: "Top Right", h: "right", v: "top" },
  { label: "Mid Left", h: "left", v: "center" },
  { label: "Center", h: "center", v: "center" },
  { label: "Mid Right", h: "right", v: "center" },
  { label: "Bot Left", h: "left", v: "bottom" },
  { label: "Bot Center", h: "center", v: "bottom" },
  { label: "Bot Right", h: "right", v: "bottom" },
];

function getPlacementStyle(h: HAlign, v: VAlign): React.CSSProperties {
  const style: React.CSSProperties = {};
  switch (h) {
    case "left": style.left = "0"; break;
    case "center": style.left = "50%"; style.transform = "translateX(-50%)"; break;
    case "right": style.right = "0"; break;
  }
  switch (v) {
    case "top": style.top = "0"; break;
    case "center":
      style.top = "50%";
      style.transform = (style.transform || "") + " translateY(-50%)";
      break;
    case "bottom": style.bottom = "0"; break;
  }
  return style;
}

export default function DemoPage() {
  // Placement
  const [hAlign, setHAlign] = useState<HAlign>("center");
  const [vAlign, setVAlign] = useState<VAlign>("center");

  // General
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [padding, setPadding] = useState(5);
  const [disabled, setDisabled] = useState(false);
  const [allowNoSelection, setAllowNoSelection] = useState(false);

  // Border
  const [borderColor, setBorderColor] = useState("#008000");
  const [borderWidth, setBorderWidth] = useState(3);
  const [borderStyle, setBorderStyle] = useState("solid");

  // Component Style
  const [bgColor, setBgColor] = useState("#d3d3d3");
  const [textColor, setTextColor] = useState("#000000");
  const [arrowColor, setArrowColor] = useState("#000000");
  const [arrowBorderColor, setArrowBorderColor] = useState("#000000");

  // Preview
  const [previewBgColor, setPreviewBgColor] = useState("#1a1a2e");

  // Placeholder
  const [placeholderText, setPlaceholderText] = useState("Select an item");
  const [placeholderColor, setPlaceholderColor] = useState("#000000");
  const [placeholderFontSize, setPlaceholderFontSize] = useState(16);
  const [placeholderFontWeight, setPlaceholderFontWeight] = useState(300);

  // Dropdown Style
  const [direction, setDirection] = useState<"down" | "up">("down");
  const [dropBgColor, setDropBgColor] = useState("#c0c0c0");
  const [dropTextColor, setDropTextColor] = useState("#000000");
  const [hoverColor, setHoverColor] = useState("#ffa500");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedBgColor, setSelectedBgColor] = useState("#add8e6");
  const [animationDuration, setAnimationDuration] = useState(700);
  const [maxDropHeight, setMaxDropHeight] = useState(300);
  const [separatorColor, setSeparatorColor] = useState("#808080");
  const [separatorThickness, setSeparatorThickness] = useState(2);
  const [separatorStyle, setSeparatorStyle] = useState<"solid" | "dotted" | "dashed">("dotted");

  return (
    <Page style={{ padding: 0, height: '100%' }}>
      <div className="demo-page">
        <div className="demo-preview" style={{ backgroundColor: previewBgColor }}>
          <div className="demo-preview-inner" style={getPlacementStyle(hAlign, vAlign)}>
            <Dropdown
            width={width}
            padding={padding}
            disabled={disabled}
            allowNoSelection={allowNoSelection}
            items={items}
            renderItem={renderItem}
            onSelect={() => {}}
            border={{ width: borderWidth, style: borderStyle, color: borderColor, radius: 5 }}
            componentStyle={{
              backgroundColor: bgColor,
              color: textColor,
              arrowColor,
              arrowBorderColor,
            }}
            placeholder={{
              text: placeholderText,
              color: placeholderColor,
              fontSize: placeholderFontSize,
              fontWeight: placeholderFontWeight,
            }}
            dropdownStyle={{
              dropdownDirection: direction,
              backgroundColor: dropBgColor,
              color: dropTextColor,
              hoverColor,
              selectedColor,
              selectedBackgroundColor: selectedBgColor,
              animationDuration,
              maxDropHeight,
              separatorColor,
              separatorThickness,
              separatorStyle,
            }}
          />
          </div>
        </div>

        <div className="demo-controls">
          <h2>Controls</h2>

          {/* Preview */}
          <details className="demo-section" open>
            <summary>Preview</summary>
            <div className="demo-row">
              <label>Background</label>
              <input
                type="color"
                value={previewBgColor}
                onChange={(e) => setPreviewBgColor(e.target.value)}
              />
            </div>
          </details>

          {/* Placement */}
          <details className="demo-section" open>
            <summary>Placement</summary>
            <div className="demo-placement-grid">
              {placements.map((p) => (
                <button
                  key={p.label}
                  className={`demo-placement-btn${hAlign === p.h && vAlign === p.v ? " active" : ""}`}
                  onClick={() => { setHAlign(p.h); setVAlign(p.v); }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </details>

          {/* General */}
          <details className="demo-section" open>
            <summary>General</summary>
            <div className="demo-row">
              <label>Width (px)</label>
              <input
                type="number"
                value={width ?? ""}
                placeholder="auto"
                onChange={(e) =>
                  setWidth(e.target.value === "" ? undefined : Number(e.target.value))
                }
              />
            </div>
            <div className="demo-row">
              <label>Padding</label>
              <input
                type="range"
                min={0}
                max={30}
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
              />
              <span className="demo-range-value">{padding}</span>
            </div>
            <div className="demo-row">
              <label>Disabled</label>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
            </div>
            <div className="demo-row">
              <label>Allow No Selection</label>
              <input
                type="checkbox"
                checked={allowNoSelection}
                onChange={(e) => setAllowNoSelection(e.target.checked)}
              />
            </div>
          </details>

          {/* Border */}
          <details className="demo-section" open>
            <summary>Border</summary>
            <div className="demo-row">
              <label>Color</label>
              <input
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Width</label>
              <input
                type="range"
                min={0}
                max={10}
                value={borderWidth}
                onChange={(e) => setBorderWidth(Number(e.target.value))}
              />
              <span className="demo-range-value">{borderWidth}</span>
            </div>
            <div className="demo-row">
              <label>Style</label>
              <select value={borderStyle} onChange={(e) => setBorderStyle(e.target.value)}>
                <option value="solid">solid</option>
                <option value="dashed">dashed</option>
                <option value="dotted">dotted</option>
                <option value="none">none</option>
              </select>
            </div>
          </details>

          {/* Component Style */}
          <details className="demo-section" open>
            <summary>Component Style</summary>
            <div className="demo-row">
              <label>Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Text Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Arrow Color</label>
              <input
                type="color"
                value={arrowColor}
                onChange={(e) => setArrowColor(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Arrow Border</label>
              <input
                type="color"
                value={arrowBorderColor}
                onChange={(e) => setArrowBorderColor(e.target.value)}
              />
            </div>
          </details>

          {/* Placeholder */}
          <details className="demo-section" open>
            <summary>Placeholder</summary>
            <div className="demo-row">
              <label>Text</label>
              <input
                type="text"
                value={placeholderText}
                onChange={(e) => setPlaceholderText(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Color</label>
              <input
                type="color"
                value={placeholderColor}
                onChange={(e) => setPlaceholderColor(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Font Size</label>
              <input
                type="range"
                min={10}
                max={32}
                value={placeholderFontSize}
                onChange={(e) => setPlaceholderFontSize(Number(e.target.value))}
              />
              <span className="demo-range-value">{placeholderFontSize}</span>
            </div>
            <div className="demo-row">
              <label>Font Weight</label>
              <input
                type="range"
                min={100}
                max={900}
                step={100}
                value={placeholderFontWeight}
                onChange={(e) => setPlaceholderFontWeight(Number(e.target.value))}
              />
              <span className="demo-range-value">{placeholderFontWeight}</span>
            </div>
          </details>

          {/* Dropdown Style */}
          <details className="demo-section" open>
            <summary>Dropdown Style</summary>
            <div className="demo-row">
              <label>Direction</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as "down" | "up")}
              >
                <option value="down">down</option>
                <option value="up">up</option>
              </select>
            </div>
            <div className="demo-row">
              <label>Background</label>
              <input
                type="color"
                value={dropBgColor}
                onChange={(e) => setDropBgColor(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Text Color</label>
              <input
                type="color"
                value={dropTextColor}
                onChange={(e) => setDropTextColor(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Hover Color</label>
              <input
                type="color"
                value={hoverColor}
                onChange={(e) => setHoverColor(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Selected Color</label>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Selected BG</label>
              <input
                type="color"
                value={selectedBgColor}
                onChange={(e) => setSelectedBgColor(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Animation (ms)</label>
              <input
                type="range"
                min={0}
                max={1000}
                value={animationDuration}
                onChange={(e) => setAnimationDuration(Number(e.target.value))}
              />
              <span className="demo-range-value">{animationDuration}</span>
            </div>
            <div className="demo-row">
              <label>Max Height</label>
              <input
                type="range"
                min={50}
                max={500}
                value={maxDropHeight}
                onChange={(e) => setMaxDropHeight(Number(e.target.value))}
              />
              <span className="demo-range-value">{maxDropHeight}</span>
            </div>
            <div className="demo-row">
              <label>Sep. Color</label>
              <input
                type="color"
                value={separatorColor}
                onChange={(e) => setSeparatorColor(e.target.value)}
              />
            </div>
            <div className="demo-row">
              <label>Sep. Thickness</label>
              <input
                type="range"
                min={0}
                max={5}
                value={separatorThickness}
                onChange={(e) => setSeparatorThickness(Number(e.target.value))}
              />
              <span className="demo-range-value">{separatorThickness}</span>
            </div>
            <div className="demo-row">
              <label>Sep. Style</label>
              <select
                value={separatorStyle}
                onChange={(e) =>
                  setSeparatorStyle(e.target.value as "solid" | "dotted" | "dashed")
                }
              >
                <option value="solid">solid</option>
                <option value="dotted">dotted</option>
                <option value="dashed">dashed</option>
              </select>
            </div>
          </details>
        </div>
      </div>
    </Page>
  );
}

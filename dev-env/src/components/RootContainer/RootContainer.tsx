import { HTMLAttributes } from "react";
// import useWindowDimensions from "@hooks/useWindowDimensions";

// Import the CSS module
import "./RootContainer.css";
import useWindowDimensions from "@hooks/useWindowDimensions";

function RootContainer({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { width, height } = useWindowDimensions();

  return (
    <div style={{
      width: `${width}px`,
      height: `${height}px`,
    }}>
      <div className="innerContainer" {...props}>
        {children}
      </div>
    </div>
  );
}

export default RootContainer;

import { CSSProperties } from "react";

import "./Page.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[];  
  style?: CSSProperties;
  pageScroll?: boolean;
}

export const Page = ({ children, style, pageScroll, className: childComponentClassName, ...restProps }: Props) => {
  const className = pageScroll ? "page page-scroll" : "page";

  return (
    <div className={className}>
      <div className={`child-component ${childComponentClassName}`} style={style} {...restProps}>
        {children}
      </div>
    </div>
  );
};

export default Page;

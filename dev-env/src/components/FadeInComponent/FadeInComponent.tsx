// FadeInComponent.jsx
import "./FadeInComponent.css";
import { animated, useSpring } from "@react-spring/web";

const FadeInComponent = ({
  className,
  children,
  style,
  duration,
  bounce,
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  duration?: number;
  bounce?: number;
}) => {
  // return <div className="fade-in">{children}</div>
  const animationStyle = useSpring({
    config: {
      duration,
      bounce,
    },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <animated.div
      className={className}
      style={{
        ...style,
        ...animationStyle,
      }}
    >
      {children}
    </animated.div>
  );
};

export default FadeInComponent;

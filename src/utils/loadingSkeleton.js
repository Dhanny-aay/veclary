import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GenericLoadingSkeleton = ({
  count = 1, // Number of skeleton lines (e.g. 1 for single line, 2 for double line)
  width = "100%", // Default width to 100% but adjustable
  height = 20, // Default height for each skeleton line
  borderRadius = 4, // Border-radius to give it rounded corners
  circle = false, // If true, makes the skeleton a circle (good for avatars)
  style = {}, // Additional style overrides
  className = "", // Custom classNames for CSS styling
}) => {
  return (
    <Skeleton
      count={count}
      width={circle ? height : width}
      height={height}
      circle={circle}
      borderRadius={borderRadius}
      className={className}
      style={style}
    />
  );
};

export default GenericLoadingSkeleton;

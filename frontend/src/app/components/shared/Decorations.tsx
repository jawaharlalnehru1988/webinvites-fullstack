import imgRosePetal from "../../../imports/LandingScreen/6da77b66ef356ac21d8beceb022a8b6ab48d9cb3.png";
import imgLeaf from "../../../imports/LandingScreen/467889f7c73eb49117362fa1a716c4332db4b1d8.png";

export function RosePetal({
  style,
  className = "",
}: {
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <img
      src={imgRosePetal}
      alt=""
      aria-hidden
      className={`absolute object-cover pointer-events-none ${className}`}
      style={style}
    />
  );
}

export function LeafImg({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={imgLeaf}
      alt=""
      aria-hidden
      className={`object-cover pointer-events-none ${className}`}
      style={style}
    />
  );
}

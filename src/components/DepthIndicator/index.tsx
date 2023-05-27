type Props = {
  color: "green" | "red";
  width: number;
  direction: "l" | "r";
};

const DepthIndicator: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        backgroundColor:
          props.color === "green"
            ? "rgba(47 126 2/ 0.2)"
            : "rgba(126 24 2/ 0.2)",
        width: `${props.width}%`,
      }}
      className={`h-full absolute top-0 bottom-0 ${
        props.direction === "l" ? "left-0" : "right-0"
      }`}
    />
  );
};
export default DepthIndicator;

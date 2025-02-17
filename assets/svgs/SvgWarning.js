import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgWarning = ({ width = 40, height = 40, color = "#E63946" }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M12 2a1 1 0 0 1 .89.55l9 18A1 1 0 0 1 21 22H3a1 1 0 0 1-.89-1.45l9-18A1 1 0 0 1 12 2Zm0 4.5a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1Zm0 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
      />
    </Svg>
  );
};

export default SvgWarning;

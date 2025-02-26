import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgNotifications = (props) => (
  <Svg
    width="800px"
    height="800px"
    viewBox="0 0 1024 1024"
    className="icon"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fill="#000000"
      d="M512 64a64 64 0 0164 64v64H448v-64a64 64 0 0164-64z"
    />
    <Path
      fill="#000000"
      d="M256 768h512V448a256 256 0 10-512 0v320zm256-640a320 320 0 01320 320v384H192V448a320 320 0 01320-320z"
    />
    <Path
      fill="#000000"
      d="M96 768h832q32 0 32 32t-32 32H96q-32 0-32-32t32-32zM448 896h128a64 64 0 01-128 0z"
    />
  </Svg>
);
export default SvgNotifications;

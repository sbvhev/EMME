import React from "react";

import Icon from "assets/icons/brightness.svg";

interface Props {
  width?: number;
  className?: any;
}

const Brightness: React.FC<Props> = ({ width, className }) => {
  return <img alt="" src={Icon} width={width || 20} className={className} />;
};

export default Brightness;

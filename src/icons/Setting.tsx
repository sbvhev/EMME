import React from "react";

import Icon from "assets/icons/settings.svg";

interface Props {
  width?: number;
  className?: any;
}

const Setting: React.FC<Props> = ({ width, className }) => {
  return <img alt="" src={Icon} width={width || 20} className={className} />;
};

export default Setting;

import React from "react";

import Icon from "assets/icons/logout.svg";

interface Props {
  width?: number;
  className?: any;
}

const Logout: React.FC<Props> = ({ width, className }) => {
  return <img alt="" src={Icon} width={width || 20} className={className} />;
};

export default Logout;

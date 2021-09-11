import React from "react";

import Icon from "assets/icons/user.svg";

interface Props {
  width?: number;
  className?: any;
}

const User: React.FC<Props> = ({ width, className }) => {
  return <img alt="" src={Icon} width={width || 20} className={className} />;
};

export default User;

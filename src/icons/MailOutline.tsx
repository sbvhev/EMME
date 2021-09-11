import React from "react";

import Icon from "assets/icons/mail-outline.svg";

interface Props {
  width?: number;
  className?: any;
}

const MailOutline: React.FC<Props> = ({ width, className }) => {
  return <img alt="" src={Icon} width={width || 20} className={className} />;
};

export default MailOutline;

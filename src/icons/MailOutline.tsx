import React from "react";

import Icon from "assets/icons/mail-outline.svg";

interface Props {
  width?: number;
}

const MailOutline: React.FC<Props> = ({ width }) => {
  return <img alt="" src={Icon} width={width || 20} />;
};

export default MailOutline;

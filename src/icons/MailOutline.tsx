import React from 'react';

import Icon from 'assets/icons/mail-outline.svg';

interface Props {
  width: number;
  className: any;
}

const MailOutline = ({ width, className }: Props) => (
  <img alt="" src={Icon} width={width || 20} className={className} />
);

export default MailOutline;

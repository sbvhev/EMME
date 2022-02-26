import React from 'react';

import Icon from 'assets/icons/mail-outline-light.svg';

interface Props {
  width: number;
  className: any;
}

const MailOutlineLight = ({ width, className }: Props) => (
  <img alt="" src={Icon} width={width || 20} className={className} />
);

export default MailOutlineLight;

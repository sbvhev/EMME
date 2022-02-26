import React from 'react';

import Icon from 'assets/icons/logout.svg';

interface Props {
  width: number;
  className: any;
}

const Logout = ({ width, className }: Props) => (
  <img alt="" src={Icon} width={width || 20} className={className} />
);

export default Logout;

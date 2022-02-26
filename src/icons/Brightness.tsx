import React from 'react';

import Icon from 'assets/icons/brightness.svg';

interface Props {
  width: number;
  className: string;
}

const Brightness = ({ width, className }: Props) => (
  <img alt="" src={Icon} width={width || 20} className={className || ''} />
);

export default Brightness;

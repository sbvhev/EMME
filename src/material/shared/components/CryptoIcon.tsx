import React from 'react';

import { ReactComponent as BTC } from 'assets/crypto/btc.svg';
import { ReactComponent as EMME } from 'assets/crypto/emme.svg';
import Default from 'assets/crypto/default.png';

interface CryptoIconProps {
  icon?: string;
}

const CryptoIcon = ({ icon }: CryptoIconProps) => {
  switch (icon?.toLowerCase()) {
    case 'btc':
      return <BTC stroke="none" />;
    case 'emme':
      return <EMME stroke="none" />;

    default:
      return <img src={Default} alt="default icon" width="33" height="33" />;
  }
};

CryptoIcon.defaultProps = {
  icon: undefined,
};

export default CryptoIcon;

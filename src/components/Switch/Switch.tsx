import React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Switch, {
  // SwitchClassKey,
  SwitchProps,
} from '@material-ui/core/Switch';

// interface Styles extends Partial<Record<SwitchClassKey, string>> {
//   focusVisible?: string;
// }

interface Props extends SwitchProps {
  // classes?: Styles;
  checked?: boolean;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 40,
      height: 20,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 4,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(20px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
      top: '5px',
    },
    track: {
      // border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 32,
      opacity: 1,
      backgroundColor: '#353945',
      // backgroundColor: theme.palette.common.black,
    },
    checked: {},
  })
)(Switch);

const SwitchCustom = ({ checked, onChange, name }: Props) => (
  <AntSwitch checked={checked} onChange={onChange} name={name} />
);

SwitchCustom.defaultProps = {
  checked: false,
  name: '',
};

export default SwitchCustom;

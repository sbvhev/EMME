import React, { ReactNode } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";


const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    alignItems: "flex-start",
  },
});

const BlueCheckbox = withStyles({
  root: {
    color: "#3772FF",
    "&$checked": {
      color: "#3772FF",
    },
    marginTop: "7px",
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox {...props} />);

interface Props {
  label?: string | ReactNode | any;
  name: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const CheckboxCustom: React.FC<Props> = ({
  name,
  label,
  checked,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <BlueCheckbox name={name} checked={checked} onChange={onChange} />
      {label}
    </div>
  );
};

export default CheckboxCustom;

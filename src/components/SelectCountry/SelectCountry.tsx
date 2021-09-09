import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Menu, MenuItem } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import USDIcon from "assets/icons/usd.svg";
import EURIcon from "assets/icons/eur.svg";

interface Props {
  value: string | any;
}

type CurrencyType = {
  flag: any;
  name: string;
};

const currencyList = [
  {
    id: 1,
    flag: USDIcon,
    name: "USD",
  },
  {
    id: 2,
    flag: EURIcon,
    name: "EUR",
  },
];

const useStyles = makeStyles({
  root: {
    width: "auto",
    // minWidth: '200px',
  },
  button: {
    background: "#23262F",
    borderRadius: "48px",
    padding: "12px 16px",
  },
  text: {
    color: "#FCFCFD",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left",
    minWidth: "248px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  endIcon: {
    marginLeft: "auto",
  },
  paper: {
    minWidth: "248px",
  },
  list: {
    maxHeight: "300px",
    overflow: "auto",
  },
  flag: {
    width: "16px",
    marginRight: "12px",
  },
  menuItem: {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FCFCFD",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
});

const SelectCountry: React.FC<Props> = ({ value }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<null | CurrencyType>(
    currencyList[0]
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (item: CurrencyType) => {
    setSelected(item);
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        classes={{
          text: classes.text,
          label: classes.label,
          endIcon: classes.endIcon,
        }}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selected ? (
          <span className={classes.menuItem}>
            <img className={classes.flag} alt="" src={selected.flag} />
            {selected.name}
          </span>
        ) : (
          "Select"
        )}
      </Button>
      <Menu
        classes={{
          list: classes.list,
          paper: classes.paper,
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {currencyList.map((item, i) => (
          <MenuItem
            classes={{
              root: classes.menuItem,
            }}
            key={i}
            onClick={() => handleSelect(item)}
          >
            <img className={classes.flag} width={16} alt="" src={item.flag} />{" "}
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SelectCountry;

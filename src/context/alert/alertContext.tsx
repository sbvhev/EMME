import { createContext } from 'react';

import { Color } from '@material-ui/lab/Alert';

type AlertContextType = {
  alerts: {
    id: string;
    type: Color;
    msg: string;
    timeout: number;
  }[];
  setAlert: (msg: string, type: 'error' | 'info' | 'success', timeout?: number) => void;
  removeAlert: (id: string) => void;
};

const alertContext = createContext<AlertContextType>({
  alerts: [],
  setAlert: () => null,
  removeAlert: () => null,
});

export default alertContext;

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'state';
import * as storage from 'material/shared/utils/localstorage';
import { StorageKey } from 'material/shared/model/localstorage.model';

import { updateMediaDarkMode, updateUserDarkMode } from './actions';

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userExistingDarkMode = Number(storage.get(StorageKey.EMME_DARK_MODE));

    dispatch(updateUserDarkMode({ userDarkMode: Boolean(userExistingDarkMode) }));

    const darkHandler = (match: MediaQueryListEvent) => {
      dispatch(updateMediaDarkMode({ mediaDarkMode: match.matches }));
    };

    const match = window?.matchMedia('(prefers-color-scheme: dark)');

    dispatch(updateMediaDarkMode({ mediaDarkMode: match.matches }));

    if (match?.addListener) {
      match?.addListener(darkHandler);
    } else if (match?.addEventListener) {
      match?.addEventListener('change', darkHandler);
    }

    return () => {
      if (match?.removeListener) {
        match?.removeListener(darkHandler);
      } else if (match?.removeEventListener) {
        match?.removeEventListener('change', darkHandler);
      }
    };
  }, [dispatch]);

  return null;
}

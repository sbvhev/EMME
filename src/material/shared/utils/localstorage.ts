import { StorageKey } from '../model/localstorage.model';

export async function get(key: StorageKey): Promise<any> {
  const value = localStorage?.getItem(key);
  try {
    const parsedValue = value !== null ? JSON.parse(value) : null;
    return parsedValue;
  } catch (error) {
    localStorage?.removeItem(key);

    console.log(`function: 'localStorage.get',
      message: 'Could not parse value for key:${key} value:${value}',
      cause: ${error}`);
  }
}

export async function set(key: StorageKey, value: any): Promise<void> {
  let stringifiedValue: string;
  try {
    stringifiedValue = JSON.stringify(value);
  } catch (error) {
    console.log(`function: 'localStorage.set',
      message: 'Could not stringify value for key:${key} value:${value}',
      cause: ${error}`);
    return;
  }

  try {
    localStorage?.setItem(key, stringifiedValue);
  } catch (error) {
    console.log(`function: 'localStorage.set',
      message: 'Could not save to localStorage for key:${key} value:${value}',
      cause: ${error}`);
  }
}

export async function remove(key: StorageKey): Promise<void> {
  localStorage?.removeItem(key);
}

export async function clear(): Promise<void> {
  localStorage.removeItem(StorageKey.EMME_EMAIL);
  localStorage.removeItem(StorageKey.EMME_ID);
  localStorage.removeItem(StorageKey.EMME_TOKEN);
  localStorage.removeItem(StorageKey.EMME_REMEMBER_ME);
}

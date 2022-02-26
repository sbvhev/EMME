import { StorageKey } from '../model/localstorage.model';

export async function get(key: StorageKey): Promise<any> {
  const value = await localStorage?.getItem(key);
  try {
    const parsedValue = value !== null ? JSON.parse(value) : null;
    return parsedValue;
  } catch (error) {
    await localStorage?.removeItem(key);

    console.info(`function: 'localStorage.get',
      message: 'Could not parse value for key:${key} value:${value}',
      cause: ${error}`);
  }
}

export async function set(key: StorageKey, value: any): Promise<void> {
  let stringifiedValue: string;
  try {
    stringifiedValue = await JSON.stringify(value);
  } catch (error) {
    console.info(`function: 'localStorage.set',
      message: 'Could not stringify value for key:${key} value:${value}',
      cause: ${error}`);
    return;
  }

  try {
    await localStorage?.setItem(key, stringifiedValue);
  } catch (error) {
    console.info(`function: 'localStorage.set',
      message: 'Could not save to localStorage for key:${key} value:${value}',
      cause: ${error}`);
  }
}

export async function remove(key: StorageKey): Promise<void> {
  await localStorage?.removeItem(key);
}

export async function clear(): Promise<void> {
  await localStorage.removeItem(StorageKey.EMME_EMAIL);
  await localStorage.removeItem(StorageKey.EMME_ID);
  await localStorage.removeItem(StorageKey.EMME_TOKEN);
  await localStorage.removeItem(StorageKey.EMME_REMEMBER_ME);
}

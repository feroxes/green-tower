export const LocalStorage = {
  getItem<T>(storage: string): T | null {
    const storageItem = window.localStorage.getItem(storage) as string;
    try {
      return JSON.parse(storageItem) || null;
    } catch (e) {
      console.error(`Unexpected error occurred while loading ${storage} from LocalStorage.'`, e);
      return null;
    }
  },

  setItem<T>(storage: string, item: T) {
    window.localStorage.setItem(storage, JSON.stringify(item));
  },
};

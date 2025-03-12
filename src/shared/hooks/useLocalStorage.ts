import { ref, watch } from 'vue';

export function useLocalStorage(key: string, initialValue: any) {
  const storedValue = localStorage.getItem(key);
  const data = ref(storedValue ? JSON.parse(storedValue) : initialValue);

  const setItem = (value: any) => {
    data.value = value;
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItem = () => {
    data.value = null;
    localStorage.removeItem(key);
  };

  watch(data, (newValue) => {
    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  },
  { deep: true });

  return {
    data,
    setItem,
    removeItem,
  };
}
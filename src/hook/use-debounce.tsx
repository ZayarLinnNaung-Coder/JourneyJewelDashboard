import { useEffect, useState } from "react";

const UseDebounce = (val: string) => {
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounce(val);
    }, 300);

    return () => clearTimeout(timeOut);
  }, [val]);

  return { debounce };
};

export default UseDebounce;

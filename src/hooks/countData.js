import { useEffect, useState } from "react";
import { fetchCount } from "../services/apiService";

const CountData = (endpoint) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchCount(endpoint).then(setCount);
  }, [endpoint]);

  return count;
};

export default CountData;
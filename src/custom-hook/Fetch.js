/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

const fetchHook = (action) => {
  // eslint-disable-next-line no-unused-vars
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    const fetchedData = async () => {
      const res = await action();
      setFetchedData(res.data);
    };

    fetchedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, window.location.pathname]);

  return { fetchedData, setFetchedData };
};

export default fetchHook;

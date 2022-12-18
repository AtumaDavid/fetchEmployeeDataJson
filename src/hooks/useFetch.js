import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  //loading
  const [isPending, setIsPending] = useState(false);

  //useEffect to fetch data
  useEffect(() => {
    //cleanUp Function
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();

        //after data has been fetch
        setIsPending(false);
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          //   <div>search was aborted</div>;
        } else {
          setError("could not fetch the data");
        }
      }
    };
    fetchData();

    //cleanup function
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data: data, error, isPending };
};

export default useFetch;

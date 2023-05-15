import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [fetchData, setFetchData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = async(url: any, header: any) => {
      function Dataget() {
        axios
          .get(url, { headers: header })
          .then((res) => {
            setLoading(true);
            setFetchData(res.data);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => setLoading(false));
          console.log(fetchData);
          return fetchData 
      }
      return Dataget();
  };

  const post = (url: any, bodys: any, header: any) => {
      const dataset = () => {
        axios
          .post(url, bodys)
          .then(res => setFetchData(res.data))
          .catch((err) => {
            setError(err);
          })
          .finally(() => setLoading(false));
          return fetchData
      };
      return dataset();
  };

  const put = (url: any, bodys: any, header: any) => {
    useEffect(() => {
      axios
        .put(url, { body: bodys }, { headers: header })
        .then((res) => {
          setLoading(true);
          setFetchData(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLoading(false));
    }, [url]);
    
  };

  return { fetchData, Loading, error, get, post,put };
};

export default useFetch;

import { useState, useCallback } from 'react';
import axios from 'axios';

const useFetch = (options) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });

  const callAPI = useCallback(() => {
    setRes((prevState) => ({ ...prevState, isLoading: true }));
    axios(options)
      .then((res) => {
        setRes({ data: res.data, isLoading: false, error: null });
      })
      .catch((error) => setRes({ data: null, isLoading: false, error }));
  }, [options]);

  return [res, callAPI];
};

export default useFetch;

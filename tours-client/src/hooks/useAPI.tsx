import React, { FC, useState, useEffect } from 'react';
import Axios from 'axios';

interface IuseAPIProps {
  url: string;
}

const useAPI = ({ url }: IuseAPIProps): any[] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [response, setResponse] = useState<any | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get(url);
      setResponse(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [response, error, loading];
};

export default useAPI;

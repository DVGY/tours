/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import Axios from 'axios';

Axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`;

export enum AxiosMethods {
  GET = 'get',
  PUT = 'put',
  PATCH = 'patch',
  POST = 'post',
  DELETE = 'delete',
}

interface IuseAPIProps {
  // url: string;
  method?: AxiosMethods;
  resource: string;
  query?: any;
  // data?: any;
  // ratingsAverage: number;
}

interface useAPIReponse {
  response: any | null;
  error: any | null;
  loading: boolean;
}

const useAPI = ({
  method = AxiosMethods.GET,
  resource,
  query,
}: IuseAPIProps): useAPIReponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [response, setResponse] = useState<any | null>(null);

  const queryParams = (query: any) => {
    if (query) {
      const queryParamsSantized: any = {};
      for (const queryProperty in query) {
        if (query[queryProperty]) {
          if (queryProperty === 'ratingsAverage') {
            queryParamsSantized[`${queryProperty}[gte]`] = query[queryProperty];
          } else {
            queryParamsSantized[queryProperty] = query[queryProperty];
          }
        }
      }
      return queryParamsSantized;
    }
    return {};
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await Axios({
          method,
          url: resource,
          params: queryParams(query),
        });
        setResponse(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.response);
      }
    };
    fetchData();
  }, [method, resource, query]);

  return { response, error, loading };
};

export default useAPI;

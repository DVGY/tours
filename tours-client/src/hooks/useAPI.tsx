/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import isEqual from 'fast-deep-equal';
Axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`;

export enum AxiosMethods {
  GET = 'get',
  PUT = 'put',
  PATCH = 'patch',
  POST = 'post',
  DELETE = 'delete',
}
// enum APIResources{
//   Trips:"trips"
// }

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
// function usePrevious(value: any) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }
const useAPI = ({
  // url,
  method = AxiosMethods.GET,
  resource,
  query,
}: IuseAPIProps): useAPIReponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [response, setResponse] = useState<any | null>(null);
  const propsRef = useRef({ method, resource, query });
  // const previousVal = usePrevious({ method, resource, query });

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

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (
      isEqual(method, propsRef.current.method) &&
      isEqual(resource, propsRef.current.resource) &&
      isEqual(query, propsRef.current.query)
    ) {
      return;
    }

    console.log(method, resource, query);

    fetchData();
    // propsRef.current = { method, resource, query };
  }, [method, resource, query]);

  return { response, error, loading };
};

export default useAPI;

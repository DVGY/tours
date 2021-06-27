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
    // console.log('Prev', propsRef.current);

    // This is not working
    // if (propsRef.current !== undefined) {
    //   if (
    //     isEqual(method, propsRef.current.method) &&
    //     isEqual(resource, propsRef.current.resource) &&
    //     isEqual(query, propsRef.current.query)
    //   ) {
    //     return;
    //   }
    // }
    // if (
    //   isEqual(method, propsRef.current.method) &&
    //   isEqual(resource, propsRef.current.resource) &&
    //   isEqual(query, propsRef.current.query)
    // ) {
    //   return;
    // }

    // console.log(method, resource, query);

    // propsRef.current = { method, resource, query };
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
    // console.log(propsRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(method), JSON.stringify(resource), JSON.stringify(query)]);
  // }, [method, resource, query]);

  return { response, error, loading };
};

export default useAPI;

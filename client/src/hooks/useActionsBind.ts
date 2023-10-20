import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../redux/index';

export const useActionsBind = (): typeof actionCreators => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};

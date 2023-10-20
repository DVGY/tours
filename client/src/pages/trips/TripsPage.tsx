import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import TripsShow from './TripsShow';
import TripsDetails from './TripsDetails';
import NotFound from '../../components/not-found/NotFound';

const TripsPage: FC = () => {
  return (
    <Routes>
      <Route index element={<TripsShow />} />
      <Route path=':id' element={<TripsDetails />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default TripsPage;

import { getATrip } from './getATrip';

export = {
  paths: {
    '/trips/:id': {
      ...getATrip,
    },
  },
};

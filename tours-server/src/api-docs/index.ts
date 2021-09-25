import { basicInfo } from './basicInfo';
import { server } from './server';
import { tag } from './tags';
import { component } from './components';
import trips from './trips';

export = {
  ...basicInfo,
  ...server,
  ...tag,
  ...component,
  ...trips,
};

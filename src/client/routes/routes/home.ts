import { ParameterizedRoute } from '../common';
import Home from '../../components/Home/Home';

export const home = ParameterizedRoute({
    path: '/',
    exact: true,
    component: Home,
    caption: 'Home'
});

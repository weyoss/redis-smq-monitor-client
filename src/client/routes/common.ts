import { generatePath, matchPath, RouteProps } from 'react-router';
import * as routes from './routes';

export interface IParameterizedRouteProps<RouteParameters extends Record<string, any>> extends RouteProps {
    path: string;
    getLink: (params: RouteParameters) => string;
    caption: string;
}

export function matchRouteParams<T extends {}>(routeKey: keyof typeof routes, location: string) {
    const routeProps = routes[routeKey];
    const match = matchPath(location, routeProps);
    if (match) return match.params as T;
    return match;
}

export function matchRoute<T extends {}>(path: string) {
    for (const key in routes) {
        const routeProps = routes[key as keyof typeof routes];
        const match = matchPath(path, routeProps);
        if (match) return match;
    }
    return null;
}

export const ParameterizedRoute = <RouteParams extends Record<string, any> = Record<string, never>>(
    def: Omit<IParameterizedRouteProps<RouteParams>, 'getLink'>
): IParameterizedRouteProps<RouteParams> => ({
    ...def,
    getLink(params): string {
        return generatePath(this.path, params);
    }
});

import { matchPath, useLocation } from 'react-router';

export function useParams(path: string) {
    const { pathname } = useLocation()
    const match = matchPath(pathname, { path })
    return match?.params
}

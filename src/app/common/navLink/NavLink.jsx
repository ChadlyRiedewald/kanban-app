import {
    Link,
    matchRoutes,
    useLocation,
    useResolvedPath,
} from 'react-router-dom';

//=====================
// CONSTANTS
const ROUTES = [
    { path: '' },
    { path: '*' },
    { path: 'auth', children: [{ path: 'sign-in' }, { path: 'sign-up' }] },
    {
        path: 'dashboard',
        children: [{ path: '' }, { path: ':boardId' }],
    },
];

//=====================
// COMPONENTS
const NavLink = ({
    to,
    exact,
    className,
    activeClassName,
    inactiveClassName,
    ...rest
}) => {
    useLocation();
    let location = useLocation();
    let resolvedPath = useResolvedPath(to);
    let routeMatches = matchRoutes(ROUTES, location);

    let isActive;
    if (exact) {
        isActive = location.pathname === resolvedPath.pathname;
    } else {
        isActive = routeMatches.some(
            match => match.pathname === resolvedPath.pathname
        );
    }

    let allClassNames =
        className +
        (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);

    return <Link className={allClassNames} to={to} {...rest} />;
};

export default NavLink;

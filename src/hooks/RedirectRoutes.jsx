import { Navigate } from 'react-router-dom';

export const RedirectRoutes = ({ isAuth }) => {
    return isAuth ? (
        <Navigate to='/dashboard' replace />
    ) : (
        <Navigate to='/auth/sign-in' replace />
    );
};

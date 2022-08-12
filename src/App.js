import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyles } from './constants';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Auth from './components/auth/Auth';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

const RedirectRoutes = ({ isAuth }) => {
    return isAuth ? (
        <Navigate to='/dashboard' replace />
    ) : (
        <Navigate to='/auth/sign-in' replace />
    );
};

const TestRoute = () => {
    return (
        <>
            <h2>Sandbox Area</h2>
        </>
    );
};

const App = () => {
    const { colorMode } = useSelector(state => state.theme);

    return (
        <ThemeProvider theme={{ colorMode: colorMode }}>
            <GlobalStyles />
            <Routes>
                {/* Redirecting user to route depending on auth */}
                <Route index element={<RedirectRoutes isAuth={true} />} />
                <Route path='*' element={<RedirectRoutes isAuth={true} />} />
                <Route path='auth' element={<Auth />}>
                    <Route path='sign-in' element={<SignIn />} />
                    <Route path='sign-up' element={<SignUp />} />
                </Route>
                <Route path='dashboard' element={<Dashboard />}>
                    <Route path='platform-launch' element={<TestRoute />} />
                    <Route path='marketing-plan' element={<TestRoute />} />
                    <Route path='roadmap' element={<TestRoute />} />
                    <Route path=':boardId' element={<TestRoute />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
};

export default App;

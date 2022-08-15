import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyles } from './constants';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './features/dashboard';
import Auth from './features/auth/Auth';
import { SignInForm, SignUpForm } from './features/auth';
import { RedirectRoutes } from './hooks';
import Sandbox from './features/sandbox/Sandbox';

const App = () => {
    const { colorMode } = useSelector(state => state.theme);

    return (
        <ThemeProvider theme={{ colorMode: colorMode }}>
            <GlobalStyles />
            <Routes>
                {/* Redirecting user to route depending on auth */}
                <Route index element={<RedirectRoutes isAuth={false} />} />
                <Route path='*' element={<RedirectRoutes isAuth={false} />} />
                <Route path='auth' element={<Auth />}>
                    <Route path='sign-in' element={<SignInForm />} />
                    <Route path='sign-up' element={<SignUpForm />} />
                </Route>
                <Route path='dashboard' element={<Dashboard />}>
                    <Route path='' element={<Navigate to='sandbox' />} />
                    <Route path='sandbox' element={<Sandbox />} />
                    <Route path='platform-launch' element={null} />
                    <Route path='marketing-plan' element={null} />
                    <Route path='roadmap' element={null} />
                    <Route path=':boardId' element={null} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
};

export default App;

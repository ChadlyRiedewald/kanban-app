import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyles } from './constants';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './features/dashboard';
import Auth from './features/auth/Auth';
import { SignInForm, SignUpForm } from './features/auth';
import { RedirectRoutes } from './hooks';
import Sandbox from './features/sandbox/Sandbox';
import { DialogManager } from './app/common/dialog';
import { MenuManager } from './app/common/menu';
import { EmptyBoard } from './features/board/EmptyBoard';

const App = () => {
    const { colorMode } = useSelector(state => state.ui.theme);
    const { authenticated } = useSelector(state => state.auth);

    return (
        <ThemeProvider theme={{ colorMode: colorMode }}>
            <GlobalStyles />
            <DialogManager />
            <MenuManager />
            <Routes>
                {/* Redirecting user to route depending on auth */}
                <Route
                    index
                    element={<RedirectRoutes isAuth={authenticated} />}
                />
                <Route
                    path='*'
                    element={<RedirectRoutes isAuth={authenticated} />}
                />
                <Route path='auth' element={<Auth />}>
                    <Route path='sign-in' element={<SignInForm />} />
                    <Route path='sign-up' element={<SignUpForm />} />
                </Route>
                {authenticated && (
                    <Route path='dashboard' element={<Dashboard />}>
                        <Route path='' element={<Navigate to='sandbox' />} />
                        <Route path='sandbox' element={<Sandbox />} />
                        <Route
                            path='platform-launch'
                            element={<EmptyBoard />}
                        />
                        <Route path='marketing-plan' element={<EmptyBoard />} />
                        <Route path='roadmap' element={<EmptyBoard />} />
                        <Route path=':boardId' element={null} />
                    </Route>
                )}
            </Routes>
        </ThemeProvider>
    );
};

export default App;

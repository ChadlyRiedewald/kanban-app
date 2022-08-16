import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyles } from './constants';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './features/dashboard';
import Auth from './features/auth/Auth';
import { SignInForm, SignUpForm } from './features/auth';
import { RedirectRoutes } from './hooks';
import { DialogManager } from './app/common/dialog';
import { MenuManager } from './app/common/menu';
import { getBoardsFromFirestore } from './app/firebase';
import { Board } from './features/boards';

const App = () => {
    const { colorMode } = useSelector(state => state.ui.theme);
    const { authenticated } = useSelector(state => state.auth);

    const data = getBoardsFromFirestore();

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
                        <Route path=':boardId' element={<Board />} />
                    </Route>
                )}
            </Routes>
        </ThemeProvider>
    );
};

export default App;

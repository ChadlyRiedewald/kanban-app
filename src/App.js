import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyles } from './constants';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './features/dashboard';
import Auth from './features/auth/Auth';
import { SignInForm, SignUpForm } from './features/auth';
import { DialogManager } from './app/common/dialog';
import { MenuManager } from './app/common/menu';
import { Board } from './features/boards';
import { useEffect } from 'react';
import Loading from './app/common/loading';
import { setListener } from './app/firebase';

const App = () => {
    const { colorMode } = useSelector(state => state.ui.theme);
    const { authenticated, initialized } = useSelector(state => state.auth);
    const allBoards = useSelector(state => state.data.boards);
    const dispatch = useDispatch();

    useEffect(() => {
        /* Dispatching Firebase Auth Listener */
        dispatch(setListener());
    }, []);

    return (
        <ThemeProvider theme={{ colorMode: colorMode }}>
            <GlobalStyles />
            <DialogManager />
            <MenuManager />
            {!initialized ? (
                <Loading />
            ) : (
                <Routes>
                    <Route
                        path='*'
                        element={
                            <Navigate
                                to={
                                    authenticated
                                        ? '/dashboard'
                                        : '/auth/sign-in'
                                }
                            />
                        }
                    />
                    {!authenticated ? (
                        <Route path='auth' element={<Auth />}>
                            <Route path='sign-in' element={<SignInForm />} />
                            <Route path='sign-up' element={<SignUpForm />} />
                        </Route>
                    ) : (
                        <Route path='dashboard' element={<Dashboard />}>
                            <Route
                                path=''
                                element={
                                    <Navigate
                                        to={
                                            allBoards
                                                ? `/dashboard/${allBoards[0]?.id}`
                                                : '/dashboard'
                                        }
                                    />
                                }
                            />
                            <Route path=':boardId' element={<Board />} />
                        </Route>
                    )}
                </Routes>
            )}
        </ThemeProvider>
    );
};

export default App;

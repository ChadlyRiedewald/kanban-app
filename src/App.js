import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyles } from './constants';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './features/dashboard';
import Auth from './features/auth/Auth';
import { SignInForm, SignUpForm } from './features/auth';
import { DialogManager } from './app/common/dialog';
import { MenuManager } from './app/common/menu';
import { Board } from './features/boards';
import { useEffect } from 'react';
import Loading from './app/common/loading';
import { setListener } from './app/firebase';
import { AnimatePresence } from 'framer-motion';

const App = () => {
    const { colorMode } = useSelector(state => state.ui.theme);
    const isAuthenticated = useSelector(state => state.auth.authenticated);
    const isInitialized = useSelector(state => state.auth.initialized);
    const allBoards = useSelector(state => state.data.boards);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        /* Dispatching Firebase Auth Listener */
        dispatch(setListener());
    }, []);

    return (
        <ThemeProvider theme={{ colorMode: colorMode }}>
            <GlobalStyles />
            <DialogManager />
            <MenuManager />
            <AnimatePresence>{!isInitialized && <Loading />}</AnimatePresence>
            <AnimatePresence mode='wait'>
                {isInitialized && (
                    <Routes
                        location={location}
                        key={location.pathname.split('/')[1]}
                    >
                        <Route
                            path='*'
                            element={
                                <Navigate
                                    to={
                                        isAuthenticated
                                            ? '/dashboard'
                                            : '/auth/sign-in'
                                    }
                                />
                            }
                        />
                        {!isAuthenticated ? (
                            <Route path='auth' element={<Auth />}>
                                <Route
                                    path='sign-in'
                                    element={<SignInForm />}
                                />
                                <Route
                                    path='sign-up'
                                    element={<SignUpForm />}
                                />
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
            </AnimatePresence>
        </ThemeProvider>
    );
};

export default App;

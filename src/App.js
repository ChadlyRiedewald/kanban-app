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
import { boardsSelectors, fetchData } from './features/boards/boardsSlice';
import { useEffect } from 'react';

const App = () => {
    const { colorMode } = useSelector(state => state.ui.theme);
    const allBoards = useSelector(boardsSelectors.selectAll);
    const dispatch = useDispatch();
    const authenticated = true;

    // useEffect(() => {
    //     dispatch(fetchData());
    // }, [dispatch]);

    return (
        <ThemeProvider theme={{ colorMode: colorMode }}>
            <GlobalStyles />
            <DialogManager />
            <MenuManager />
            <Routes>
                {/* Redirecting user to route depending on auth */}
                <Route
                    index
                    element={
                        <Navigate
                            to={authenticated ? '/dashboard' : '/auth/sign-in'}
                        />
                    }
                />
                <Route
                    path='*'
                    element={
                        <Navigate
                            to={authenticated ? '/dashboard' : '/auth/sign-in'}
                        />
                    }
                />
                <Route path='auth' element={<Auth />}>
                    <Route path='sign-in' element={<SignInForm />} />
                    <Route path='sign-up' element={<SignUpForm />} />
                </Route>
                {authenticated && (
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
        </ThemeProvider>
    );
};

export default App;

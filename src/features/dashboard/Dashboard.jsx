import { MobileNav } from '../nav/mobile';
import styled from 'styled-components/macro';
import { BREAKPOINTS } from '../../constants';
import { DesktopNav } from '../nav/desktop';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchBoards,
    fetchColumns,
    fetchSubtasks,
    fetchTasks,
    resetSelectedBoard,
    setSelectedBoard,
} from '../../app/data';
import { NoBoards } from './NoBoards';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../app/firebase';

//=====================
// STYLED COMPONENTS
const MainWrapper = styled.main`
    padding-block-start: calc(var(--height-topbar-mobile) + var(--space-md));
    padding-block-end: var(--space-md);
    padding-inline: var(--space-md);
    height: 100%;
    overflow: auto;

    @media screen and ${BREAKPOINTS.tablet} {
        margin: 0;
        margin-inline-start: var(--width-sidebar);
        padding-inline-end: var(--space-md);
        padding-block-start: 116px;
    }
`;

//=====================
// COMPONENTS
const Dashboard = () => {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const allBoards = useSelector(state => state.data.boards);
    const currentBoard = allBoards.find(board => board.id === boardId);
    const { selectedBoard } = useSelector(state => state.data);
    const { uid } = useSelector(state => state.auth.user);

    // selectedBoard or resetSelectedBoard depending on current path
    useEffect(() => {
        currentBoard && dispatch(setSelectedBoard(currentBoard));
        if (selectedBoard && location.pathname === '/dashboard') {
            dispatch(resetSelectedBoard());
        }
    }, [location, currentBoard?.id]);

    // navigate to dashboard if boardId does not exists
    useEffect(() => {
        if (boardId) {
            const boardExists = allBoards.find(board => board.id === boardId);
            !boardExists && navigate('/dashboard');
        }
    }, [location, allBoards]);

    // Real time updates with Listener
    useEffect(() => {
        // Boards
        const boardsRef = collection(db, 'users', uid, 'boards');
        const boardsQuery = query(boardsRef, orderBy('createdAt', 'asc'));
        const boardsUnsubscribe = onSnapshot(boardsQuery, querySnapshot => {
            let boards = [];
            querySnapshot.forEach(doc => {
                boards.push(doc.data());
            });
            dispatch(fetchBoards(boards));
        });

        // Columns
        const columnsRef = collection(db, 'users', uid, 'columns');
        const columnsQuery = query(columnsRef, orderBy('createdAt', 'asc'));
        const columnsUnsubscribe = onSnapshot(columnsQuery, querySnapshot => {
            let columns = [];
            querySnapshot.forEach(doc => {
                columns.push(doc.data());
            });
            dispatch(fetchColumns(columns));
        });

        // Tasks
        const tasksRef = collection(db, 'users', uid, 'tasks');
        const tasksQuery = query(tasksRef, orderBy('createdAt', 'asc'));
        const tasksUnsubscribe = onSnapshot(tasksQuery, querySnapshot => {
            let tasks = [];
            querySnapshot.forEach(doc => {
                tasks.push(doc.data());
            });
            dispatch(fetchTasks(tasks));
        });

        // Subtasks
        const subtasksRef = collection(db, 'users', uid, 'subtasks');
        const subtasksQuery = query(subtasksRef, orderBy('createdAt', 'asc'));
        const subtasksUnsubscribe = onSnapshot(subtasksQuery, querySnapshot => {
            let subtasks = [];
            querySnapshot.forEach(doc => {
                subtasks.push(doc.data());
            });
            dispatch(fetchSubtasks(subtasks));
        });

        return () => {
            boardsUnsubscribe();
            columnsUnsubscribe();
            tasksUnsubscribe();
            subtasksUnsubscribe();
        };
    }, []);

    return (
        <>
            <MobileNav />
            <DesktopNav />
            <MainWrapper>
                {allBoards.length ? <Outlet /> : <NoBoards />}
            </MainWrapper>
        </>
    );
};

export default Dashboard;

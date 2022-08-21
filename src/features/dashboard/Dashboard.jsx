import { MobileNav } from '../nav/mobile';
import styled from 'styled-components/macro';
import { BREAKPOINTS } from '../../constants';
import { DesktopNav } from '../nav/desktop';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    boardsSelectors,
    resetSelectedBoard,
    setSelectedBoard,
} from '../boards';
import { NoBoards } from './NoBoards';

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

const Dashboard = () => {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const currentBoard = useSelector(state =>
        boardsSelectors.selectById(state, boardId)
    );
    const allBoards = useSelector(boardsSelectors.selectAll);
    const allBoardIds = useSelector(boardsSelectors.selectIds);

    // selectedBoard or resetSelectedBoard depending on current path
    useEffect(() => {
        currentBoard && dispatch(setSelectedBoard(currentBoard));
        location.pathname === '/dashboard' && dispatch(resetSelectedBoard());
    }, [location, currentBoard?.id]);

    // navigate to dashboard if boardId does not exists
    useEffect(() => {
        if (boardId) {
            const boardExists = allBoardIds.find(id => id === boardId);
            !boardExists && navigate('/dashboard');
        }
    }, [location]);

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

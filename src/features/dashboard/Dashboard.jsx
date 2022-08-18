import { MobileNav } from '../nav/mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import { BREAKPOINTS } from '../../constants';
import { DesktopNav } from '../nav/desktop';
import { useSelector } from 'react-redux';
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
    const { boards } = useSelector(state => state.board);

    return (
        <>
            <MobileNav />
            <DesktopNav />
            <MainWrapper>
                {boards.length ? <Outlet /> : <NoBoards />}
            </MainWrapper>
        </>
    );
};

export default Dashboard;

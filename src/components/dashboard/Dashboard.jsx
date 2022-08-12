import MobileNav from '../nav/mobile';
import DesktopNav from '../nav/desktop';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import { BREAKPOINTS } from '../../constants';

const MainWrapper = styled.main`
    padding-block-start: 80px;
    padding-block-end: var(--space-sm);
    padding-inline: var(--space-md);

    @media screen and ${BREAKPOINTS.tablet} {
        padding-inline-start: calc(var(--width-sidebar) + var(--space-md));
        padding-inline-end: var(--space-md);
        padding-block-start: 116px;
    }
`;

const Dashboard = () => {
    return (
        <>
            <MobileNav />
            <DesktopNav />
            <MainWrapper>
                <Outlet />
            </MainWrapper>
        </>
    );
};

export default Dashboard;

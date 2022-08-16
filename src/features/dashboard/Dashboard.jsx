import { MobileNav } from '../nav/mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import { BREAKPOINTS } from '../../constants';
import { DesktopNav } from '../nav/desktop';

const MainWrapper = styled.main`
    margin-block-start: var(--height-topbar-mobile);
    padding: var(--space-md);
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

import { ThemeSwitch } from './ThemeSwitch';
import NavLink from '../navLink';
import { ReactComponent as Board } from '../../assets/icon-board.svg';
import { ReactComponent as Add } from '../../assets/icon-add.svg';
import { ReactComponent as SignOut } from '../../assets/icon-sign-out.svg';
import { ReactComponent as User } from '../../assets/icon-user.svg';
import { ReactComponent as Hide } from '../../assets/icon-hide-sidebar.svg';
import Separator from '../separator';
import MobileOnly from '../mobileOnly';

import styled from 'styled-components/macro';
import DesktopOnly from '../desktopOnly';
import { BREAKPOINTS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOpen } from './sidebarSlice';
import NavButton from '../navButton';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    height: 100%;

    @media screen and ${BREAKPOINTS.tablet} {
        justify-content: space-between;
        padding-block-start: 53px;
    }
`;

const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
`;

export const Boards = () => {
    return (
        <>
            <h4>All boards (3)</h4>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to='/dashboard/platform-launch'
                            className='nav-link'
                            activeClassName='nav-link--active'
                            inactiveClassName='nav-link--inactive'
                        >
                            <Board />
                            Platform Launch
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/dashboard/marketing-plan'
                            className='nav-link'
                            activeClassName='nav-link--active'
                            inactiveClassName='nav-link--inactive'
                        >
                            <Board />
                            Marketing Plan
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/dashboard/roadmap'
                            className='nav-link'
                            activeClassName='nav-link--active'
                            inactiveClassName='nav-link--inactive'
                        >
                            <Board />
                            Roadmap
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/'
                            className='nav-link'
                            activeClassName='nav-link--active'
                            inactiveClassName='nav-link--inactive'
                            style={{ color: 'var(--color-purple-100)' }}
                        >
                            <Add style={{ fill: 'var(--color-purple-100)' }} />
                            Create New Board
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};

const Settings = () => {
    return (
        <>
            <h4>Settings</h4>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to='/'
                            className='nav-link'
                            activeClassName='nav-link--active'
                            inactiveClassName='nav-link--inactive'
                        >
                            <User />
                            My Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/'
                            className='nav-link'
                            activeClassName='nav-link--active'
                            inactiveClassName='nav-link--inactive'
                        >
                            <SignOut />
                            Sign Out
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};

const NavMenu = () => {
    const { open } = useSelector(state => state.sidebar);
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <SectionWrapper>
                <Boards />
            </SectionWrapper>
            <MobileOnly>
                <Separator />
            </MobileOnly>
            <SectionWrapper>
                <Settings />
                <ThemeSwitch />
                <DesktopOnly>
                    <NavButton onClick={() => dispatch(toggleOpen(!open))}>
                        <Hide />
                        Hide Sidebar
                    </NavButton>
                </DesktopOnly>
            </SectionWrapper>
        </Wrapper>
    );
};

export default NavMenu;

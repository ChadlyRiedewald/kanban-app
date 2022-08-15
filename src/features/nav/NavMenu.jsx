import { ThemeSwitch } from './ThemeSwitch';
import { ReactComponent as Board } from '../../assets/icon-board.svg';
import { ReactComponent as Hide } from '../../assets/icon-hide-sidebar.svg';
import Separator from '../../app/common/separator';
import MobileOnly from '../../app/common/mobileOnly';
import styled from 'styled-components/macro';
import DesktopOnly from '../../app/common/desktopOnly';
import { BREAKPOINTS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOpen } from './sidebarSlice';
import { CreateNewBoard } from '../board';
import { ReactComponent as Add } from '../../assets/icon-add.svg';
import { ChangePassword, SignOut } from '../account';
import { ReactComponent as User } from '../../assets/icon-user.svg';
import { ReactComponent as SignOutIcon } from '../../assets/icon-sign-out.svg';
import { NavLink } from './NavLink';
import { NavButton } from './NavButton';

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

const NavMenu = () => {
    const { open } = useSelector(state => state.sidebar);
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <SectionWrapper>
                <h4>All boards (3)</h4>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to='/dashboard/sandbox'
                                className='nav-link'
                                activeClassName='nav-link--active'
                                inactiveClassName='nav-link--inactive'
                            >
                                <Board />
                                Sandbox
                            </NavLink>
                        </li>
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
                            <CreateNewBoard
                                trigger={
                                    <NavButton
                                        style={{
                                            color: 'var(--color-purple-100)',
                                        }}
                                    >
                                        <Add
                                            style={{
                                                fill: 'var(--color-purple-100)',
                                            }}
                                        />
                                        Create New Board
                                    </NavButton>
                                }
                            />
                        </li>
                    </ul>
                </nav>
            </SectionWrapper>
            <MobileOnly>
                <Separator />
            </MobileOnly>
            <SectionWrapper>
                <h4>Settings</h4>
                <nav>
                    <ul>
                        <li>
                            <ChangePassword
                                trigger={
                                    <NavButton>
                                        <User />
                                        Account
                                    </NavButton>
                                }
                            />
                        </li>
                        <li>
                            <SignOut
                                trigger={
                                    <NavButton>
                                        <SignOutIcon />
                                        Sign Out
                                    </NavButton>
                                }
                            />
                        </li>
                    </ul>
                </nav>
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

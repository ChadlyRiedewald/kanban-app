import { ThemeSwitch } from './ThemeSwitch';
import { ReactComponent as Board } from '../../assets/icon-board.svg';
import { ReactComponent as Hide } from '../../assets/icon-hide-sidebar.svg';
import Separator from '../../app/common/separator';
import MobileOnly from '../../app/common/mobileOnly';
import styled from 'styled-components/macro';
import DesktopOnly from '../../app/common/desktopOnly';
import { BREAKPOINTS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Add } from '../../assets/icon-add.svg';
import { ReactComponent as User } from '../../assets/icon-user.svg';
import { ReactComponent as SignOutIcon } from '../../assets/icon-sign-out.svg';
import { NavLink } from './NavLink';
import { NavButton } from './NavButton';
import { openDialog, toggleSidebarOpen } from '../../app/ui';

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
    const { open } = useSelector(state => state.ui.sidebar);
    const { boards } = useSelector(state => state.data);
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <SectionWrapper>
                <h4>All boards ({boards.length})</h4>
                <nav>
                    <ul>
                        {boards.map(board => (
                            <li key={board.id}>
                                <NavLink
                                    to={`/dashboard/${board.id}`}
                                    className='nav-link'
                                    activeClassName='nav-link--active'
                                    inactiveClassName='nav-link--inactive'
                                >
                                    <Board />
                                    {board.title}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            <NavButton
                                onClick={() =>
                                    dispatch(
                                        openDialog({
                                            dialogType: 'createNewBoard',
                                        })
                                    )
                                }
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
                            <NavButton
                                onClick={() =>
                                    dispatch(
                                        openDialog({
                                            dialogType: 'changePassword',
                                        })
                                    )
                                }
                            >
                                <User />
                                Account
                            </NavButton>
                        </li>
                        <li>
                            <NavButton
                                onClick={() =>
                                    dispatch(
                                        openDialog({ dialogType: 'signOut' })
                                    )
                                }
                            >
                                <SignOutIcon />
                                Sign Out
                            </NavButton>
                        </li>
                    </ul>
                </nav>
                <ThemeSwitch />
                <DesktopOnly>
                    <NavButton
                        onClick={() => dispatch(toggleSidebarOpen(!open))}
                    >
                        <Hide />
                        Hide Sidebar
                    </NavButton>
                </DesktopOnly>
            </SectionWrapper>
        </Wrapper>
    );
};

export default NavMenu;
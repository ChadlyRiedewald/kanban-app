import { ThemeSwitch } from './ThemeSwitch';
import { ReactComponent as Board } from '../../assets/icon-board.svg';
import { ReactComponent as Hide } from '../../assets/icon-hide-sidebar.svg';
import Separator from '../../app/common/separator';
import MobileOnly from '../../app/common/mobileOnly';
import styled from 'styled-components/macro';
import DesktopOnly from '../../app/common/desktopOnly';
import { BREAKPOINTS, secondaryBg } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Add } from '../../assets/icon-add.svg';
import { ReactComponent as User } from '../../assets/icon-user.svg';
import { ReactComponent as SignOutIcon } from '../../assets/icon-sign-out.svg';
import { NavLink } from './NavLink';
import { NavButton } from './NavButton';
import { closeDialog, closeSidebar, openDialog } from '../../app/ui';

/* This component is the Nav Menu (content)... used both in desktop as in mobile */

//=====================
// STYLED COMPONENTS
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    height: 100%;

    nav {
        max-height: 192px;
        overflow: auto;
        margin-inline: -24px;
        padding-inline: var(--space-md) var(--space-sm);
        ::-webkit-scrollbar {
            width: 20px;
        }
        ::-webkit-scrollbar-thumb {
            border: 6px solid ${secondaryBg};
        }
    }

    @media screen and ${BREAKPOINTS.tablet} {
        justify-content: space-between;
        padding-block-start: 53px;

        nav {
            max-height: 480px;
            margin-left: -32px;
            padding-inline: 32px 24px;
        }
    }
`;

const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
`;

//=====================
// COMPONENTS
const NavMenu = () => {
    const dispatch = useDispatch();
    const allBoards = useSelector(state => state.data.boards);
    function toggleSidebar() {
        dispatch(closeSidebar());
        document.documentElement.style.setProperty('--width-sidebar', '0px');
        window.localStorage.setItem('sidebar', 'hidden');
    }

    return (
        <Wrapper>
            <SectionWrapper>
                <h4>All boards ({allBoards.length})</h4>
                <nav>
                    <ul>
                        {allBoards.map((board, index) => (
                            <li
                                key={index}
                                onClick={() => dispatch(closeDialog())}
                            >
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
                    </ul>
                </nav>
                <NavButton
                    onClick={() =>
                        dispatch(
                            openDialog({
                                dialogType: 'addBoard',
                            })
                        )
                    }
                    style={{
                        color: 'var(--color-purple-100)',
                        marginTop: '-16px',
                    }}
                >
                    <Add
                        style={{
                            fill: 'var(--color-purple-100)',
                        }}
                    />
                    Create New Board
                </NavButton>
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
                                            dialogType: 'updatePassword',
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
                    <NavButton onClick={toggleSidebar}>
                        <Hide />
                        Hide Sidebar
                    </NavButton>
                </DesktopOnly>
            </SectionWrapper>
        </Wrapper>
    );
};

export default NavMenu;

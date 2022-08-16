import styled from 'styled-components/macro';
import { borderColor, secondaryBg, textColor } from '../../../constants';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { ReactComponent as ShowSidebarIcon } from '../../../assets/icon-show-sidebar.svg';
import VisuallyHidden from '../../../app/common/visuallyHidden';
import NavMenu from '../NavMenu';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebarOpen } from '../../../app/ui';

const Wrapper = styled.aside`
    width: var(--width-sidebar);
    height: 100%;
    background-color: ${secondaryBg};
    position: fixed;
    border-right: 1px solid ${borderColor};
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    z-index: 1;
`;

const LogoLink = styled(Link)`
    width: fit-content;
    padding: var(--space-xxs) var(--space-xs);
    margin: -4px -8px;
    border-radius: var(--radii-sm);
    svg path {
        fill: ${textColor};
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 5px var(--color-purple-shadow);
    }

    &:focus:not(:focus-visible) {
        box-shadow: none;
    }
`;

const ShowSidebarButton = styled.button`
    position: fixed;
    bottom: 32px;
    left: -4px;
    height: 48px;
    width: 60px;
    border: none;
    background-color: var(--color-purple-100);
    border-radius: 0 var(--radii-round) var(--radii-round) 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline-end: 8px;
    transition: all 0.3s ease-in-out;
    z-index: 1;

    &:hover {
        background-color: var(--color-purple-200);
        transform: translateX(4px);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 5px var(--color-purple-shadow);
    }

    &:focus:not(:focus-visible) {
        outline: 0;
        box-shadow: none;
    }

    svg {
        fill: white;
    }
`;

export const DesktopSidebar = () => {
    const dispatch = useDispatch();
    const { open } = useSelector(state => state.ui.sidebar);

    return (
        <>
            {open && (
                <Wrapper>
                    <LogoLink to='/'>
                        <VisuallyHidden>Home</VisuallyHidden>
                        <Logo />
                    </LogoLink>
                    <NavMenu />
                </Wrapper>
            )}
            {!open && (
                <ShowSidebarButton
                    type='button'
                    onClick={() => dispatch(toggleSidebarOpen(!open))}
                >
                    <VisuallyHidden>Show sidebar</VisuallyHidden>
                    <ShowSidebarIcon />
                </ShowSidebarButton>
            )}
        </>
    );
};

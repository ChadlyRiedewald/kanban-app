import { ReactComponent as Logo } from '../../../assets/logo-mobile.svg';
import { ReactComponent as Up } from '../../../assets/icon-arrow-up.svg';
import { ReactComponent as Down } from '../../../assets/icon-arrow-down.svg';
import styled from 'styled-components/macro';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { secondaryBg } from '../../../constants';
import Portal from '../../../app/common/portal';
import { useState } from 'react';
import NavMenu from '../NavMenu';
import { useSelector } from 'react-redux';

/* This component renders only the mobile navigation dropdown MENU */

//=====================
// STYLED COMPONENTS
const Overlay = styled(DialogPrimitive.Overlay)`
    position: fixed;
    left: 0;
    top: var(--height-topbar-mobile);
    right: 0;
    bottom: 0;
    background-color: var(--color-overlay);
`;

const Content = styled(DialogPrimitive.Content)`
    margin: auto;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: ${secondaryBg};
    width: 264px;
    padding-block: var(--space-sm);
    padding-inline: var(--space-md);
    border-radius: var(--radii-lg);
    display: flex;
    flex-direction: column;

    p {
        color: var(--color-gray-600);
    }
`;

const Trigger = styled(DialogPrimitive.Trigger)`
    all: unset;
    display: flex;
    align-items: center;
    gap: var(--space-sm);

    h2 {
        margin-right: -8px;
    }
`;

//=====================
// EXPORTS
const Root = DialogPrimitive.Root;

//=====================
// COMPONENTS
export const MobileNavDropdown = ({ ...props }) => {
    const [isOpen, toggleIsOpen] = useState(false);
    const currentBoard = useSelector(state => state.boards.selectedBoard);
    const toggle = () => toggleIsOpen(!isOpen);

    return (
        <Root open={isOpen} onOpenChange={toggle}>
            <Trigger>
                <Logo />
                <h1>{currentBoard?.title}</h1>
                {isOpen ? <Up /> : <Down />}
            </Trigger>
            <Portal>
                <Overlay />
                <Content {...props}>
                    <NavMenu />
                </Content>
            </Portal>
        </Root>
    );
};

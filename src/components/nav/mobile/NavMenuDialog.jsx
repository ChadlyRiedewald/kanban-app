import { ReactComponent as Logo } from '../../../assets/logo-mobile.svg';
import { ReactComponent as Up } from '../../../assets/icon-arrow-up.svg';
import { ReactComponent as Down } from '../../../assets/icon-arrow-down.svg';
import styled from 'styled-components/macro';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { secondaryBg } from '../../../constants';
import Portal from '../../portal';
import { useState } from 'react';
import NavMenu from '../NavMenu';

const StyledOverlay = styled(DialogPrimitive.Overlay)`
    position: fixed;
    left: 0;
    top: var(--height-topbar-mobile);
    right: 0;
    bottom: 0;
    background-color: var(--color-overlay);
`;

const StyledContent = styled(DialogPrimitive.Content)`
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

const StyledTrigger = styled(DialogPrimitive.Trigger)`
    all: unset;
    display: flex;
    align-items: center;
    gap: var(--space-sm);

    h2 {
        margin-right: -8px;
    }
`;

//////////////////// EXPORTS  ////////////////////
const DialogRoot = DialogPrimitive.Root;
export const DialogTrigger = StyledTrigger;
export const DialogClose = DialogPrimitive.Close;

//////////////////// COMPONENTS  ////////////////////
const DialogContent = ({ children, ...otherProps }) => {
    return (
        <Portal>
            <StyledOverlay />
            <StyledContent {...otherProps}>{children}</StyledContent>
        </Portal>
    );
};

export const NavMenuDialog = () => {
    const [isOpen, toggleIsOpen] = useState(false);
    const toggle = () => toggleIsOpen(!isOpen);

    return (
        <DialogRoot open={isOpen} onOpenChange={toggle}>
            <DialogTrigger>
                <Logo />
                <h2>Platform Launch</h2>
                {isOpen ? <Up /> : <Down />}
            </DialogTrigger>
            <DialogContent>
                <NavMenu />
            </DialogContent>
        </DialogRoot>
    );
};

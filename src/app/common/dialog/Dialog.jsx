import styled from 'styled-components/macro';
import Portal from '../portal/Portal';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { BREAKPOINTS, secondaryBg } from '../../../constants';

//////////////////// STYLED COMPONENTS  ////////////////////
const StyledOverlay = styled(DialogPrimitive.Overlay)`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-overlay);
`;

const StyledContent = styled(DialogPrimitive.Content)`
    margin: auto;
    position: fixed;
    left: var(--space-sm);
    top: 0;
    right: var(--space-sm);
    bottom: 0;
    background: ${secondaryBg};
    max-width: var(--width-dialog);
    height: fit-content;
    padding: var(--space-md);
    border-radius: var(--radii-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    @media screen and ${BREAKPOINTS.tablet} {
        padding: var(--space-lg);
    }

    p {
        color: var(--color-gray-600);
    }
`;

//////////////////// EXPORTS  ////////////////////
const DialogRoot = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

//////////////////// COMPONENTS  ////////////////////
export const DialogContent = ({ children, ...props }) => {
    return (
        <Portal>
            <StyledOverlay />
            <StyledContent {...props}>{children}</StyledContent>
        </Portal>
    );
};

export const Dialog = ({ children }) => {
    return <DialogRoot>{children}</DialogRoot>;
};

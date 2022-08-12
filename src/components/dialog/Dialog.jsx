import styled from 'styled-components/macro';
import Portal from '../portal/Portal';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { secondaryBg } from '../../constants';

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
    left: 16px;
    top: 0;
    right: 16px;
    bottom: 0;
    background: ${secondaryBg};
    max-width: var(--width-dialog);
    height: fit-content;
    padding: var(--space-lg);
    border-radius: var(--radii-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    p {
        color: var(--color-gray-600);
    }
`;

//////////////////// EXPORTS  ////////////////////
const DialogRoot = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

//////////////////// COMPONENTS  ////////////////////
export const DialogContent = ({ children, ...otherProps }) => {
    return (
        <Portal>
            <StyledOverlay />
            <StyledContent {...otherProps}>{children}</StyledContent>
        </Portal>
    );
};

export const Dialog = ({ children }) => {
    return <DialogRoot>{children}</DialogRoot>;
};

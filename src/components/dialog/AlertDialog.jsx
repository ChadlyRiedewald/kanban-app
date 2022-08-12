import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import styled from 'styled-components/macro';
import Portal from '../portal/Portal';
import { secondaryBg } from '../../constants';

//////////////////// STYLED COMPONENTS  ////////////////////
const StyledOverlay = styled(AlertDialogPrimitive.Overlay)`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-overlay);
`;

const StyledContent = styled(AlertDialogPrimitive.Content)`
    margin: auto;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: ${secondaryBg};
    width: var(--width-dialog);
    height: fit-content;
    padding: var(--space-lg);
    border-radius: var(--radii-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    h2 {
        color: var(--color-destructive-100);
    }

    p {
        color: var(--color-gray-600);
    }
`;

export const AlertDialogButtonWrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

//////////////////// EXPORTS  ////////////////////
export const AlertDialogRoot = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;

//////////////////// COMPONENTS  ////////////////////
export const AlertDialogContent = ({ children, ...props }) => {
    return (
        <Portal>
            <StyledOverlay />
            <StyledContent {...props}>{children}</StyledContent>
        </Portal>
    );
};

export const AlertDialog = ({ children }) => {
    return <AlertDialogRoot>{children}</AlertDialogRoot>;
};

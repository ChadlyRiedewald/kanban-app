import styled from 'styled-components/macro';
import { Root, Overlay, Content } from '@radix-ui/react-dialog';
import { BREAKPOINTS, secondaryBg } from '../../../constants';
import { useDispatch } from 'react-redux';
import Portal from '../portal';
import { closeDialog } from '../../ui';

//=====================
// STYLED COMPONENTS
const StyledOverlay = styled(Overlay)`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-overlay);
`;

const StyledContent = styled(Content)`
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

//=====================
// COMPONENTS
/* The default Dialog where if you click outside the dialog it will close */
export const DialogWrapper = ({ children }) => {
    const dispatch = useDispatch();

    return (
        <Root defaultOpen={true}>
            <Portal>
                <StyledOverlay />
                <StyledContent
                    onInteractOutside={() => dispatch(closeDialog())}
                    onEscapeKeyDown={() => dispatch(closeDialog())}
                >
                    {children}
                </StyledContent>
            </Portal>
        </Root>
    );
};

/* With this dialog you have to make a choice to close the dialog, used with SignOut Dialog */
export const AlertDialogWrapper = ({ children }) => {
    return (
        <Root defaultOpen={true}>
            <Portal>
                <StyledOverlay />
                <StyledContent
                    onInteractOutside={e => e.preventDefault()}
                    onEscapeKeyDown={e => e.preventDefault()}
                >
                    {children}
                </StyledContent>
            </Portal>
        </Root>
    );
};

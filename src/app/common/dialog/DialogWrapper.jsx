import styled from 'styled-components/macro';
import { Root, Overlay, Content } from '@radix-ui/react-dialog';
import { BREAKPOINTS, secondaryBg } from '../../../constants';
import { useDispatch } from 'react-redux';
import Portal from '../portal';
import { closeDialog } from '../../ui';
import { motion } from 'framer-motion';

//=====================
// ANIMATION VARIANTS
const variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
};

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
    max-height: calc(100% - 32px);
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
                <motion.div
                    variants={variants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                >
                    <StyledOverlay />

                    <StyledContent
                        onInteractOutside={e => {
                            e.preventDefault();
                            dispatch(closeDialog());
                        }}
                        onEscapeKeyDown={e => {
                            e.preventDefault();
                            dispatch(closeDialog());
                        }}
                    >
                        {children}
                    </StyledContent>
                </motion.div>
            </Portal>
        </Root>
    );
};

/* With this dialog you have to make a choice to close the dialog, used with SignOut Dialog */
export const AlertDialogWrapper = ({ children }) => {
    return (
        <Root defaultOpen={true}>
            <Portal>
                <motion.div
                    variants={variants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                >
                    <StyledOverlay />
                    <StyledContent
                        onInteractOutside={e => e.preventDefault()}
                        onEscapeKeyDown={e => e.preventDefault()}
                    >
                        {children}
                    </StyledContent>
                </motion.div>
            </Portal>
        </Root>
    );
};

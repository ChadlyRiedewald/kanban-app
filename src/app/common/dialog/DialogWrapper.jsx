import styled from 'styled-components/macro';
import { Root, Overlay, Content } from '@radix-ui/react-dialog';
import { BREAKPOINTS, secondaryBg, textColor } from '../../../constants';
import { useDispatch } from 'react-redux';
import Portal from '../portal';
import { closeDialog } from '../../ui';
import { motion } from 'framer-motion';
import { ReactComponent as Close } from '../../../assets/icon-cross.svg';

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
    top: ${p => (p.nav ? '64px' : '0')};
    right: 0;
    bottom: 0;
    background-color: var(--color-overlay);
`;

const StyledContent = styled(Content)`
    margin: auto;
    position: fixed;
    left: var(--space-sm);
    top: ${p => (p.nav ? '80px' : '0')};
    right: var(--space-sm);
    bottom: ${p => !p.nav && '0'};
    background: ${secondaryBg};
    max-width: ${p => (p.nav ? '264px' : ' var(--width-dialog)')};
    max-height: fit-content;
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

const CloseWrapper = styled.div`
    position: absolute;
    right: 24px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
        fill: ${textColor};
        transform: scale(0.75);
    }
`;

//=====================
// COMPONENTS
/* The default Dialog where if you click outside the dialog it will close */
export const DialogWrapper = ({ children, ...props }) => {
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
                    <StyledOverlay {...props} />

                    <StyledContent
                        {...props}
                        onInteractOutside={e => {
                            e.preventDefault();
                            dispatch(closeDialog());
                        }}
                        onEscapeKeyDown={e => {
                            e.preventDefault();
                            dispatch(closeDialog());
                        }}
                    >
                        <CloseWrapper onClick={() => dispatch(closeDialog())}>
                            <Close />
                        </CloseWrapper>
                        {children}
                    </StyledContent>
                </motion.div>
            </Portal>
        </Root>
    );
};

/* The Dialog for Tasks */
export const TaskDialogWrapper = ({ children, ...props }) => {
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
                    <StyledOverlay {...props} />

                    <StyledContent
                        {...props}
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

/* The Dialog for mobile Nav */
export const NavDialogWrapper = ({ children, ...props }) => {
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
                    <StyledOverlay {...props} />

                    <StyledContent
                        {...props}
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

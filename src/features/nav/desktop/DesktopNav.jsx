import DesktopOnly from '../../../app/common/desktopOnly';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopTopbar } from './DesktopTopbar';
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
            duration: 0.8,
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
/* This component renders the complete Desktop Navigation */
export const DesktopNav = () => {
    return (
        <DesktopOnly
            as={motion.div}
            variants={variants}
            initial='initial'
            animate='animate'
            exit='exit'
        >
            <DesktopSidebar />
            <DesktopTopbar />
        </DesktopOnly>
    );
};

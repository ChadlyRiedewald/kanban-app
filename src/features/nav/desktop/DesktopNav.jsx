import DesktopOnly from '../../../app/common/desktopOnly';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopTopbar } from './DesktopTopbar';

//=====================
/* This component renders the complete Desktop Navigation */
export const DesktopNav = () => {
    return (
        <DesktopOnly>
            <DesktopSidebar />
            <DesktopTopbar />
        </DesktopOnly>
    );
};

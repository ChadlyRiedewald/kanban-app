import DesktopOnly from '../../../app/common/desktopOnly';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopTopbar } from './DesktopTopbar';

export const DesktopNav = () => {
    return (
        <DesktopOnly>
            <DesktopSidebar />
            <DesktopTopbar />
        </DesktopOnly>
    );
};

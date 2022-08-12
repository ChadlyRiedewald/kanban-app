import { Sidebar, Topbar } from './index';
import DesktopOnly from '../../desktopOnly';

const DesktopNav = () => {
    return (
        <DesktopOnly>
            <Sidebar />
            <Topbar />
        </DesktopOnly>
    );
};

export default DesktopNav;

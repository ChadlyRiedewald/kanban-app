import NavMenu from '../NavMenu';
import { DialogWrapper } from '../../../app/common/dialog';

/* This component renders only the mobile navigation dropdown MENU */

//=====================
// COMPONENTS
export const MobileNavDialog = () => {
    return (
        <DialogWrapper nav>
            <NavMenu />
        </DialogWrapper>
    );
};

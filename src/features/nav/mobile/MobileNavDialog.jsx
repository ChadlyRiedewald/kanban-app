import NavMenu from '../NavMenu';
import { NavDialogWrapper } from '../../../app/common/dialog';

/* This component renders only the mobile navigation dropdown MENU */

//=====================
// COMPONENTS
export const MobileNavDialog = () => {
    return (
        <NavDialogWrapper nav>
            <NavMenu />
        </NavDialogWrapper>
    );
};

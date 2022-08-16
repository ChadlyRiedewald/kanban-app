import { useSelector } from 'react-redux';
import { BoardMenu } from '../../../features/board';
import { TaskMenu } from '../../../features/task';

export const MenuManager = () => {
    const menuLookup = {
        boardMenu: BoardMenu,
        taskMenu: TaskMenu,
    };
    const { menuType, variant, portalId } = useSelector(state => state.ui.menu);
    let renderedMenu;
    if (menuType) {
        const MenuComponent = menuLookup[menuType];
        renderedMenu = <MenuComponent id={portalId} variant={variant} />;
    }

    return <span>{renderedMenu}</span>;
};

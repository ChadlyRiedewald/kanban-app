import { useSelector } from 'react-redux';
import { BoardMenu } from '../../../features/boards';
import { TaskMenu } from '../../../features/tasks';

export const MenuManager = () => {
    const menuLookup = {
        boardMenu: BoardMenu,
        taskMenu: TaskMenu,
    };
    const { menuType, menuProps } = useSelector(state => state.ui.menu);
    let renderedMenu;
    if (menuType) {
        const MenuComponent = menuLookup[menuType];
        renderedMenu = <MenuComponent {...menuProps} />;
    }

    return <span>{renderedMenu}</span>;
};

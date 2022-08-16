import { MenuButton, MenuWrapper } from '../../app/common/menu';
import { openDialog } from '../../app/ui';
import { useDispatch } from 'react-redux';

export const TaskMenu = ({ ...props }) => {
    const dispatch = useDispatch();
    return (
        <MenuWrapper {...props}>
            <MenuButton
                onClick={() =>
                    dispatch(openDialog({ dialogType: 'addNewTask' }))
                }
            >
                Edit Task
            </MenuButton>
            <MenuButton
                variant='destructive'
                onClick={() =>
                    dispatch(openDialog({ dialogType: 'deleteTask' }))
                }
            >
                Delete Task
            </MenuButton>
        </MenuWrapper>
    );
};

import { MenuButton, MenuWrapper } from '../../app/common/menu';
import { openDialog } from '../../app/ui';
import { useDispatch } from 'react-redux';

export const TaskMenu = ({ task, ...props }) => {
    const dispatch = useDispatch();
    return (
        <MenuWrapper {...props}>
            <MenuButton
                onClick={() =>
                    dispatch(
                        openDialog({
                            dialogType: 'updateTask',
                            dialogProps: { task },
                        })
                    )
                }
            >
                Edit Task
            </MenuButton>
            <MenuButton
                variant='destructive'
                onClick={() =>
                    dispatch(
                        openDialog({
                            dialogType: 'deleteTask',
                            dialogProps: { task },
                        })
                    )
                }
            >
                Delete Task
            </MenuButton>
        </MenuWrapper>
    );
};

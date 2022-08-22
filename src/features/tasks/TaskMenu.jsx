import { MenuLink, MenuWrapper } from '../../app/common/menu';
import { openDialog } from '../../app/ui';
import { useDispatch } from 'react-redux';

export const TaskMenu = ({ task, ...props }) => {
    const dispatch = useDispatch();
    return (
        <MenuWrapper {...props}>
            <MenuLink
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
            </MenuLink>
            <MenuLink
                variant='destructive'
                onClick={() =>
                    dispatch(
                        openDialog({
                            dialogType: 'removeTask',
                            dialogProps: { task },
                        })
                    )
                }
            >
                Delete Task
            </MenuLink>
        </MenuWrapper>
    );
};

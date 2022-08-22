import { MenuButton, MenuWrapper } from '../../app/common/menu';
import { useDispatch } from 'react-redux';
import { openDialog } from '../../app/ui';

export const BoardMenu = ({ ...props }) => {
    const dispatch = useDispatch();
    return (
        <MenuWrapper {...props}>
            <MenuButton
                onClick={() =>
                    dispatch(
                        openDialog({
                            dialogType: 'updateBoard',
                        })
                    )
                }
            >
                Edit Board
            </MenuButton>
            <MenuButton
                variant='destructive'
                onClick={() =>
                    dispatch(openDialog({ dialogType: 'removeBoard' }))
                }
            >
                Delete Board
            </MenuButton>
        </MenuWrapper>
    );
};

import { MenuLink, MenuWrapper } from '../../app/common/menu';
import { useDispatch } from 'react-redux';
import { openDialog } from '../../app/ui';

export const BoardMenu = ({ ...props }) => {
    const dispatch = useDispatch();
    return (
        <MenuWrapper {...props}>
            <MenuLink
                onClick={() =>
                    dispatch(
                        openDialog({
                            dialogType: 'updateBoard',
                        })
                    )
                }
            >
                Edit Board
            </MenuLink>
            <MenuLink
                variant='destructive'
                onClick={() =>
                    dispatch(openDialog({ dialogType: 'removeBoard' }))
                }
            >
                Delete Board
            </MenuLink>
        </MenuWrapper>
    );
};

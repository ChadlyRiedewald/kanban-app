import styled from 'styled-components/macro';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../dialog';
import Button from '../button';
import { ReactComponent as Icon } from '../../assets/icon-menu-trigger.svg';
import { ReactComponent as Add } from '../../assets/icon-add.svg';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '../dropdownMenu';
import VisuallyHidden from '../visuallyHidden';
import { BREAKPOINTS } from '../../constants';

const Wrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
    align-items: center;

    @media screen and ${BREAKPOINTS.tablet} {
        gap: var(--space-md);
    }
`;

const AddButton = styled(Button)`
    height: 32px;
    width: 48px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AddNewTask = ({ mobile }) => {
    return (
        <Wrapper>
            <Dialog>
                <DialogTrigger asChild>
                    {mobile ? (
                        <AddButton>
                            <Add style={{ fill: 'var(--color-white)' }} />
                        </AddButton>
                    ) : (
                        <Button size='large'>+ Add New Task</Button>
                    )}
                </DialogTrigger>
                <DialogContent>
                    <h2>Test Dialog</h2>
                    <p>Test test test.....</p>
                    <DialogClose asChild>
                        <Button fluid variant='destructive' size='medium'>
                            Close Dialog
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <VisuallyHidden>Edit board</VisuallyHidden>
                    <Icon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Edit Board</DropdownMenuItem>
                    <DropdownMenuItem>Delete Board</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Wrapper>
    );
};

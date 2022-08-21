import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { AlertDialogWrapper } from '../../app/common/dialog';
import Button from '../../app/common/button';
import { closeDialog } from '../../app/ui';
import { deleteBoard } from './boardsSlice';
import { useNavigate } from 'react-router-dom';

const ButtonWrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

export const DeleteBoardDialog = () => {
    const currentBoard = useSelector(state => state.boards.selectedBoard);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onDelete = () => {
        dispatch(deleteBoard(currentBoard.id));
        navigate('/dashboard');
        dispatch(closeDialog());
    };

    return (
        <AlertDialogWrapper>
            <h2>Delete this board?</h2>
            <p>
                {`Are you sure you want to delete the ${currentBoard.title} board?
                    This action will remove all columns and tasks and cannot be
                    reversed.`}
            </p>
            <ButtonWrapper>
                <Button
                    onClick={onDelete}
                    variant='destructive'
                    size='medium'
                    fluid
                >
                    Delete
                </Button>
                <Button
                    variant='secondary'
                    size='medium'
                    fluid
                    onClick={() => dispatch(closeDialog())}
                >
                    Cancel
                </Button>
            </ButtonWrapper>
        </AlertDialogWrapper>
    );
};

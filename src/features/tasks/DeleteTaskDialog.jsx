import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { AlertDialogWrapper } from '../../app/common/dialog';
import Button from '../../app/common/button';
import { closeDialog } from '../../app/ui';
import { deleteTask } from '../boards';

const ButtonWrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

export const DeleteTaskDialog = ({ task }) => {
    const dispatch = useDispatch();

    function onDelete() {
        dispatch(deleteTask(task));
        dispatch(closeDialog());
    }

    function onCancel() {
        dispatch(closeDialog());
    }

    return (
        <AlertDialogWrapper>
            <h2>Delete this task?</h2>
            <p>
                {`Are you sure you want to delete the ${task.title} task and
                its subtasks? This action cannot be reversed.`}
            </p>
            <ButtonWrapper>
                <Button
                    variant='destructive'
                    size='medium'
                    fluid
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Button
                    variant='secondary'
                    size='medium'
                    fluid
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </ButtonWrapper>
        </AlertDialogWrapper>
    );
};

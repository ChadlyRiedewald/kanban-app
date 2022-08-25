import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { AlertDialogWrapper } from '../../app/common/dialog';
import Button from '../../app/common/button';
import { closeDialog } from '../../app/ui';
import { actionError, actionFinish, actionStart } from '../../app/async';
import { delay } from '../../app/util';
import { removeTaskFromFirestore } from '../../app/firebase';

//=====================
// STYLED COMPONENTS
const ButtonWrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

//=====================
// COMPONENTS
export const RemoveTaskDialog = ({ task }) => {
    const dispatch = useDispatch();
    const allSubtasks = useSelector(state => state.data.subtasks);
    const isLoading = useSelector(state => state.async.loading);
    const subtasks = allSubtasks.filter(subtask =>
        task.subtaskIds.includes(subtask.id)
    );

    const handleDelete = async () => {
        dispatch(actionStart());
        try {
            await delay(500);
            await removeTaskFromFirestore({
                task: task,
                subtasks: subtasks,
            });
            dispatch(closeDialog());
            dispatch(actionFinish());
        } catch (error) {
            dispatch(actionError(error));
        }
    };

    function handleCancel() {
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
                    loading={isLoading}
                    variant='destructive'
                    size='medium'
                    fluid
                    onClick={handleDelete}
                >
                    Delete
                </Button>
                <Button
                    variant='secondary'
                    size='medium'
                    fluid
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
            </ButtonWrapper>
        </AlertDialogWrapper>
    );
};

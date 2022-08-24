import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { AlertDialogWrapper } from '../../app/common/dialog';
import Button from '../../app/common/button';
import { closeDialog } from '../../app/ui';
import { useNavigate } from 'react-router-dom';
import { removeBoardFromFirestore } from '../../app/firebase';
import { delay } from '../../app/util';
import { actionError, actionFinish, actionStart } from '../../app/async';

//=====================
// STYLED COMPONENTS
const ButtonWrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

//=====================
// COMPONENTS
export const RemoveBoardDialog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.async.loading);
    const allColumns = useSelector(state => state.data.columns);
    const allTasks = useSelector(state => state.data.tasks);
    const allSubtasks = useSelector(state => state.data.subtasks);
    const currentBoard = useSelector(state => state.data.selectedBoard);
    const currentColumns = allColumns.filter(column =>
        currentBoard?.columnIds.includes(column.id)
    );
    const currentTasks = allTasks.filter(task =>
        currentColumns.map(column => column.taskIds.includes(task.id))
    );
    const currentSubtasks = allSubtasks.filter(subtask =>
        currentTasks.map(task => task.subtaskIds.includes(subtask.id))
    );

    const handleDelete = async () => {
        dispatch(actionStart());
        try {
            await delay(500);
            await removeBoardFromFirestore({
                board: currentBoard,
                columns: currentColumns,
                tasks: currentTasks,
                subtasks: currentSubtasks,
            });
            navigate('/dashboard');
            dispatch(closeDialog());
            dispatch(actionFinish());
        } catch (error) {
            console.log(error);
            dispatch(actionError(error));
        }
    };

    return (
        <AlertDialogWrapper>
            <h2>Delete this board?</h2>
            <p>
                {`Are you sure you want to delete the ${currentBoard?.title} board?
                    This action will remove all columns and tasks and cannot be
                    reversed.`}
            </p>
            <ButtonWrapper>
                <Button
                    onClick={handleDelete}
                    loading={isLoading}
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

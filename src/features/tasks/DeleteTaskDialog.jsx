import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { AlertDialogWrapper } from '../../app/common/dialog';
import Button from '../../app/common/button';
import { closeDialog } from '../../app/ui';

const ButtonWrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

export const DeleteTaskDialog = () => {
    const dispatch = useDispatch();
    return (
        <AlertDialogWrapper>
            <h2>Delete this task?</h2>
            <p>
                Are you sure you want to delete the ‘TASK TITLE HERE’ task and
                its subtasks? This action cannot be reversed.
            </p>
            <ButtonWrapper>
                <Button variant='destructive' size='medium' fluid>
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

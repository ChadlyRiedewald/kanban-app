import { AlertDialogWrapper } from '../../app/common/dialog';
import styled from 'styled-components/macro';
import Button from '../../app/common/button';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../app/ui';
import { signOutUser } from '../auth';

const ButtonWrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

export const SignOutDialog = () => {
    const dispatch = useDispatch();
    return (
        <AlertDialogWrapper>
            <h2>Sign out</h2>
            <p>Are you sure you want to sign out?</p>
            <ButtonWrapper>
                <Button
                    onClick={() => {
                        dispatch(signOutUser());
                        dispatch(closeDialog());
                    }}
                    variant='destructive'
                    size='medium'
                    fluid
                >
                    Confirm
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

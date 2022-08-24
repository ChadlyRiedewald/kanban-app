import { AlertDialogWrapper } from '../../app/common/dialog';
import styled from 'styled-components/macro';
import Button from '../../app/common/button';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../app/ui';
import { signOutFirebase } from '../../app/firebase';
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
export const SignOutDialog = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.async.loading);

    async function handleSignOut() {
        dispatch(actionStart());
        try {
            await delay(500);
            await signOutFirebase();
            dispatch(closeDialog());
            dispatch(actionFinish());
        } catch (error) {
            dispatch(actionError(error));
        }
    }

    return (
        <AlertDialogWrapper>
            <h2>Sign out</h2>
            <p>Are you sure you want to sign out?</p>
            <ButtonWrapper>
                <Button
                    variant='destructive'
                    size='medium'
                    fluid
                    loading={isLoading}
                    onClick={handleSignOut}
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

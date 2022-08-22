import { AlertDialogWrapper } from '../../app/common/dialog';
import styled from 'styled-components/macro';
import Button from '../../app/common/button';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../app/ui';
import { signOutFirebase } from '../../app/firebase';
import { delay } from '../../app/util';
import { useState } from 'react';

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
    const [loading, setLoading] = useState(false);

    async function handleSignOut() {
        setLoading(true);
        try {
            await delay(500);
            await signOutFirebase();
            dispatch(closeDialog());
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
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
                    loading={loading}
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

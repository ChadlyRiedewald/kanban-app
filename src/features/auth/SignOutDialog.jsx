import { AlertDialogWrapper } from '../../app/common/dialog';
import styled from 'styled-components/macro';
import Button from '../../app/common/button';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../app/ui';
import { signOut } from 'firebase/auth';
import { auth } from '../../app/firebase';
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

    return (
        <AlertDialogWrapper>
            <h2>Sign out</h2>
            <p>Are you sure you want to sign out?</p>
            <ButtonWrapper>
                <Button
                    onClick={async () => {
                        setLoading(true);
                        try {
                            await signOut(auth);
                            setLoading(false);
                            dispatch(closeDialog());
                        } catch (error) {
                            setLoading(false);
                            console.error(error.message);
                        }
                    }}
                    variant='destructive'
                    size='medium'
                    fluid
                >
                    Confirm
                </Button>
                <Button
                    loading={loading}
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

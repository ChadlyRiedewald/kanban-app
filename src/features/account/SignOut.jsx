import { useNavigate } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogButtonWrapper,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from '../../app/common/alertDialog';
import Button from '../../app/common/button';

export const SignOut = ({ trigger }) => {
    const navigate = useNavigate();
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
                <AlertDialogContent>
                    <h2>Sign out</h2>
                    <p>Are you sure you want to sign out?</p>
                    <AlertDialogButtonWrapper>
                        <AlertDialogAction asChild>
                            <Button
                                onClick={() => navigate('/auth/sign-in')}
                                variant='destructive'
                                size='large'
                                fluid
                            >
                                Sign out
                            </Button>
                        </AlertDialogAction>
                        <AlertDialogCancel asChild>
                            <Button variant='secondary' size='large' fluid>
                                Cancel
                            </Button>
                        </AlertDialogCancel>
                    </AlertDialogButtonWrapper>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

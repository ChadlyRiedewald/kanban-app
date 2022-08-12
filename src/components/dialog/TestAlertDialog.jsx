import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogButtonWrapper,
    AlertDialogCancel,
    AlertDialogAction,
} from './AlertDialog';
import Button from '../button';

export const TestAlertDialog = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='secondary' size='medium' fluid>
                    Open Alert Dialog
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <h2>Delete Task</h2>
                <p>
                    Are you sure you want to delete this task? This can't be
                    undone.
                </p>
                <AlertDialogButtonWrapper>
                    <AlertDialogAction asChild>
                        <Button variant='destructive' size='large' fluid>
                            Delete
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
    );
};

import { Dialog, DialogClose, DialogContent, DialogTrigger } from './Dialog';
import Button from '../button';

const TestDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='primary' size='medium' fluid>
                    Open Dialog
                </Button>
            </DialogTrigger>
            <DialogContent>
                <h2>Testing Dialog</h2>
                <p>Test test test.....</p>
                <DialogClose>
                    <Button fluid variant='destructive' size='medium'>
                        Close Dialog
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default TestDialog;

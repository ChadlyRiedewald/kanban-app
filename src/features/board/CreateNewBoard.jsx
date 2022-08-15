import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';

const initialValues = {
    name: '',
    columns: ['', ''],
};

export const CreateNewBoard = ({ trigger }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => console.log(values)}
                    >
                        {({ values, isSubmitting }) => (
                            <Form>
                                <h2>Add New Board</h2>
                                <FormikControl
                                    control='input'
                                    label='Name'
                                    name='name'
                                    placeholder='e.g. Web design'
                                />
                                <FormikControl
                                    control='input-group'
                                    label='Columns'
                                    name='columns'
                                    values={values.columns}
                                    placeholder='e.g. Todo'
                                />
                                <DialogClose asChild>
                                    <Button
                                        fluid
                                        variant='primary'
                                        size='medium'
                                    >
                                        Create New Board
                                    </Button>
                                </DialogClose>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
};

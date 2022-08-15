import Button from '../../app/common/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';

const initialValues = {
    title: '',
    description: '',
    subtasks: ['', ''],
    column: '',
};

const columns = [
    { key: 'Todo', value: 'todo' },
    { key: 'Doing', value: 'doing' },
    { key: 'Done', value: 'done' },
];

export const AddNewTask = ({ trigger }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    onSubmit={values => console.log(values)}
                >
                    {({ values, isSubmitting }) => (
                        <Form>
                            <h2>Add New Task</h2>
                            <FormikControl
                                control='input'
                                label='Title'
                                name='title'
                                placeholder='e.g. Take coffee break'
                            />
                            <FormikControl
                                control='textarea'
                                label='Description'
                                name='description'
                                placeholder='e.g. It’s always good to take a break. This 15 minute break will
recharge the batteries a little.'
                            />
                            <FormikControl
                                control='input-group'
                                label='Subtasks'
                                name='subtasks'
                                values={values.subtasks}
                                placeholder='e.g. Make coffee'
                            />
                            <FormikControl
                                label='Column'
                                control='select'
                                name='column'
                                options={columns}
                            />
                            <DialogClose asChild>
                                <Button fluid variant='primary' size='medium'>
                                    Create Task
                                </Button>
                            </DialogClose>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

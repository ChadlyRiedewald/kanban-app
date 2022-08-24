import Button from '../../app/common/button';
import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../app/ui';
import { addTaskToFirestore } from '../../app/firebase';
import { delay } from '../../app/util';

//=====================
// VALIDATION SCHEMA
const validationSchema = Yup.object({
    title: Yup.string().required(`Can't be empty`),
    description: Yup.string().max(256, 'Max. 256 characters'),
    subtasks: Yup.array().of(
        Yup.object().shape({
            title: Yup.string(),
        })
    ),
    column: Yup.string(),
});

export const AddTaskDialog = ({ columnId }) => {
    const dispatch = useDispatch();
    const currentBoard = useSelector(state => state.data.selectedBoard);
    const allColumns = useSelector(state => state.data.columns);
    const currentColumns = allColumns.filter(column =>
        currentBoard.columnIds.includes(column.id)
    );

    //=====================
    // INITIAL VALUES
    const initialValues = {
        title: '',
        description: '',
        subtasks: [
            { title: '', placeholder: 'e.g. Make coffee' },
            { title: '', placeholder: 'e.g. Drink coffee' },
        ],
        columnId: columnId || currentColumns[0].id,
    };

    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    try {
                        await delay(500);
                        await addTaskToFirestore({
                            title: values.title,
                            description: values.description,
                            columnId: values.columnId,
                            subtasks: values.subtasks
                                .filter(subtask => subtask.title)
                                .map(subtask => ({
                                    title: subtask.title,
                                    completed: false,
                                })),
                        });
                        dispatch(closeDialog());
                    } catch (error) {
                        console.log(error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, isSubmitting, isValid, dirty }) => (
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
                            placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
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
                            name='columnId'
                            options={currentColumns.map(({ title, id }) => ({
                                title,
                                id,
                            }))}
                        />
                        <Button
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting}
                            type='submit'
                            fluid
                            variant='primary'
                            size='medium'
                        >
                            Create Task
                        </Button>
                    </Form>
                )}
            </Formik>
        </DialogWrapper>
    );
};

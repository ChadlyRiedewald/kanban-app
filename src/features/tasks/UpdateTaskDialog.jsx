import Button from '../../app/common/button';
import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { closeDialog } from '../../app/ui';
import { delay } from '../../app/util';
import { updateTaskFromFirestore } from '../../app/firebase';

//=====================
// VALIDATION SCHEMA
const validationSchema = Yup.object({
    title: Yup.string().required(`Can't be empty`),
    description: Yup.string().max(256, 'Max. 256 characters'),
    subtasks: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required(`Can't be empty`),
        })
    ),
    column: Yup.string(),
});

export const UpdateTaskDialog = ({ task }) => {
    const dispatch = useDispatch();
    const board = useSelector(state => state.data.selectedBoard);
    const allSubtasks = useSelector(state => state.data.subtasks);
    const allColumns = useSelector(state => state.data.columns);
    const currentColumns = allColumns.filter(column =>
        board?.columnIds.includes(column.id)
    );

    //=====================
    // PREVIOUS STATE OF DATA TO PASS INTO FUNCTION
    const column = allColumns.filter(column => task.columnId === column.id);
    const subtasks = allSubtasks.filter(subtask =>
        task.subtaskIds.includes(subtask.id)
    );

    //=====================
    // INITIAL VALUES
    const initialValues = {
        title: task.title,
        description: task.description,
        subtasks: subtasks,
        columnId: task.columnId,
    };

    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);

                    console.log(values);
                    try {
                        await delay(500);
                        await updateTaskFromFirestore({
                            board: board,
                            prevColumn: column,
                            task: task,
                            prevSubtasks: subtasks,
                            title: values.title,
                            description: values.description,
                            columnId: values.columnId,
                            subtasks: values.subtasks.map(subtask => ({
                                id: subtask.id || nanoid(),
                                title: subtask.title,
                                completed: subtask.completed || false,
                                taskId: task.id,
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
                        <h2>Edit Task</h2>
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
                            Save Changes
                        </Button>
                    </Form>
                )}
            </Formik>
        </DialogWrapper>
    );
};

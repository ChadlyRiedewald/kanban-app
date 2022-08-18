import Button from '../../app/common/button';
import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createTask } from '../boards';
import { closeDialog } from '../../app/ui';
import { nanoid } from '@reduxjs/toolkit';

export const CreateTaskDialog = () => {
    const dispatch = useDispatch();
    const currentBoard = useSelector(state => state.board.selectedBoard);

    const initialValues = {
        title: '',
        description: '',
        subtasks: [
            { title: '', placeholder: 'e.g. Make coffee' },
            { title: '', placeholder: 'e.g. Drink coffee' },
        ],
        column: currentBoard?.columns[0].title,
    };

    const validationSchema = Yup.object({
        title: Yup.string().required(`Can't be empty`),
        description: Yup.string().max(256, 'Max. 256 characters'),
        subtasks: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required(`Can't be empty`),
            })
        ),
        column: Yup.string().required(`Can't be empty`),
    });

    const columns = currentBoard.columns.map(column => {
        return column.title;
    });

    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    dispatch(
                        createTask({
                            ...values,
                            taskId: nanoid(),
                            boardId: currentBoard.id,
                            subtasks: [
                                ...values.subtasks.map(subtask => {
                                    return {
                                        subtaskId: nanoid(),
                                        title: subtask.title,
                                        completed: false,
                                    };
                                }),
                            ],
                        })
                    );
                    dispatch(closeDialog());
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
                            name='column'
                            options={columns}
                        />
                        <Button
                            disabled={!isValid || !dirty || isSubmitting}
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

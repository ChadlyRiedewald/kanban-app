import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../app/ui';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { updateBoardFromFirestore } from '../../app/firebase';
import { delay } from '../../app/util';
import { actionError, actionFinish, actionStart } from '../../app/async';

//=====================
// VALIDATION SCHEMA
const validationSchema = Yup.object({
    title: Yup.string()
        .max(16, 'Max. 16 characters')
        .required(`Can't be empty`),
    columns: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required(`Can't be empty`),
        })
    ),
});

export const UpdateBoardDialog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allColumns = useSelector(state => state.data.columns);
    const allTasks = useSelector(state => state.data.tasks);
    const allSubtasks = useSelector(state => state.data.subtasks);

    //=====================
    // PREVIOUS STATE OF DATA TO PASS INTO FUNCTION
    const board = useSelector(state => state.data.selectedBoard);
    const columns = [
        ...allColumns.filter(column => board.columnIds.includes(column.id)),
    ];
    const tasks = allTasks.filter(task =>
        board.columnIds.includes(task.columnId)
    );
    const tasksIds = tasks.map(({ id }) => id);
    const subtasks = allSubtasks.filter(subtask =>
        tasksIds.includes(subtask.taskId)
    );

    //=====================
    // INITIAL COLUMNS
    const currentColumns = allColumns.filter(column => {
        return board.columnIds.includes(column.id);
    });

    //=====================
    // INITIAL VALUES
    const initialValues = {
        title: board.title,
        columns: currentColumns,
    };

    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    dispatch(actionStart());
                    try {
                        await delay(500);
                        await updateBoardFromFirestore({
                            board: board,
                            prevColumns: columns,
                            prevTasks: tasks,
                            prevSubtasks: subtasks,
                            columns: [
                                ...values.columns.map(column => ({
                                    id: column.id || nanoid(),
                                    title: column.title,
                                    color:
                                        column.color ||
                                        Math.floor(Math.random() * 6) + 1,
                                    boardId: board.id,
                                    taskIds: column.taskIds || [],
                                })),
                            ],
                            title: values.title,
                        });
                        dispatch(actionFinish());
                        navigate(`/dashboard/${board.id}`);
                        dispatch(closeDialog());
                    } catch (error) {
                        dispatch(actionError(error));
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, isValid, dirty, isSubmitting }) => (
                    <Form>
                        <h2>Edit Board</h2>
                        <FormikControl
                            control='input'
                            label='Title'
                            name='title'
                            placeholder='e.g. Web design'
                        />
                        <FormikControl
                            control='input-group'
                            label='Columns'
                            name='columns'
                            values={values.columns}
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

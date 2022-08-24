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

//=====================
// VALIDATION SCHEMA
const validationSchema = Yup.object({
    columns: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required(`Can't be empty`),
        })
    ),
});

export const AddColumnDialog = () => {
    const dispatch = useDispatch();
    const currentBoard = useSelector(state => state.data.selectedBoard);
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
    const tasksIds = tasks.map(task => task.id);
    const subtasks = allSubtasks.filter(subtask =>
        tasksIds.includes(subtask.taskId)
    );

    //=====================
    // INITIAL VALUES
    const initialValues = {
        columns: columns,
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
                        });
                        dispatch(closeDialog());
                        navigate(`/dashboard/${currentBoard.id}`);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, isValid, dirty, isSubmitting }) => (
                    <Form>
                        <h2>Add Column</h2>
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

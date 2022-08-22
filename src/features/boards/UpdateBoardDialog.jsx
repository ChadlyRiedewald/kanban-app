import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { columnsSelectors, updateBoard } from './boardsSlice';
import { closeDialog } from '../../app/ui';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

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
    const currentBoard = useSelector(state => state.boards.selectedBoard);
    const allColumns = useSelector(columnsSelectors.selectAll);

    //=====================
    // INITIAL COLUMNS
    const currentColumns = allColumns.filter(column => {
        return currentBoard.columnIds.includes(column.id);
    });

    //=====================
    // INITIAL VALUES
    const initialValues = {
        title: currentBoard.title,
        columns: currentColumns.map(column => ({
            id: column.id,
            title: column.title,
        })),
    };

    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    dispatch(
                        updateBoard({
                            boardId: currentBoard.id,
                            title: values.title,
                            columns: values.columns.map(column => ({
                                id: column.id || nanoid(),
                                title: column.title,
                            })),
                        })
                    );
                    navigate(`/dashboard/${currentBoard.id}`);
                    dispatch(closeDialog());
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

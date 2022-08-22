import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addColumn } from '../boards';
import { closeDialog } from '../../app/ui';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

export const AddColumnDialog = () => {
    const dispatch = useDispatch();
    const currentBoard = useSelector(state => state.boards.selectedBoard);
    const navigate = useNavigate();

    const initialValues = {
        columns: [''],
    };

    const validationSchema = Yup.object({
        columns: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required(`Can't be empty`),
            })
        ),
    });

    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    dispatch(
                        addColumn({
                            columns: values.columns.map(column => ({
                                id: nanoid(),
                                title: column.title,
                                color: Math.floor(Math.random() * 6) + 1,
                                boardId: currentBoard.id,
                                taskIds: [],
                            })),
                            boardId: currentBoard.id,
                        })
                    );
                    dispatch(closeDialog());
                    navigate(`/dashboard/${currentBoard.id}`);
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

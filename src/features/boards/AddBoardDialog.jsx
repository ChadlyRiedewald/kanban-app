import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import * as Yup from 'yup';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addBoard } from './boardsSlice';
import { closeDialog } from '../../app/ui';
import { useNavigate } from 'react-router-dom';

export const AddBoardDialog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        title: '',
        columns: [
            { title: '', placeholder: 'e.g. Todo' },
            { title: '', placeholder: 'e.g. Done' },
        ],
    };

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

    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    const boardId = nanoid();
                    dispatch(
                        addBoard({
                            id: boardId,
                            title: values.title,
                            columns: values.columns.map(column => ({
                                id: nanoid(),
                                title: column.title,
                                color: Math.floor(Math.random() * 8) + 1,
                                boardId: boardId,
                                taskIds: [],
                            })),
                        })
                    );
                    dispatch(closeDialog());
                    navigate(`/dashboard/${boardId}`);
                }}
            >
                {({ values, isSubmitting, isValid, dirty }) => (
                    <Form>
                        <h2>Add New Board</h2>
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
                            Create Board
                        </Button>
                    </Form>
                )}
            </Formik>
        </DialogWrapper>
    );
};

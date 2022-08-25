import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import * as Yup from 'yup';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../app/ui';
import { addBoardToFirestore } from '../../app/firebase';
import { delay } from '../../app/util';
import { actionError, actionFinish, actionStart } from '../../app/async';

//=====================
// INITIAL VALUES
const initialValues = {
    title: '',
    columns: [
        { title: '', placeholder: 'e.g. Todo' },
        { title: '', placeholder: 'e.g. Done' },
    ],
};

//=====================
// VALIDATION SCHEMA
const validationSchema = Yup.object({
    title: Yup.string()
        .max(16, 'Max. 16 characters')
        .required(`Can't be empty`),
    columns: Yup.array().of(
        Yup.object().shape({
            title: Yup.string(),
        })
    ),
});

//=====================
// COMPONENTS
export const AddBoardDialog = () => {
    const dispatch = useDispatch();

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
                        await addBoardToFirestore({
                            title: values.title,
                            columns: [
                                ...values.columns
                                    .filter(column => column.title)
                                    .map(column => ({
                                        id: nanoid(),
                                        title: column.title,
                                        color:
                                            Math.floor(Math.random() * 6) + 1,
                                        taskIds: [],
                                    })),
                            ],
                        });
                        dispatch(actionFinish());
                        dispatch(closeDialog());
                    } catch (error) {
                        dispatch(actionError(error));
                    } finally {
                        setSubmitting(false);
                    }
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
                            loading={isSubmitting}
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

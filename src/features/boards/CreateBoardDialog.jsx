import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import { useDispatch } from 'react-redux';
import { createBoard } from './boardsSlice';
import { closeDialog } from '../../app/ui';
import * as Yup from 'yup';

export const CreateBoardDialog = () => {
    const dispatch = useDispatch();

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
                    dispatch(createBoard(values));
                    dispatch(closeDialog());
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

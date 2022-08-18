import { useDispatch, useSelector } from 'react-redux';
import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { updateBoard } from './boardsSlice';
import { closeDialog } from '../../app/ui';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import * as Yup from 'yup';

export const UpdateBoardDialog = () => {
    const dispatch = useDispatch();
    const currentBoard = useSelector(state => state.board.selectedBoard);

    const initialValues = {
        title: currentBoard.title,
        columns: currentBoard?.columns,
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
                    dispatch(
                        updateBoard({
                            ...currentBoard,
                            ...values,
                        })
                    );
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

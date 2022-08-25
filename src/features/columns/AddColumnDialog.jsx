import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../app/ui';
import { useNavigate } from 'react-router-dom';
import { addColumnToFirestore } from '../../app/firebase';
import { delay } from '../../app/util';
import { actionError, actionFinish, actionStart } from '../../app/async';

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

    //=====================
    // INITIAL VALUES
    const initialValues = {
        title: '',
    };

    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    dispatch(actionStart());
                    console.log(values);
                    try {
                        await delay(500);
                        await addColumnToFirestore({
                            board: currentBoard,
                            column: {
                                title: values.title,
                                color: Math.floor(Math.random() * 6) + 1,
                                boardId: currentBoard.id,
                                taskIds: [],
                            },
                        });
                        dispatch(actionFinish());
                        dispatch(closeDialog());
                        navigate(`/dashboard/${currentBoard.id}`);
                    } catch (error) {
                        dispatch(actionError(error));
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, isValid, dirty, isSubmitting }) => (
                    <Form>
                        <h2>New Column</h2>
                        <FormikControl
                            control='input'
                            label='Name'
                            name='title'
                            values={values.title}
                            placeholder='e.g. Todo'
                        />
                        <Button
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting}
                            type='submit'
                            fluid
                            variant='primary'
                            size='medium'
                        >
                            Create Column
                        </Button>
                    </Form>
                )}
            </Formik>
        </DialogWrapper>
    );
};

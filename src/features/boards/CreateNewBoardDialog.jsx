import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../app/ui';

const initialValues = {
    name: '',
    columns: ['', ''],
};

export const CreateNewBoardDialog = () => {
    const dispatch = useDispatch();
    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={values => console.log(values)}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <h2>Add New Board</h2>
                        <FormikControl
                            control='input'
                            label='Name'
                            name='name'
                            placeholder='e.g. Web design'
                        />
                        <FormikControl
                            control='input-group'
                            label='Columns'
                            name='columns'
                            values={values.columns}
                            placeholder='e.g. Todo'
                        />
                        <Button
                            onClick={() => dispatch(closeDialog())}
                            type='button'
                            fluid
                            variant='primary'
                            size='medium'
                        >
                            Create New Board
                        </Button>
                    </Form>
                )}
            </Formik>
        </DialogWrapper>
    );
};

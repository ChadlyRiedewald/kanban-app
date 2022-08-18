import styled from 'styled-components/macro';
import * as Yup from 'yup';
import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../app/ui';

const ButtonWrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

const initialValues = {
    newPassword: '',
    confirmNewPassword: '',
};

const validationSchema = Yup.object({
    newPassword: Yup.string().required(`Can't be empty`),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required(`Can't be empty`),
});

export const ChangePasswordDialog = () => {
    const dispatch = useDispatch();
    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => console.log(values)}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <h2>Change password</h2>
                        <FormikControl
                            control='input'
                            label='New password'
                            type='password'
                            name='newPassword'
                        />
                        <FormikControl
                            control='input'
                            label='Confirm password'
                            type='password'
                            name='confirmNewPassword'
                        />
                        <ButtonWrapper>
                            <Button
                                type='submit'
                                fluid
                                variant='primary'
                                size='medium'
                            >
                                Save Changes
                            </Button>
                            <Button
                                onClick={() => dispatch(closeDialog())}
                                type='button'
                                fluid
                                variant='secondary'
                                size='medium'
                            >
                                Cancel
                            </Button>
                        </ButtonWrapper>
                    </Form>
                )}
            </Formik>
        </DialogWrapper>
    );
};

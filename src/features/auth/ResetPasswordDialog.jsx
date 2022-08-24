import styled from 'styled-components/macro';
import * as Yup from 'yup';
import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../app/ui';
import { resetPasswordFirebase } from '../../app/firebase';

//=====================
// STYLED COMPONENTS
const ButtonWrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

//=====================
// INITIAL VALUES
const initialValues = {
    email: '',
};

//=====================
// VALIDATION SCHEMA
const validationSchema = Yup.object({
    email: Yup.string().email(`Not a valid email`).required(`Can't be empty`),
});

//=====================
//COMPONENTS
export const ResetPasswordDialog = () => {
    const dispatch = useDispatch();

    function handleError(errorCode) {
        switch (errorCode) {
            case 'auth/user-not-found':
                return {
                    ['email']: 'User not found',
                };
            default:
                return '';
        }
    }

    return (
        <DialogWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setErrors, setSubmitting }) => {
                    try {
                        await resetPasswordFirebase(values.email);
                        dispatch(closeDialog());
                    } catch (error) {
                        setErrors(handleError(error.code));
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, isSubmitting, isValid, dirty }) => (
                    <Form>
                        <h2 style={{ marginBottom: -16 }}>Reset password</h2>
                        <p>Please enter your email to reset your password</p>
                        <FormikControl
                            control='input'
                            label='Email'
                            name='email'
                        />
                        <ButtonWrapper>
                            <Button
                                disabled={!isValid || !dirty || isSubmitting}
                                loading={isSubmitting}
                                type='submit'
                                fluid
                                variant='primary'
                                size='medium'
                            >
                                Send
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

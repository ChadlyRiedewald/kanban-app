import styled from 'styled-components/macro';
import * as Yup from 'yup';
import { DialogWrapper } from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../app/ui';
import { updatePasswordFirebase } from '../../app/firebase';

//=====================
// STYLED COMPONENTS
const ButtonWrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

//=====================
// INITIAL VALUES
const initialValues = {
    newPassword: '',
    confirmNewPassword: '',
};

//=====================
// VALIDATION SCHEMA
const validationSchema = Yup.object({
    newPassword: Yup.string()
        .min(6, `Min. 6 characters`)
        .required(`Can't be empty`),
    confirmNewPassword: Yup.string()
        .min(6, `Min. 6 characters`)
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required(`Can't be empty`),
});

//=====================
//COMPONENTS
export const UpdatePasswordDialog = () => {
    const dispatch = useDispatch();

    function handleError(errorCode) {
        switch (errorCode) {
            case 'auth/requires-recent-login':
                return {
                    ['newPassword']: 'Please re-authenticate to proceed',
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
                        await updatePasswordFirebase(values.confirmNewPassword);
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
                                disabled={!isValid || !dirty || isSubmitting}
                                loading={isSubmitting}
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

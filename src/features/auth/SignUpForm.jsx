import { FormikControl, Form } from '../../app/common/form';
import Button from '../../app/common/button';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import * as Yup from 'yup';
import { CenteredSpan, FormWrapper, LogoTablet } from './Auth';
import { Formik } from 'formik';
import { signUpFirebase } from '../../app/firebase';

//=====================
// INITIAL VALUES
const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

//=====================
// VALIDATION SCHEMA
const validationSchema = Yup.object({
    email: Yup.string().email(`Not a valid email`).required(`Can't be empty`),
    password: Yup.string()
        .min(6, `Min. 6 characters`)
        .required(`Can't be empty`),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required(`Can't be empty`),
});

//=====================
// COMPONENTS
export const SignUpForm = () => {
    const navigate = useNavigate();

    function handleError(errorCode) {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return {
                    ['email']: 'Already in use',
                };
            case 'auth/invalid-email':
                return {
                    ['email']: 'Invalid email',
                };
            default:
                return '';
        }
    }

    return (
        <FormWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setErrors, setSubmitting }) => {
                    try {
                        await signUpFirebase(
                            values.email,
                            values.confirmPassword
                        );
                        navigate('/dashboard');
                    } catch (error) {
                        setErrors(handleError(error.code));
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <Form>
                        <LogoTablet>
                            <Logo />
                        </LogoTablet>
                        <h1>Get started</h1>
                        <p>Please enter your details to create your account.</p>
                        <FormikControl
                            control='input'
                            label='Email'
                            name='email'
                            placeholder='Enter your email'
                        />
                        <FormikControl
                            control='input'
                            label='Password'
                            name='password'
                            type='password'
                            placeholder='Enter your password'
                        />
                        <FormikControl
                            control='input'
                            label='Confirm password'
                            name='confirmPassword'
                            type='password'
                            placeholder='Confirm your password'
                        />
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            variant='primary'
                            size='medium'
                            fluid
                        >
                            Sign up
                        </Button>
                        <CenteredSpan>
                            Already have an account?{' '}
                            <Link to='/auth/sign-in'>Sign in</Link>
                        </CenteredSpan>
                    </Form>
                )}
            </Formik>
        </FormWrapper>
    );
};

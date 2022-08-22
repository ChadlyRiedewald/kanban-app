import { FormikControl, Form } from '../../app/common/form';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Button from '../../app/common/button';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { CenteredSpan, LogoTablet, FormWrapper, ButtonsWrapper } from './Auth';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

//=====================
// INITIAL VALUES
const initialValues = {
    email: '',
    password: '',
    rememberPassword: false,
};

//=====================
// VALIDATION SCHEMA
const validationSchema = Yup.object({
    email: Yup.string().email(`Not a valid email`).required(`Can't be empty`),
    password: Yup.string().required(`Can't be empty`),
    rememberPassword: Yup.boolean(),
});

//=====================
// COMPONENTS
export const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <FormWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async values => console.log(values)}
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <Form>
                        <LogoTablet>
                            <Logo />
                        </LogoTablet>
                        <h1>Welcome back</h1>
                        <p>Please enter your details to sign in.</p>
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
                        <ButtonsWrapper>
                            <FormikControl
                                control='checkbox'
                                label='Remember for 30 days'
                                name='rememberPassword'
                            />
                            <a href='#'>Forgot password?</a>
                        </ButtonsWrapper>
                        <Button
                            loading={isSubmitting}
                            // disabled={!isValid || !dirty || isSubmitting}
                            onClick={() => {
                                navigate('/dashboard');
                            }}
                            type='submit'
                            variant='primary'
                            size='medium'
                            fluid
                        >
                            Sign in
                        </Button>
                        <CenteredSpan>
                            Don't have an account?{' '}
                            <Link to='/auth/sign-up'>Sign up</Link>
                        </CenteredSpan>
                    </Form>
                )}
            </Formik>
        </FormWrapper>
    );
};

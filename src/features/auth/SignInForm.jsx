import { FormikControl, Form, Label } from '../../app/common/form';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Button from '../../app/common/button';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { CenteredSpan, LogoTablet, FormWrapper, ButtonsWrapper } from './Auth';
import { Formik } from 'formik';
import { signInFirebase } from '../../app/firebase';
import { useDispatch } from 'react-redux';
import { openDialog } from '../../app/ui';
import { useState } from 'react';
import styled from 'styled-components/macro';
import { secondaryBg } from '../../constants';

//=====================
// STYLED COMPONENTS
const StyledCheckbox = styled.input`
    &[type='checkbox'] {
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: var(--radii-xs);
        flex-shrink: 0;
        background-color: ${p =>
            p.checked ? 'var(--color-purple-100)' : secondaryBg};
        border: ${p =>
            !p.checked
                ? `1px var(--color-gray-400) solid`
                : `1px solid transparent`};

        &:focus {
            outline: none;
            box-shadow: 0 0 0 2px var(--color-purple-shadow);
        }

        &:focus:not(:focus-visible) {
            box-shadow: none;
        }
    }
`;

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
    const [checked, setChecked] = useState(false);

    function handleError(errorCode) {
        switch (errorCode) {
            case 'auth/user-not-found':
                return {
                    ['email']: 'User not found',
                };
            case 'auth/wrong-password':
                return {
                    ['password']: 'Wrong password',
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
                        await signInFirebase(values.email, values.password);
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
                            <Label variant='sign-in' htmlFor='rememberPassword'>
                                <StyledCheckbox
                                    type='checkbox'
                                    id='rememberPassword'
                                    checked={checked}
                                    name='rememberPassword'
                                    onChange={() => setChecked(!checked)}
                                />
                                {checked && (
                                    <svg
                                        aria-hidden='true'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='-3 -4.5 16 16'
                                    >
                                        <path
                                            stroke='var(--color-white)'
                                            strokeWidth='2'
                                            fill='none'
                                            d='m1.276 3.066 2.756 2.756 5-5'
                                        />
                                    </svg>
                                )}
                                Remember me
                            </Label>
                            <button
                                type='button'
                                onClick={() =>
                                    dispatch(
                                        openDialog({
                                            dialogType: 'resetPassword',
                                        })
                                    )
                                }
                            >
                                Forgot password?
                            </button>
                        </ButtonsWrapper>
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
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

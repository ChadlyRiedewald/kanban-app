import styled from 'styled-components/macro';
import * as Yup from 'yup';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from '../../app/common/dialog';
import { Formik } from 'formik';
import { Form, FormikControl } from '../../app/common/form';
import Button from '../../app/common/button';

const ButtonsWrapper = styled.div`
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

export const ChangePassword = ({ trigger }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent>
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
                                <ButtonsWrapper>
                                    <Button
                                        type='submit'
                                        fluid
                                        variant='primary'
                                        size='medium'
                                    >
                                        Save
                                    </Button>
                                    <DialogClose asChild>
                                        <Button
                                            type='button'
                                            fluid
                                            variant='secondary'
                                            size='medium'
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                </ButtonsWrapper>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
};

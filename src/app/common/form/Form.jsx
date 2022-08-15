import styled from 'styled-components/macro';
import { Form as FormikForm } from 'formik';

export const Form = styled(FormikForm)`
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
`;

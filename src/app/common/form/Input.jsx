import { Label, ErrorMessage } from './index';
import { useField } from 'formik';
import styled from 'styled-components/macro';
import { inputPlaceholderColor, textColor } from '../../../constants';

//=====================
// STYLED COMPONENTS
export const StyledInput = styled.input`
    height: 40px;
    padding-inline: var(--space-sm);
    border: 1px solid ${p =>
        p.error ? 'var(--color-destructive-100)' : 'var(--color-gray-400)'};
    color: ${textColor};
    background: none;
    width: 100%;
    font-weight: var(--font-medium);
    border-radius: var(--radii-sm);
    font-size: var(--font-sm);

    &:focus {
      border-color: ${p =>
          p.error ? 'var(--color-destructive-100)' : 'var(--color-purple-100)'};
      outline: none;
    }

    &::placeholder {
      color: ${inputPlaceholderColor};
    }
  } 
`;

//=====================
// COMPONENTS
export const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <Label variant='input' htmlFor={label}>
            {label}
            <StyledInput
                id={label}
                {...field}
                {...props}
                error={meta.touched && !!meta.error}
            />
            {meta.touched && meta.error ? (
                <ErrorMessage>{meta.error}</ErrorMessage>
            ) : null}
        </Label>
    );
};

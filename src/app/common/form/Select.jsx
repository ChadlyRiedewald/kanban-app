import styled from 'styled-components/macro';
import { textColor } from '../../../constants';
import { ReactComponent as Down } from '../../../assets/icon-arrow-down.svg';
import { Label } from './index';
import { useField } from 'formik';

const StyledSelect = styled.select`
    border: 1px solid
        ${p =>
            p.error ? 'var(--color-destructive-100)' : 'var(--color-gray-400)'};
    color: ${textColor};
    background: none;
    font-weight: var(--font-medium);
    border-radius: var(--radii-sm);
    font-size: var(--font-sm);
    height: 40px;
    width: 100%;
    padding-inline: var(--space-sm);
    line-height: var(--line-height-md);
    appearance: none;
    overflow: visible;
    cursor: pointer;

    &:focus {
        border-color: ${p =>
            p.error
                ? 'var(--color-destructive-100)'
                : 'var(--color-purple-100)'};
        outline: none;
    }
`;

export const Select = ({ label, options, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <Label variant='select' htmlFor={label}>
            {label}
            <StyledSelect
                id={label}
                {...field}
                {...props}
                error={meta.touched && !!meta.error}
            >
                {options.map((option, index) => (
                    <option value={option.id} key={index}>
                        {option.title}
                    </option>
                ))}
            </StyledSelect>
            <Down />
        </Label>
    );
};

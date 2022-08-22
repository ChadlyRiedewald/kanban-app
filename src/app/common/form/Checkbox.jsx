import styled from 'styled-components/macro';
import { secondaryBg } from '../../../constants';
import { useField } from 'formik';
import { Label } from './Label';

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
// COMPONENTS
export const Checkbox = ({ label, ...props }) => {
    const [field] = useField(props);
    return (
        <Label variant='sign-in' htmlFor={label}>
            <StyledCheckbox
                type='checkbox'
                id={label}
                value={label}
                checked={field.checked}
                {...field}
                {...props}
            />
            {field.checked && (
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
            {label}
        </Label>
    );
};

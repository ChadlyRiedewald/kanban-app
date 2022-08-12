import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import styled from 'styled-components/macro';
import { useState } from 'react';
import { secondaryBg } from '../../constants';

//////////////////// STYLED COMPONENTS  ////////////////////
const StyledCheckbox = styled(CheckboxPrimitive.Root)`
    all: unset;
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
        box-shadow: 0 0 0 2px var(--color-purple-shadow);
    }

    &:focus:not(:focus-visible) {
        box-shadow: none;
    }
`;

const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
    all: unset;
`;

//////////////////// EXPORTS  ////////////////////
export const CheckboxRoot = StyledCheckbox;
export const CheckboxIndicator = StyledIndicator;

//////////////////// COMPONENT  ////////////////////
export const Checkbox = ({ checked, toggle }) => {
    const [isCheckedLocal, toggleIsCheckedLocal] = useState(false);

    return (
        <CheckboxRoot
            checked={checked ? checked : isCheckedLocal}
            onCheckedChange={
                toggle ? toggle : () => toggleIsCheckedLocal(!isCheckedLocal)
            }
        >
            <CheckboxIndicator>
                <svg
                    aria-hidden='true'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='-3 -4.5 16 16'
                >
                    <path
                        stroke={'var(--color-white)'}
                        strokeWidth='2'
                        fill='none'
                        d='m1.276 3.066 2.756 2.756 5-5'
                    />
                </svg>
            </CheckboxIndicator>
        </CheckboxRoot>
    );
};

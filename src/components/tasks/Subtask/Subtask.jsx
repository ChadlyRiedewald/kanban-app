import { useState } from 'react';
import styled from 'styled-components/macro';
import { primaryBg, textColor } from '../../../constants';
import { Label, Checkbox } from '../../form';

//////////////////// STYLED COMPONENTS  ////////////////////
const Wrapper = styled(Label)`
    flex-direction: row !important;
    cursor: pointer !important;
    gap: var(--space-sm);
    align-items: center;
    line-height: var(--line-height-sm);
    font-size: var(--font-xs);
    width: 100%;
    padding: 14px 12px;
    border-radius: var(--radii-sm);
    text-decoration-thickness: 1px;
    background-color: ${primaryBg};
    text-decoration: ${p => p.checked && 'line-through'};
    color: ${p => (p.checked ? 'var(--color-gray-500)' : textColor)};

    &:hover {
        background-color: var(--color-purple-300);
    }
`;

//////////////////// COMPONENT  ////////////////////
const Subtask = ({ children }) => {
    const [isChecked, toggleIsChecked] = useState(false);

    function toggleCheckbox() {
        toggleIsChecked(!isChecked);
    }

    return (
        <Wrapper checked={isChecked}>
            <Checkbox checked={isChecked} toggle={toggleCheckbox} />
            {children}
        </Wrapper>
    );
};

export default Subtask;

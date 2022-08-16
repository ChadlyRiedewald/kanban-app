import styled from 'styled-components/macro';
import { secondaryBg } from '../../constants';
import { openDialog } from '../../app/ui';
import { useDispatch } from 'react-redux';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: var(--space-xs);
    padding-inline: var(--space-sm);
    padding-block: var(--space-md);
    background-color: ${secondaryBg};
    border-radius: var(--radii-md);
    cursor: pointer;
`;

export const TaskCard = ({ title, num1, num2 }) => {
    const dispatch = useDispatch();

    return (
        <Wrapper
            onClick={() => dispatch(openDialog({ dialogType: 'openTask' }))}
        >
            <h3>{title}</h3>
            <strong style={{ color: 'var(--color-gray-600)' }}>
                {num1} of {num2} subtasks
            </strong>
        </Wrapper>
    );
};

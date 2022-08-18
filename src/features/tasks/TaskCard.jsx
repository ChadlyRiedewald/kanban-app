import styled from 'styled-components/macro';
import { secondaryBg } from '../../constants';

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

export const TaskCard = ({ task, ...props }) => {
    return (
        <Wrapper {...props}>
            <h3>{task?.title}</h3>
            {task.subtasks.length > 0 && (
                <strong style={{ color: 'var(--color-gray-600)' }}>
                    0 of {task.subtasks.length} subtasks
                </strong>
            )}
        </Wrapper>
    );
};

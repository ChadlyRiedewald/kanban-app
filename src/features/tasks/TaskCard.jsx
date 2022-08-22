import styled from 'styled-components/macro';
import { secondaryBg } from '../../constants';
import { useSelector } from 'react-redux';
import { subtasksSelectors } from '../boards';

//=====================
// STYLED COMPONENTS
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

//=====================
// COMPONENTS
export const TaskCard = ({ task, ...props }) => {
    const allSubtasks = useSelector(subtasksSelectors.selectAll);
    const prevSubtasks = allSubtasks.filter(subtask =>
        task.subtaskIds.includes(subtask.id)
    );
    const completedSubtasks = prevSubtasks.filter(subtask => subtask.completed);

    return (
        <Wrapper {...props}>
            <h3>{task.title}</h3>
            <strong style={{ color: 'var(--color-gray-600)' }}>
                {`${completedSubtasks.length} of ${task.subtaskIds.length} subtasks`}
            </strong>
        </Wrapper>
    );
};

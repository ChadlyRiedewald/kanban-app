import styled from 'styled-components/macro';
import { secondaryBg, shadowColor } from '../../constants';
import { useSelector } from 'react-redux';

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
    box-shadow: var(--shadow);
    transition: 0.3s ease-in-out;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 4px 6px 6px hsl(${shadowColor} / 0.1);
    }
`;

//=====================
// COMPONENTS
export const TaskCard = ({ task, ...props }) => {
    const allSubtasks = useSelector(state => state.data.subtasks);

    const prevSubtasks = allSubtasks.filter(subtask =>
        task.subtaskIds.includes(subtask.id)
    );
    const completedSubtasks = prevSubtasks.filter(subtask => subtask.completed);

    return (
        <Wrapper {...props}>
            <h3>{task.title}</h3>
            <strong style={{ color: 'var(--color-gray-600)' }}>
                {`${completedSubtasks?.length} of ${task.subtaskIds.length} subtasks`}
            </strong>
        </Wrapper>
    );
};

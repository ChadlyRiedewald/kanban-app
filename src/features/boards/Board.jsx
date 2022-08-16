import styled from 'styled-components/macro';
import { Column, ColumnTitle, NewColumn } from '../columns';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog } from '../../app/ui';
import { useParams } from 'react-router-dom';
import { EmptyBoard } from './EmptyBoard';
import { TaskCard } from '../tasks';

const Wrapper = styled.div`
    display: flex;
    gap: var(--space-md);
`;

export const Board = ({ children }) => {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const board = useSelector(state =>
        state.data.boards.find(i => i.id === boardId)
    );

    if (!board?.columns) return <EmptyBoard />;

    return (
        <Wrapper>
            {board.columns.map(column => (
                <Column key={column.title}>
                    <ColumnTitle
                        title={column.title}
                        color={`var(--color-${column.color})`}
                    />
                    {column.tasks.map(task => (
                        <TaskCard
                            key={task.title}
                            title={task.title}
                            num1='0'
                            num2={task.subtasks.length}
                        />
                    ))}
                </Column>
            ))}
            <NewColumn
                onClick={() =>
                    dispatch(openDialog({ dialogType: 'createNewBoard' }))
                }
            >
                <h1>+ New Column</h1>
            </NewColumn>
        </Wrapper>
    );
};

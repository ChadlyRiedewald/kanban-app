import styled from 'styled-components/macro';
import { Column, ColumnTitle, NewColumn } from '../columns';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog } from '../../app/ui';
import { TaskCard } from '../tasks';
import { NoColumns } from './NoColumns';

//=====================
// STYLED COMPONENTS
const Wrapper = styled.div`
    display: flex;
    gap: var(--space-md);
    height: 100%;
`;

//=====================
// COMPONENTS
export const Board = () => {
    const dispatch = useDispatch();
    const currentBoard = useSelector(state => state.data.selectedBoard);
    const allColumns = useSelector(state => state.data.columns);
    const allTasks = useSelector(state => state.data.tasks);

    return (
        <Wrapper>
            {currentBoard?.columnIds.length ? (
                <>
                    {allColumns
                        .filter(column =>
                            currentBoard?.columnIds.includes(column.id)
                        )
                        .map((column, index) => (
                            <Column key={index} columnId={column.id}>
                                <ColumnTitle
                                    title={column.title}
                                    color={column.color}
                                    tasks={column.taskIds.length}
                                />
                                {allTasks
                                    .filter(task =>
                                        column.taskIds.includes(task.id)
                                    )
                                    .map((task, index) => (
                                        <TaskCard
                                            key={index}
                                            task={task}
                                            onClick={() =>
                                                dispatch(
                                                    openDialog({
                                                        dialogType: 'openTask',
                                                        dialogProps: {
                                                            task: task,
                                                            columnId:
                                                                task.columnId,
                                                        },
                                                    })
                                                )
                                            }
                                        />
                                    ))}
                            </Column>
                        ))}
                    <NewColumn
                        onClick={() =>
                            dispatch(openDialog({ dialogType: 'addColumn' }))
                        }
                    >
                        <h1>+ New Column</h1>
                    </NewColumn>
                </>
            ) : (
                <NoColumns />
            )}
        </Wrapper>
    );
};

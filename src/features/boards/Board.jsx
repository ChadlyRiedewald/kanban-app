import styled from 'styled-components/macro';
import { Column, ColumnTitle, NewColumn } from '../columns';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog } from '../../app/ui';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NoColumns } from './NoColumns';
import { TaskCard } from '../tasks';
import { useEffect } from 'react';
import { setSelectedBoard } from './boardsSlice';

const Wrapper = styled.div`
    display: flex;
    gap: var(--space-md);
`;

export const Board = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { boardId } = useParams();
    const { boards } = useSelector(state => state.board);
    const currentBoard = useSelector(state => state.board.selectedBoard);

    useEffect(() => {
        if (location.pathname === '/dashboard') return;
        const currentBoard = boards.find(board => {
            return board.id === boardId;
        });

        if (currentBoard) {
            dispatch(setSelectedBoard(currentBoard));
        } else {
            boards.length
                ? navigate(`/dashboard/${boards[0].id}`)
                : navigate('/dashboard');
        }
    }, [boards, boardId, dispatch]);

    if (!currentBoard?.columns.length) return <NoColumns />;

    return (
        <Wrapper>
            {currentBoard.columns?.map((column, index) => (
                <Column key={index}>
                    <ColumnTitle
                        title={column.title}
                        color={`var(--color-purple-100)`}
                    />
                    {column.tasks?.map((task, index) => (
                        <TaskCard
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        dialogType: 'openTask',
                                        dialogProps: { task },
                                    })
                                )
                            }
                            key={index}
                            task={task}
                        />
                    ))}
                </Column>
            ))}
            <NewColumn
                onClick={() =>
                    dispatch(openDialog({ dialogType: 'updateBoard' }))
                }
            >
                <h1>+ New Column</h1>
            </NewColumn>
        </Wrapper>
    );
};

import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('boards/fetchData', async () => {
    try {
        const result = await axios.get('http://localhost:3001/boards');

        const mappedData = result.data.map(board => ({
            ...board,
            columnIds: board.columns.map(column => column.id),
            columns: board.columns.map(column => ({
                id: column.id,
                title: column.title,
                color: column.color,
                boardId: board.id,
                taskIds: column.tasks.map(task => task.id),
            })),
            tasks: board.columns.map(column => {
                return column.tasks.map(task => ({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    columnId: column.id,
                    subtaskIds: task.subtasks.map(subtask => subtask.id),
                }));
            }),
            subtasks: board.columns.map(column => {
                return column.tasks.map(task => {
                    return task.subtasks.map(subtask => ({
                        id: subtask.id,
                        title: subtask.title,
                        completed: subtask.completed,
                        taskId: task.id,
                    }));
                });
            }),
        }));

        const boards = mappedData.map(({ id, title, columnIds }) => ({
            id,
            title,
            columnIds,
        }));

        const columns = mappedData
            .reduce((prev, curr) => [...prev, curr.columns], [])
            .flat();

        const tasks = mappedData
            .reduce((prev, curr) => [...prev, curr.tasks], [])
            .flat(2);

        const subtasks = mappedData
            .reduce((prev, curr) => [...prev, curr.subtasks], [])
            .flat(3);

        return { boards, columns, tasks, subtasks };
    } catch (error) {
        console.log(error);
    }
});

/*

ADAPTERS

 */

const boardsAdapter = createEntityAdapter({
    selectId: board => board.id,
});

const columnsAdapter = createEntityAdapter({
    selectId: column => column.id,
});

const tasksAdapter = createEntityAdapter({
    selectId: task => task.id,
});

const subtasksAdapter = createEntityAdapter({
    selectId: subtask => subtask.id,
});

/*

SLICE

 */

const boardsSlice = createSlice({
    name: 'boards',
    initialState: boardsAdapter.getInitialState({
        selectedBoard: null,
        columns: columnsAdapter.getInitialState({
            tasks: tasksAdapter.getInitialState({
                subtasks: subtasksAdapter.getInitialState(),
            }),
        }),
    }),
    reducers: {
        createBoard: (state, { payload }) => {
            // Add Board
            boardsAdapter.addOne(state, {
                id: payload.id,
                title: payload.title,
                columnIds: payload.columns.map(({ id }) => id),
            });

            // Add Column(s)
            columnsAdapter.addMany(state.columns, payload.columns);
        },
        updateBoard: (state, { payload }) => {
            // Constants
            const prevBoard = boardsAdapter
                .getSelectors()
                .selectById(state, payload.boardId);
            const prevColumnIds = prevBoard.columnIds;
            const currColumnIds = payload.columns.map(column => column.id);
            const allTasks = tasksAdapter
                .getSelectors()
                .selectAll(state.columns.tasks);
            const allSubtasks = subtasksAdapter
                .getSelectors()
                .selectAll(state.columns.tasks.subtasks);

            // Update Board
            boardsAdapter.updateOne(state, {
                id: payload.boardId,
                changes: { title: payload.title, columnIds: currColumnIds },
            });

            // Update Column(s)
            columnsAdapter.updateMany(
                state.columns,
                payload.columns.map(column => ({
                    id: column.id,
                    changes: { title: column.title },
                }))
            );

            // Add Column(s)
            const columnsToAdd = payload.columns.filter(
                column => !prevColumnIds.includes(column.id)
            );

            columnsAdapter.addMany(
                state.columns,
                columnsToAdd.map(column => ({
                    id: column.id,
                    title: column.title,
                    color: 'purple',
                    boardId: payload.boardId,
                    taskIds: [],
                }))
            );

            // Remove Column(s)
            const columnsToDelete = prevColumnIds.filter(
                id => !currColumnIds.includes(id)
            );

            columnsAdapter.removeMany(state.columns, columnsToDelete);

            // Remove Task(s)
            const tasksToDelete = allTasks
                .filter(task => columnsToDelete.includes(task.columnId))
                .map(task => task.id);

            tasksAdapter.removeMany(state.columns.tasks, tasksToDelete);

            // Remove Subtask(s)
            const subtasksToDelete = allSubtasks
                .filter(subtask => tasksToDelete.includes(subtask.taskId))
                .map(subtask => subtask.id);

            subtasksAdapter.removeMany(
                state.columns.tasks.subtasks,
                subtasksToDelete
            );
        },
        deleteBoard: (state, { payload }) => {
            // Constants
            const allColumns = columnsAdapter
                .getSelectors()
                .selectAll(state.columns);
            const allTasks = tasksAdapter
                .getSelectors()
                .selectAll(state.columns.tasks);
            const allSubtasks = subtasksAdapter
                .getSelectors()
                .selectAll(state.columns.tasks.subtasks);

            // Remove Board
            boardsAdapter.removeOne(state, payload);

            // Remove Column(s)
            const columnsToDelete = allColumns
                .filter(column => column.boardId === payload)
                .map(column => column.id);

            columnsAdapter.removeMany(state.columns, columnsToDelete);

            // Remove Task(s)
            const tasksToDelete = allTasks
                .filter(task => columnsToDelete.includes(task.columnId))
                .map(task => task.id);

            tasksAdapter.removeMany(state.columns.tasks, tasksToDelete);

            // Remove Subtask(s)
            const subtasksToDelete = allSubtasks
                .filter(subtask => tasksToDelete.includes(subtask.taskId))
                .map(subtask => subtask.id);

            subtasksAdapter.removeMany(
                state.columns.tasks.subtasks,
                subtasksToDelete
            );
        },
        setSelectedBoard: (state, { payload }) => {
            state.selectedBoard = payload;
        },
        resetSelectedBoard: state => {
            state.selectedBoard = null;
        },
        createTask: (state, { payload }) => {
            // Constants
            const currColumn = columnsAdapter
                .getSelectors()
                .selectById(state.columns, payload.columnId);

            // Add Task
            tasksAdapter.addOne(state.columns.tasks, {
                id: payload.id,
                title: payload.title,
                description: payload.description,
                columnId: payload.columnId,
                subtaskIds: payload.subtasks.map(({ id }) => id),
            });

            // Add Task in Column taskIds
            columnsAdapter.updateOne(state.columns, {
                id: payload.columnId,
                changes: {
                    taskIds: [...currColumn.taskIds, payload.id],
                },
            });

            // Add Subtask(s)
            subtasksAdapter.addMany(
                state.columns.tasks.subtasks,
                payload.subtasks
            );
        },
        updateTask: (state, { payload }) => {
            const prevTask = tasksAdapter
                .getSelectors()
                .selectById(state.columns.tasks, payload.id);
            const prevColumn = columnsAdapter
                .getSelectors()
                .selectById(state.columns, prevTask.columnId);
            const currColumn = columnsAdapter
                .getSelectors()
                .selectById(state.columns, payload.columnId);
            const prevSubtaskIds = prevTask.subtaskIds;
            const currSubtasks = payload.subtasks;
            const currSubtaskIds = currSubtasks.map(({ id }) => id);

            // Update Task
            tasksAdapter.updateOne(state.columns.tasks, {
                id: payload.id,
                changes: {
                    title: payload.title,
                    description: payload.description,
                    columnId: payload.columnId,
                    subtaskIds: currSubtaskIds,
                },
            });

            // Update Column(s)
            const prevColumnTaskIds = prevColumn.taskIds.filter(
                id => id !== payload.id
            );
            const currColumnTaskIds = [
                ...currColumn.taskIds.filter(id => id !== payload.id),
                payload.id,
            ];

            // Remove taskId in prevColumn
            columnsAdapter.updateOne(state.columns, {
                id: prevTask.columnId,
                changes: {
                    taskIds: prevColumnTaskIds,
                },
            });

            //Add taskId in currColumn
            columnsAdapter.updateOne(state.columns, {
                id: payload.columnId,
                changes: {
                    taskIds: currColumnTaskIds,
                },
            });

            // Add Subtask(s)
            const subtasksToAdd = currSubtasks.filter(
                subtask => !prevSubtaskIds.includes(subtask.id)
            );

            subtasksAdapter.addMany(
                state.columns.tasks.subtasks,
                subtasksToAdd
            );

            // Update Subtask(s)
            subtasksAdapter.updateMany(
                state.columns.tasks.subtasks,
                payload.subtasks.map(subtask => ({
                    id: subtask.id,
                    changes: {
                        title: subtask.title,
                    },
                }))
            );

            // Delete Subtask(s)
            const subtasksToDelete = prevSubtaskIds.filter(
                id => !currSubtaskIds.includes(id)
            );

            subtasksAdapter.removeMany(
                state.columns.tasks.subtasks,
                subtasksToDelete
            );
        },
        updateTaskColumn: (state, { payload }) => {
            // Constants
            const prevColumn = columnsAdapter
                .getSelectors()
                .selectById(state.columns, payload.prevColumnId);
            const currColumn = columnsAdapter
                .getSelectors()
                .selectById(state.columns, payload.currColumnId);

            // Update Task
            tasksAdapter.updateOne(state.columns.tasks, {
                id: payload.id,
                changes: {
                    columnId: payload.currColumnId,
                },
            });

            // Update Column(s)
            columnsAdapter.updateOne(state.columns, {
                id: payload.prevColumnId,
                changes: {
                    taskIds: [
                        ...prevColumn.taskIds.filter(id => id !== payload.id),
                    ],
                },
            });

            columnsAdapter.updateOne(state.columns, {
                id: payload.currColumnId,
                changes: {
                    taskIds: [...currColumn.taskIds, payload.id],
                },
            });
        },
        deleteTask: (state, { payload }) => {
            // Constants
            const currColumn = columnsAdapter
                .getSelectors()
                .selectById(state.columns, payload.columnId);

            // Delete Task
            tasksAdapter.removeOne(state.columns.tasks, payload.id);

            // Delete Task Id from Column taskIds
            columnsAdapter.updateOne(state.columns, {
                id: payload.columnId,
                changes: {
                    taskIds: currColumn.taskIds.filter(id => id !== payload.id),
                },
            });

            // Delete Subtasks
            subtasksAdapter.removeMany(
                state.columns.tasks.subtasks,
                payload.subtaskIds
            );
        },
        toggleSubtask: (state, { payload }) => {
            const prevSubtask = subtasksAdapter
                .getSelectors()
                .selectById(state.columns.tasks.subtasks, payload);

            subtasksAdapter.updateOne(state.columns.tasks.subtasks, {
                id: payload,
                changes: {
                    completed: !prevSubtask.completed,
                },
            });
        },
    },
    extraReducers: {
        [fetchData.pending]: state => {},
        [fetchData.fulfilled]: (state, { payload }) => {
            boardsAdapter.setAll(state, payload.boards);
            columnsAdapter.setAll(state.columns, payload.columns);
            tasksAdapter.setAll(state.columns.tasks, payload.tasks);
            subtasksAdapter.setAll(
                state.columns.tasks.subtasks,
                payload.subtasks
            );
        },
        [fetchData.rejected]: (state, { payload }) => {
            console.log(payload);
        },
    },
});

/*

SELECTORS

 */

export const boardsSelectors = boardsAdapter.getSelectors(
    state => state.boards
);

export const columnsSelectors = columnsAdapter.getSelectors(
    state => state.boards.columns
);

export const tasksSelectors = tasksAdapter.getSelectors(
    state => state.boards.columns.tasks
);

export const subtasksSelectors = subtasksAdapter.getSelectors(
    state => state.boards.columns.tasks.subtasks
);

/*

EXPORTS

 */

export const {
    createBoard,
    updateBoard,
    deleteBoard,
    setSelectedBoard,
    resetSelectedBoard,
    createTask,
    updateTask,
    updateTaskColumn,
    deleteTask,
    toggleSubtask,
} = boardsSlice.actions;

export default boardsSlice.reducer;

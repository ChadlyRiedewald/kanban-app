import { createSlice } from '@reduxjs/toolkit';
import { sampleData } from './sampleData';

const initialState = {
    boards: sampleData,
    selectedBoard: null,
};

export const boardsSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        createBoard: (state, action) => {
            state.boards.push(action.payload);
        },
        updateBoard: (state, action) => {
            const index = state.boards.findIndex(
                board => board.id === action.payload.id
            );
            state.boards[index] = action.payload;
        },
        deleteBoard: (state, action) => {
            state.boards = [
                ...state.boards.filter(board => board.id !== action.payload.id),
            ];
        },
        setSelectedBoard: (state, action) => {
            state.selectedBoard = action.payload;
        },
        resetSelectedBoard: state => {
            state.selectedBoard = null;
        },
        createTask: (state, action) => {
            const boardIndex = state.boards.findIndex(
                board => board.id === action.payload.boardId
            );

            const columnIndex = state.boards[boardIndex].columns.findIndex(
                column => column.title === action.payload.column
            );

            state.boards[boardIndex].columns[columnIndex].tasks.push({
                ...action.payload,
            });
        },
        updateTask: (state, action) => {
            const boardIndex = state.boards.findIndex(
                board => board.id === action.payload.boardId
            );

            const columnIndex = state.boards[boardIndex].columns.findIndex(
                column => column.title === action.payload.column
            );

            const taskIndex = state.boards[boardIndex].columns[
                columnIndex
            ].tasks.findIndex(task => task.taskId === action.payload.taskId);

            state.boards[boardIndex].columns[columnIndex].tasks[taskIndex] = {
                subtasks: action.payload.subtasks,
                column: action.payload.column,
            };
        },
        deleteTask: (state, action) => {},
        toggleSubtask: (state, action) => {
            const boardIndex = state.boards.findIndex(
                board => board.id === action.payload.boardId
            );

            const columnIndex = state.boards[boardIndex].columns.findIndex(
                column => column.title === action.payload.column
            );

            const taskIndex = state.boards[boardIndex].columns[
                columnIndex
            ].tasks.findIndex(task => task.taskId === action.payload.taskId);

            const subtaskIndex = state.boards[boardIndex].columns[
                columnIndex
            ].tasks[taskIndex].subtasks.findIndex(
                subtask => subtask.subtaskId === action.payload.subtaskId
            );

            // state.boards[boardIndex].column[columnIndex].tasks[
            //     taskIndex
            // ].subtasks[subtaskIndex] = {
            //     ...state.boards[boardIndex].column[columnIndex].tasks[taskIndex]
            //         .subtasks[subtaskIndex],
            //     completed: action.payload.completed,
            // };
        },
    },
});

export const {
    createBoard,
    updateBoard,
    deleteBoard,
    setSelectedBoard,
    resetSelectedBoard,
    createTask,
    updateTask,
    deleteTask,
    toggleSubtask,
} = boardsSlice.actions;

export default boardsSlice.reducer;

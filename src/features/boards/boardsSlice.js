import { createSlice, nanoid } from '@reduxjs/toolkit';
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
            state.boards.push({
                id: nanoid(),
                title: action.payload.title,
                columns: action.payload.columns.map(column => {
                    return {
                        title: column.title,
                        color: 1,
                    };
                }),
            });
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

            console.log(boardIndex, columnIndex);

            state.boards[boardIndex].columns[columnIndex].tasks?.push({
                title: action.payload.title,
                description: action.payload.description,
                column: action.payload.column,
                subtasks: action.payload.subtasks,
            });
        },
        updateTask: (state, action) => {},
        deleteTask: (state, action) => {},
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
} = boardsSlice.actions;

export default boardsSlice.reducer;

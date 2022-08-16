import { createSlice } from '@reduxjs/toolkit';
import { sampleData } from './sampleData';

export const boardsSlice = createSlice({
    name: 'boards',
    initialState: {
        boards: sampleData,
    },
    reducers: {
        createBoard: (state, action) => {
            state.data = [...state.data, action.payload];
        },
        updateBoard: (state, action) => {
            state.data = [
                ...state.data.filter(board => board.id !== action.payload.id),
                action.payload,
            ];
        },
        deleteBoard: (state, action) => {
            state.data = [
                ...state.data.filter(board => board.id !== action.payload.id),
            ];
        },
    },
});

export const { createBoard, updateBoard, deleteBoard } = boardsSlice.actions;

export default boardsSlice.reducer;

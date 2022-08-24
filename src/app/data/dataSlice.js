import { createSlice } from '@reduxjs/toolkit';

//=====================
// INITIAL STATE
const initialState = {
    selectedBoard: null,
    boards: [],
    columns: [],
    tasks: [],
    subtasks: [],
};

//=====================
// SLICE
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSelectedBoard: (state, { payload }) => {
            state.selectedBoard = { ...payload };
        },
        resetSelectedBoard: state => {
            state.selectedBoard = null;
        },
        fetchBoards: (state, { payload }) => {
            state.boards = payload;
        },
        fetchColumns: (state, { payload }) => {
            state.columns = payload;
        },
        fetchTasks: (state, { payload }) => {
            state.tasks = payload;
        },
        fetchSubtasks: (state, { payload }) => {
            state.subtasks = payload;
        },
    },
});

//=====================
// ACTIONS / EXPORTS
export const {
    setSelectedBoard,
    resetSelectedBoard,
    fetchBoards,
    fetchColumns,
    fetchTasks,
    fetchSubtasks,
} = dataSlice.actions;

export default dataSlice.reducer;

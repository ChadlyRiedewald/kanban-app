import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        open: true,
    },
    reducers: {
        toggleOpen: (state, action) => {
            state.open = action.payload;
            state.open
                ? document.documentElement.style.setProperty(
                      '--width-sidebar',
                      '300px'
                  )
                : document.documentElement.style.setProperty(
                      '--width-sidebar',
                      '0px'
                  );
        },
    },
});

export const { toggleOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;

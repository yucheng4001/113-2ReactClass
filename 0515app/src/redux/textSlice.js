import { createSlice } from '@reduxjs/toolkit';

export const textSlice = createSlice({
  name: 'text',
  initialState: { value: '你沒輸入東西啊' },
  reducers: {
    updateText: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { updateText } = textSlice.actions;
export default textSlice.reducer;

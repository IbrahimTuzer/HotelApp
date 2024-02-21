import { createSlice } from "@reduxjs/toolkit";

export const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    reservations: [],
  },
  reducers: {
    addReservation: (state, action) => {
      state.reservations.push(action.payload);
    },
  },
});

export const { addReservation } = reservationSlice.actions;

export default reservationSlice.reducer;

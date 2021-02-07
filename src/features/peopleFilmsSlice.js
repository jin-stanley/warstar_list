import { createSlice } from '@reduxjs/toolkit';

// state
export const peopleFilmsSlice = createSlice({
  name: 'peopleFilms',
  initialState: {
    peopleFilms: [],
    loading: false,
    error: false
  },
  reducers: {
    fetchPeopleFilms: (state, action) => {
      state.peopleFilms = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchPeopleFilmsLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchPeopleFilmsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const fetchPeopleFilmsAsync = (urls) => (dispatch) => {
  const fetchArray = urls.map((url) => fetch(url));
  dispatch(fetchPeopleFilmsLoading());
  Promise.all(fetchArray)
    .then((res) => {
      return Promise.all(res.map((r) => r.json()));
    })
    .then((response) => {
      dispatch(fetchPeopleFilms(response));
    })
    .catch((error) => {
      dispatch(fetchPeopleFilmsError(error));
    });
};

// actions
export const {
  fetchPeopleFilms,
  fetchPeopleFilmsLoading,
  fetchPeopleFilmsError
} = peopleFilmsSlice.actions;

// selectors
export const selectPeopleFilms = (state) => state.peopleFilms.peopleFilms;
export const selectPeopleFilmsLoading = (state) => state.peopleFilms.loading;
export const selectPeopleFilmsError = (state) => state.peopleFilms.error;

// reducer export
export default peopleFilmsSlice.reducer;

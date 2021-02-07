import { createSlice } from '@reduxjs/toolkit';

const splitAtSearch = (str, afterTarget) => {
  return str.split(afterTarget)[1];
};

// state
export const peopleListSlice = createSlice({
  name: 'peopleList',
  initialState: {
    peopleList: [],
    totalCount: 0,
    countPerPage: 10,
    currentPage: null,
    loading: false,
    error: false
  },
  reducers: {
    fetchPeopleList: (state, action) => {
      const currentPage =
        action.payload.next === null
          ? Math.ceil(action.payload.count / state.countPerPage)
          : +splitAtSearch(action.payload.next, 'page=') - 1;

      state.peopleList = action.payload.results;
      state.totalCount = action.payload.count;
      state.currentPage = currentPage;
      state.loading = false;
      state.error = false;
    },
    fetchPeopleListLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchPeopleListError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

// methods
export const fetchPeopleListAsync = (pageNumber = 1) => (dispatch) => {
  // console.log(pageNumber);
  dispatch(fetchPeopleListLoading());
  fetch(`https://swapi.dev/api/people/?page=${pageNumber}`)
    .then((res) => res.json())
    .then((response) => {
      dispatch(fetchPeopleList(response));
    })
    .catch((error) => {
      dispatch(fetchPeopleListError(error));
    });
};

// actions
export const {
  fetchPeopleList,
  fetchPeopleListLoading,
  fetchPeopleListError
} = peopleListSlice.actions;

// selectors
export const selectPeopleList = (state) => state.peopleList.peopleList;
export const selectPeopleListCount = (state) => state.peopleList.totalCount;
export const selectPeopleListLoading = (state) => state.peopleList.loading;
export const selectPeopleListError = (state) => state.peopleList.error;
export const selectCurrentPage = (state) => state.peopleList.currentPage;
export const selectCountPerPage = (state) => state.peopleList.countPerPage;

// reducer export
export default peopleListSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import peopleListReducer from '../features/peopleListSlice';
import peopleFilmsReducer from '../features/peopleFilmsSlice';

export default configureStore({
  reducer: {
    peopleList: peopleListReducer,
    peopleFilms: peopleFilmsReducer
  }
});

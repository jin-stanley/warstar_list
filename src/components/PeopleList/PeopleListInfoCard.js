import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPeopleFilms,
  selectPeopleFilmsLoading,
  fetchPeopleFilmsAsync
} from '../../features/peopleFilmsSlice';

import '../../style/components/PeopleList/PeopleListInfoCard.scss';

const PeopleListInfoCard = ({ data }) => {
  const dispatch = useDispatch();

  const peopleFilms = useSelector(selectPeopleFilms);
  const peopleFilmsLoading = useSelector(selectPeopleFilmsLoading);

  useEffect(() => {
    dispatch(fetchPeopleFilmsAsync(data.films));
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  //   console.log('peopleFilms', peopleFilms);
  //   console.log('peopleFilmsLoading', peopleFilmsLoading);
  //   console.log('peopleFilmsError', peopleFilmsError);

  return (
    <div className='info-card'>
      <div className='text-bolder'>
        <div className='text-bolder'>Name:</div>
        <span>{data.name}</span>
      </div>

      <br />

      <div className='text-bolder'>
        <div className='text-bolder'>Eye Color:</div>
        <span>{data.eye_color}</span>
      </div>

      <br />

      <div className='text-bolder'>
        <div className='text-bolder'>Hair Color:</div>
        <span>{data.hair_color}</span>
      </div>

      <br />

      <div className='text-bolder'>
        <div className='text-bolder'>Skin Color:</div>
        <span>{data.skin_color}</span>
      </div>

      <br />

      <div className='text-bolder'>
        <div className='text-bolder'>Gender:</div>
        <span>{data.gender}</span>
      </div>

      <br />

      <div className='text-bolder'>
        <div className='text-bolder'>Mass:</div>
        <span>{data.mass}</span>
      </div>

      <br />

      <div className='text-bolder'>
        <div className='text-bolder'>Films:</div>
        {peopleFilmsLoading ? (
          <div>Loading...</div>
        ) : (
          peopleFilms.map((film) => {
            return <div key={film.episode_id}>{film.title}</div>;
          })
        )}
      </div>
    </div>
  );
};

export default PeopleListInfoCard;

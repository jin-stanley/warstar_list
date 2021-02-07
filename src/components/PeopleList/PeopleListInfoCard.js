import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPeopleFilms,
  selectPeopleFilmsLoading,
  fetchPeopleFilmsAsync
} from '../../features/peopleFilmsSlice';

import { List, Icon, Divider, Loader } from 'semantic-ui-react';
import '../../style/components/PeopleList/PeopleListInfoCard.scss';

const PeopleListInfoCard = ({ data, onClose }) => {
  const dispatch = useDispatch();

  const peopleFilms = useSelector(selectPeopleFilms);
  const peopleFilmsLoading = useSelector(selectPeopleFilmsLoading);

  useEffect(() => {
    dispatch(fetchPeopleFilmsAsync(data.films));
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='info-card flex flex-col border-l-2 border-gray-100'>
      <img
        src='https://i.pinimg.com/originals/54/16/fb/5416fb0782218fb854aed8a923088a17.png'
        alt='avator'
      />

      <div onClick={() => onClose(null)}>
        <Icon
          className='absolute top-3 right-3 cursor-pointer'
          disabled
          name='close'
          color='yellow'
          size='large'
        />
      </div>

      <div className='p-8 flex-grow overflow-auto'>
        <div className='pb-4'>
          <Divider horizontal>Name</Divider>
          <div className='text-center font-black text-2xl'>{data.name}</div>
        </div>

        <div className='pb-4'>
          <Divider horizontal>Gender</Divider>
          <div className='text-center font-black text-2xl uppercase'>
            {data.gender}
          </div>
        </div>

        <div className='pb-4'>
          <Divider horizontal>Height</Divider>
          <div className='text-center font-black text-2xl uppercase'>
            {data.height}
          </div>
        </div>

        <div className='pb-4'>
          <Divider horizontal>Eye Color</Divider>
          <div className='text-center font-black text-2xl uppercase'>
            {data.eye_color}
          </div>
        </div>

        <div className='pb-4'>
          <Divider horizontal>Hair Color</Divider>
          <div className='text-center font-black text-2xl uppercase'>
            {data.hair_color}
          </div>
        </div>

        <div className='pb-4'>
          <Divider horizontal>Skin Color</Divider>
          <div className='text-center font-black text-2xl uppercase'>
            {data.skin_color}
          </div>
        </div>

        <div className='pb-4'>
          <Divider horizontal>Mass</Divider>
          <div className='text-center font-black text-2xl uppercase'>
            {data.mass}
          </div>
        </div>

        <div className='pb-4'>
          <Divider horizontal>Films</Divider>
          <List>
            {peopleFilmsLoading ? (
              <Loader active inline='centered' />
            ) : (
              peopleFilms.map((film) => {
                return (
                  <List.Item
                    className='text-center uppercase '
                    value='*'
                    key={film.episode_id}
                  >
                    {film.title}
                  </List.Item>
                );
              })
            )}
          </List>
        </div>
      </div>
    </div>
  );
};

export default PeopleListInfoCard;

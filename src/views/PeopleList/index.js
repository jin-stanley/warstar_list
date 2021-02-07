import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPeopleList,
  selectPeopleListLoading,
  selectPeopleListError,
  selectPeopleListCount,
  selectCurrentPage,
  selectCountPerPage,
  fetchPeopleListAsync
} from '../../features/peopleListSlice';

import '../../style/views/PeopleList.scss';

import { Dimmer, Loader } from 'semantic-ui-react';
import PeopleListTable from '../../components/PeopleList/PeopleListTable';
import PeopleListPagination from '../../components/PeopleList/PeopleListPagination';
import PeopleListInfoCard from '../../components/PeopleList/PeopleListInfoCard';

const PeopleList = () => {
  const dispatch = useDispatch();

  const TABLE_COLUMNS = [
    'Name',
    'Created',
    'Edited',
    'Gender',
    'Height',
    'Mass',
    'Films'
  ];
  const peopleList = useSelector(selectPeopleList);
  const peopleListCount = useSelector(selectPeopleListCount);
  const peopleListLoading = useSelector(selectPeopleListLoading);
  const peopleListError = useSelector(selectPeopleListError);
  const currentPage = useSelector(selectCurrentPage);
  const countPerPage = useSelector(selectCountPerPage);

  // First call for fetch peopleList
  useEffect(() => {
    dispatch(fetchPeopleListAsync());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [selectedPeople, setSelectedPeople] = useState(null);

  // Change page method
  const handleChangeActivePage = (pageNumber) => {
    setSelectedPeople(null)
    dispatch(fetchPeopleListAsync(pageNumber));
  };

  if (peopleListLoading) {
    return (
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
    );
  }

  if (peopleListError) {
    return <div>Error...</div>;
  }

  return (
    <div className='people-list'>
      <div className='people-list__table'>
        <PeopleListTable
          header={TABLE_COLUMNS}
          content={peopleList}
          selected={selectedPeople}
          setSelected={setSelectedPeople}
        />
        <PeopleListPagination
          currentPage={currentPage}
          count={peopleListCount}
          countPerPage={countPerPage}
          setActivePage={handleChangeActivePage}
        />
      </div>

      {selectedPeople && (
        <PeopleListInfoCard data={selectedPeople} onClose={setSelectedPeople} />
      )}
    </div>
  );
};

export default PeopleList;

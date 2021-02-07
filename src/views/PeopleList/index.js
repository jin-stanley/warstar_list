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

import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import PeopleListTable from '../../components/PeopleList/PeopleListTable';
import PeopleListPagination from '../../components/PeopleList/PeopleListPagination';
import PeopleListInfoCard from '../../components/PeopleList/PeopleListInfoCard';

const PeopleList = () => {
  const dispatch = useDispatch();

  const TABLE_COLUMNS = ['Name', 'Height', 'Mass'];
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
    return dispatch(fetchPeopleListAsync(pageNumber));
  };

  if (peopleListLoading) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader size='large'>Loading</Loader>
        </Dimmer>

        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Segment>
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

      {selectedPeople && <PeopleListInfoCard data={selectedPeople} />}
    </div>
  );
};

export default PeopleList;

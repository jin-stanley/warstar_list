import React from 'react';
import { Pagination } from 'semantic-ui-react';

const PeopleList = ({ currentPage, count, countPerPage, setActivePage }) => {
  const handleChangePage = (e, data) => {
    setActivePage(data.activePage);
  };

  return (
    <div className='flex justify-end p-4 border-t-2 border-gray-100'>
      <Pagination
        onPageChange={handleChangePage}
        activePage={currentPage}
        siblingRange={1}
        totalPages={countPerPage && Math.ceil(count / countPerPage)}
      />
    </div>
  );
};

export default PeopleList;

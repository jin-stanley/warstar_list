import React from 'react';
import { Pagination } from 'semantic-ui-react';

const PeopleList = ({ currentPage, count, countPerPage, setActivePage }) => {
  const handleChangePage = (e, data) => {
    setActivePage(data.activePage);
  };

  return (
    <div>
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

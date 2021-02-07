import React from 'react';
import moment from 'moment';

import '../../style/components/PeopleList/PeopleListTable.scss';

import { Table } from 'semantic-ui-react';

const PeopleListTable = ({ header, content, selected, setSelected }) => {
  const [activePeople, setActivePeople] = React.useState(null);

  const handleMouseEnter = (_, data) => {
    setActivePeople(data);
  };

  const handleMouseOut = () => {
    setActivePeople(null);
  };

  const handleSelected = (_, data) => {
    setSelected(data);
  };

  return (
    <div className='list-table flex-grow'>
      <Table celled className='list-table__table'>
        <Table.Header>
          <Table.Row>
            {header.map((column, key) => (
              <Table.HeaderCell key={`header_${key}`}>
                {column}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {content.map((data, key) => {
            return (
              <Table.Row
                positive={selected === data}
                active={activePeople === data}
                key={`content_${key}`}
                onMouseEnter={(e) => handleMouseEnter(e, data)}
                onMouseOut={handleMouseOut}
                onClick={(e) => handleSelected(e, data)}
              >
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell>
                  {moment(data.created).format('YYYY-MM-DD')}
                </Table.Cell>
                <Table.Cell>
                  {moment(data.edited).format('YYYY-MM-DD')}
                </Table.Cell>
                <Table.Cell>{data.gender}</Table.Cell>
                <Table.Cell>{data.height}</Table.Cell>
                <Table.Cell>{data.mass}</Table.Cell>
                <Table.Cell>{data.films.length}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PeopleListTable;

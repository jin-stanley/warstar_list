import React from 'react';
import { Table } from 'semantic-ui-react';

import '../../style/components/PeopleList/PeopleListTable.scss';

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
    <div className='list-table'>
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
                <Table.Cell>{data.height}</Table.Cell>
                <Table.Cell>{data.mass}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PeopleListTable;

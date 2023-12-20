/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import styled from 'styled-components';
const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
    gotoPage
  } = useTable({ columns, data, initialState: { pageSize: 8 } }, useSortBy, usePagination);

  return (
    <Styles>
      <div className="tabh">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted && (
                      <span style={{ marginLeft: '5px' }}>
                        {!column.isSortedDesc ? ' ⬆️ ' : ' ⬇️ '}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="ContainerButton">
          <button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>
            First
          </button>
          <button disabled={!canPreviousPage} onClick={previousPage}>
            Prev
          </button>

          <span style={{ fontFamily: 'Arial' }}>
            {pageIndex + 1} of {pageCount}
          </span>
          <button disabled={!canNextPage} onClick={nextPage}>
            Next
          </button>

          <button disabled={pageIndex >= pageCount - 1} onClick={() => gotoPage(pageCount - 1)}>
            Last
          </button>
        </div>
      </div>
    </Styles>
  );
};
const Styles = styled.div`
  overflow-x: auto;
  margin: 20px;

  table {
    width: 100%;
    border-spacing: 0;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 5px;

    th,
    td {
      padding: 12px;
      padding-left: 15px;
      text-align: left;
      font-family: 'Arial';
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f5f5f5;
      font-family: 'Arial';
      color: black;
      font-weight: 600;
    }

    tbody tr:hover {
      background-color: #f5f5f5;
    }
  }

  .ContainerButton {
    margin: auto;
    width: 27rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
  }

  .ContainerButton button {
    border: none;
    padding: 0.5rem 1rem;
    background-color: #0d6efd;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }

  .ContainerButton button:disabled {
    cursor: not-allowed;
    background-color: rgb(229, 229, 229);
    color: rgba(0, 0, 0, 0.267);
  }

  @media only screen and (max-width: 1025px) {
    table {
      width: 100%;

      td {
        padding: 1px;
        padding-left: 12px;
      }
    }
  }

  @media only screen and (max-width: 898px) {
    .ContainerButton button {
      font-size: 12px;
    }
    .ContainerButton span {
      font-size: 12px;
    }
    table {
      font-size: 12px;
    }
    .ContainerButton {
      flex-direction: row;
      width: 90%;
      gap: 0.5rem;
    }
  }
  @media only screen and (max-width: 427px) {
    .ContainerButton {
      flex-direction: column;
    }
    .ContainerButton button {
      font-size: 10px;
    }
    .ContainerButton span {
      font-size: 10px;
    }
    table {
      font-size: 5px;
      padding: 0px;
    }

    .tabh {
      display: flex;
      flex-direction: column;
      width: 75vw;
      height: 100%;
    }
  }

  @media only screen and (max-width: 769px) {
    .ContainerButton {
      padding-top: 5px;
    }
  }
`;

export default Table;

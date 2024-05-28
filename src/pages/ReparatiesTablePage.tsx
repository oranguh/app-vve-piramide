import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useFilters, useSortBy, usePagination, ColumnInstance } from 'react-table';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import './TablePage.css';

// Define a default UI for filtering
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}: {
  column: ColumnInstance
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

const ReparatiesTablePage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/datasets/klein_onderhoud_gekoppeld_met_verzoek.xlsx');
      const blob = await response.blob();
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Convert the JSON data into an array of objects
        const headers = jsonData[0];
        const rows = jsonData.slice(1).map((row: any) => {
          const rowData: any = {};
          headers.forEach((header: string, index: number) => {
            rowData[header] = row[index];
          });
          return rowData;
        });

        setData(rows.filter(row => Object.values(row).some(value => value !== null && value !== '')));
      };

      fileReader.readAsArrayBuffer(blob);
    };

    fetchData();
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: 'Verzoeknummer',
        accessor: 'Verzoeknummer',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Datum',
        accessor: 'Datum',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Debet',
        accessor: 'Debet',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'tag',
        accessor: 'tag',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Opdracht',
        accessor: 'Opdracht',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'appartement_simple_list',
        accessor: 'appartement_simple_list',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Omschrijving',
        accessor: 'Omschrijving',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Opdracht/contract gegevens',
        accessor: 'Opdracht/contract gegevens',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Omschrijving_reparatie',
        accessor: 'Omschrijving_reparatie',
        Filter: DefaultColumnFilter,
      },
    ],
    []
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of using 'rows', use 'page' for paginated data
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, defaultColumn, initialState: { pageIndex: 0, pageSize: 10 } },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div>
      <h1>Appartementen VvE de Piramide</h1>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Back to Landing Page</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default ReparatiesTablePage;

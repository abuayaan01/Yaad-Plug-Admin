import React from "react";
import {
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
} from "react-table";
import Search from "../../dashboard/search/search";
import AddUser from "../add-users-modal/add-users-modal";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

function UserTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    state,
    setGlobalFilter,
    pageOptions,
    gotoPage,
    setPageSize,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  return (
    <div className="flex-1 bg-[#1B2537] rounded p-4">
      <div className="toolbar">
        <Search
          placeholder={"Search user..."}
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        {/* <button className="bg-blue-400 rounded px-8 py-2">Add rider</button> */}
        {/* <div className=" rounded px-8 py-2">
          <AddUser />
        </div> */}
      </div>
      <table {...getTableProps()} style={{ width: "100%" }}>
        <thead>
          {headerGroups.map((headerGroup, index) => {
            const { key, restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column, columnIndex) => {
                  const { key, restCoumnHeaderProps } = column.getHeaderProps();
                  return (
                    <th
                      className="text-slate-100 font-semibold text-xs text-center py-2"
                      key={key}
                      {...restCoumnHeaderProps}
                      {...(column.id === "actions"
                        ? {}
                        : column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.id !== "actions" && (
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              " ↓"
                            ) : (
                              " ↑"
                            )
                          ) : (
                            <span className="text-slate-500"> ↓↑</span>
                          )}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr
                className="border-b-[1px] border-slate-900 text-slate-300"
                {...restRowProps}
                key={key}
              >
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td
                      className="py-4 text-center text-xs"
                      {...restCellProps}
                      key={key}
                    >
                      {cell.value ? cell.render("Cell") : "Not Available"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-3 flex justify-start items-center py-4">
        <button
          className=" text-white font-bold ml-2 "
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <FaCaretLeft className="text-2xl" />
        </button>{" "}
        <button
          className="  text-white font-bold ml-2"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <FaCaretRight className="text-2xl" />
        </button>
        <span className="ml-5 border-slate-300 rounded border-[1px] p-1">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span className="ml-5">
          Go to page:{" "}
          <input
            className="text-slate-300 ml-1 py-1 pl-4 border border-slate-300 bg-transparent rounded"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          className="ml-5 text-slate-300 border-[1px] border-slate-300 p-1 rounded bg-transparent"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20].map((size) => (
            <option key={size} value={size}>
              Rows per page {size}
            </option>
          ))}{" "}
        </select>
      </div>
    </div>
  );
}

export default UserTable;

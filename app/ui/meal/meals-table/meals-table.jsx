"use client";
import React, { useState, useEffect } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { getAllMeals } from "@/service/api";
import Search from "../../dashboard/search/search";
import Image from "next/image";
import pizza from "../../../../public/images/dish.png";
import PageLoader from "../../dashboard/page-loader/page-loader";
import StatusRadio from "../status-radio/status-radio";
import { useRouter } from "next/navigation";
import { showSessionExpiredToast } from "@/service/utils/sessionExpiredToast";
import { useAuth } from "@/service/utils/authContext";

function MealsTable() {
  const [meals, setMeals] = useState([]);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { handleUnauthorizedAccess } = useAuth();

  useEffect(() => {
    getMealsListReq();
  }, []);

  const getMealsListReq = () => {
    setloading(true);
    getAllMeals()
      .then((res) => {
        setMeals(res.data);
        setloading(false);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          showSessionExpiredToast();
          handleUnauthorizedAccess();
        } else {
          console.log(err);
        }
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Image",
        accessor: "imageUrl",
        disableSortBy: true,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Restaurant",
        accessor: "Restaurant.name",
        Cell: ({ value }) => (value ? value : "Not Available"),
      },
      {
        Header: "Category",
        accessor: "Category.name",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value, row }) => (
          <div className="flex justify-center items-center">
            <StatusRadio readOnly={true} value={value} />
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data: meals }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="flex-1 bg-[#1B2537] rounded p-4">
          <div className="toolbar">
            <Search
              placeholder={"Search meal..."}
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            {/* <button
              onClick={() => {
                router.push("add-meal");
              }}
              className="bg-sky-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Meal
            </button> */}
          </div>
          <table {...getTableProps()} style={{ width: "100%" }}>
            <thead>
              {headerGroups.map((headerGroup, index) => {
                const { key, restHeaderGroupProps } =
                  headerGroup.getHeaderGroupProps();
                return (
                  <tr key={key} {...restHeaderGroupProps}>
                    {headerGroup.headers.map((column, columnIndex) => {
                      const { key, restCoumnHeaderProps } =
                        column.getHeaderProps();
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
              {rows.map((row) => {
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
                          {cell.column.id == "imageUrl" ? (
                            <div className="flex items-center justify-center">
                              <Image
                                src={cell.value ? cell.value : pizza}
                                alt={`${row.original.name}`}
                                className="w-10 h-10 rounded-full object-cover"
                                width={20}
                                height={20}
                              />
                            </div>
                          ) : (
                            cell.render("Cell")
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MealsTable;

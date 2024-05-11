"use client";
import React, { useState, useEffect } from "react";
import PageLoader from "@/app/ui/dashboard/page-loader/page-loader";
import UserTable from "@/app/ui/users/users-table/users-table";
import { getUserList } from "@/service/api";
import { showSessionExpiredToast } from "@/service/utils/sessionExpiredToast";
import { useAuth } from "@/service/utils/authContext";

function Page() {
  const [usersList, setusersList] = useState([]);
  const [loading, setloading] = useState(false);
  const [btnLoader, setbtnLoader] = useState(false);
  const [actionIdx, setactionIdx] = useState();
  const { handleUnauthorizedAccess } = useAuth();

  useEffect(() => {
    getUserListReq();
  }, []);

  function getUserListReq() {
    setloading(true);
    getUserList()
      .then((res) => {
        setusersList(res);
        setloading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          showSessionExpiredToast();
          handleUnauthorizedAccess();
        }
        else {
          console.log(err);
        }
      });
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Local Address",
        accessor: "localAddress",
      },
      {
        Header: "Last Order",
        accessor: "lastOrder",
      },
      {
        Header: "Total Orders",
        accessor: "totalOrders",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        // <UserTable />
        <UserTable columns={columns} data={usersList} />
      )}
    </div>
  );
}

export default Page;

import React, { useEffect, useState } from "react";
import AuthUser from "../../api/axios";
import { confirmDelete, showSuccessMessage } from "../../utils/swalUtils";
import { Link } from "react-router-dom";
import TableDataLoader from "../../utils/TableDataLoader";

const BankAccountInfo = () => {
  const [accounts, setAccounts] = useState([]);
  const { http } = AuthUser();
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});

  /* Getting data from database ::-:: Start*/
  useEffect(() => {
    getBanksAccounts();
  }, []);
  // Api call
  const getBanksAccounts = () => {
    setLoading(true);
    setTimeout(() => {
      http.get("/bank-account").then((res) => {
        console.log("Bank account", res.data.accounts);
        setAccounts(res.data.accounts);
        setLoading(false);
      });
    }, 500);
  };
  /* Getting data from database ::-:: End*/

  /* Delete account ::-:: Start */
  const deleteUser = (id) => {
    confirmDelete().then((result) => {
      if (result.isConfirmed) {
        // Update the loading state for the specific user
        setLoadingStates((prevStates) => ({
          ...prevStates,
          [id]: true,
        }));
        // setLoading(true);
        http.delete(`/bank-account/${id}`).then((res) => {
          showSuccessMessage(res.data.message);
          setAccounts((prevUsers) =>
            prevUsers.filter((user) => user.id !== id)
          );
          setLoading(false);
          // Reset the loading state for the specific user
          setLoadingStates((prevStates) => ({
            ...prevStates,
            [id]: false,
          }));
        });
      }
    });
  };
  /* Delete account ::-:: End */

  return (
    <>
      <div className="container mt-3">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Bank Accounts</h4>
              <Link to="/bank-account">
                <button className="btn btn-secondary btn-sm">
                  Add Account
                </button>
              </Link>
            </div>
          </div>
        </div>
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Account Name</th>
              <th>Account Number</th>
              <th>Bank Logo</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <TableDataLoader colSpan={5}></TableDataLoader>
            ) : (
              accounts.map((account, index) => (
                <tr>
                  <td>{account.bank_name}</td>
                  <td>{account.account_name}</td>
                  <td>{account.account_number}</td>
                  <td>
                    <img src={account.logo} height={"100px"} />
                  </td>
                  <td>
                    <button className="btn btn-default btn-sm">
                      <svg
                        class="feather feather-edit"
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      key={account.id}
                      className="btn btn-sm btn-secondary"
                      onClick={() => deleteUser(account.id)}
                    >
                      {!loadingStates[account.id] ? "Delete" : "Loading..."}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BankAccountInfo;

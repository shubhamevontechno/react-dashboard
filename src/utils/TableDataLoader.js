import React from "react";

const TableDataLoader = ({colSpan}) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="d-flex justify-content-center align-items-center">
          <img src="/images/loader.gif" alt="Loader" height={"100px"} />
        </div>
      </td>
    </tr>
  );
};

export default TableDataLoader;

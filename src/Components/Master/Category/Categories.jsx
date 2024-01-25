import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";                                                                                                                                                                                                                                                                                                                                                                                                                                              
import SubmitButton from "../../../utils/SubmitButton";
import AuthUser from "../../../api/axios";
import { showSuccessMessage, confirmDelete } from "../../../utils/swalUtils";
import TableDataLoader from "../../../utils/TableDataLoader";
import UseAuth from "../../../Hook/UseAuth";

const Categories = () => {
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [loading, setButtonLoading] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [validationError, setValidationError] = useState("");
  const [fetchCategories, setFetchCategories] = useState([]);
  const { http } = AuthUser();
  const { logout } = UseAuth();

  // Handle Show hide category input box :: start
  const handleInputDisplay = () => {
    setShowCategoryInput(!showCategoryInput);
  };
  // Handle Show hide category input box :: End

  // Handle on submit data :: start
  const handleCategory = async (e) => {
    setButtonLoading(true);
    e.preventDefault();
    try {
      const res = await http.post("/category", { name: categoryName });
      if (res.data.status == 200) {
        setButtonLoading(false);
        showSuccessMessage(res.data.message);
        setCategoryName("");
        setValidationError("");
        e.target.form.reset();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setValidationError(error.response.data.errors);
        setButtonLoading(false);
      } else if (error.response && error.response.status === 401) {
        // Unauthorized, perform logout
        logout();
      }else if (error.response && error.response.status === 500) {
        console.log(
          "Internal Server Error. Please try again later.",
          error.response
        );
      }
    }
  };
  // Handle on submit data :: end

  // Use effect :: start
  useEffect(() => {
    getCategories();
  }, []);

  // Get Categories from database :: start
  const getCategories = () => {
    setDataLoader(true);
    setTimeout(() => {
      http.get("/category").then((res) => {
        console.log("Categories", res.data);
        setFetchCategories(res.data.categories);
        setDataLoader(false);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // Unauthorized, perform logout
          logout();
        }
        setDataLoader(false);
      });
    }, 500);
  };
  // Get Categories from database :: end

  return (
    <>
      <div className="container py-3">
        <div className="row">
          <div className="mx-auto col-sm-6">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Category</h4>
                  <button
                    className={`btn btn-secondary btn-sm fixed-width`}
                    onClick={handleInputDisplay}
                  >
                    {!showCategoryInput ? "Add Category" : "Close"}
                  </button>
                </div>

                {showCategoryInput ? (
                  <div className="container mt-3">
                    <form onSubmit={handleCategory}>
                      <div className="row">
                        <div className="col-sm-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter category name"
                            name="category"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                          />
                          {validationError && validationError.name && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {validationError.name}
                            </div>
                          )}
                        </div>
                        <div className="col-sm-2">
                          <SubmitButton
                            loading={loading}
                            className="btn btn-primary btn-sm"
                          >
                            Add
                          </SubmitButton>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="accordion" id="accordionPanelsStayOpenExample">
                {dataLoader ? (
                  <center>
                    <TableDataLoader colSpan={2}></TableDataLoader>
                  </center>
                ) : (
                  fetchCategories.map((category) => (
                    <div className="accordion-item" key={category.id}>
                      <h2
                        className="accordion-header"
                        id={`panelsStayOpen-heading${category.id}`}
                      >
                        <button
                          className="accordion-button d-flex align-items-center collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#panelsStayOpen-collapse${category.id}`}
                          aria-expanded="false"
                          aria-controls={`panelsStayOpen-collapse${category.id}`}
                        >
                          <img
                            src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                            alt="Avatar"
                            className="avatar-img rounded-circle me-2"
                            style={{ width: "30px", height: "30px" }}
                          />
                          {category.name}
                        </button>
                      </h2>
                      <div
                        id={`panelsStayOpen-collapse${category.id}`}
                        className="accordion-collapse collapse pt-2"
                        aria-labelledby={`panelsStayOpen-heading${category.id}`}
                      >
                        <Link className="g-2 px-4">
                          <b>+</b> Add Subcategory
                        </Link>
                        {!category.subcategories.length > 0 && (
                          <center>
                            <p className="text-danger">
                              No subcategories found
                            </p>
                          </center>
                        )}
                        <div className="accordion-body">
                          {category.subcategories.map((subcategory) => (
                            <div key={subcategory.id} className="px-4">
                              <img
                                src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                                alt="Avatar"
                                className="avatar-img rounded-circle me-2"
                                style={{ width: "30px", height: "30px" }}
                              />
                              {subcategory.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
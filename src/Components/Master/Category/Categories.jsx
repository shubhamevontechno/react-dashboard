import React from "react";
import { Link } from "react-router-dom";


const Categories = () => {
  return (
    <>
      <div className="container py-3">
        <div className="row">
          <div className="mx-auto col-sm-6">
            <div className="card">
              <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="panelsStayOpen-headingOne"
                  >
                    <button
                      className="accordion-button d-flex align-items-center collapsed" // added 'd-flex align-items-center' for flex layout
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      <img
                        src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                        alt="Avatar"
                        className="avatar-img rounded-circle me-2" // added 'me-2' for margin on the right side
                        style={{ width: "30px", height: "30px" }}
                      />
                      <span>Accordion Item #1</span>
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingOne"
                  >
                    <Link className="g-2 px-4"><b>+</b> Add Subcategory</Link>
                    <div className="accordion-body">
                    <img
                        src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                        alt="Avatar"
                        className="avatar-img rounded-circle me-2" // added 'me-2' for margin on the right side
                        style={{ width: "30px", height: "30px" }}
                      />
                      <span>Accordion Item #1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;

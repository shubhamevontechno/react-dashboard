import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import SubmitButton from "../../utils/SubmitButton";

const MyExpenses = () => {
  const currentDate = new Date();
  const currentDateISOString = currentDate.toISOString().split("T")[0];
  const [moreInfo, setMoreInfo] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [amount, setAmount]     = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate]     = useState('');
  const [moreDetails, setMoreDetails] = useState('');

  const moreInfoHandle = () => {
    setMoreInfo(!moreInfo);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value = "" } = e.target;
    const parsedValue = value.replace(/[^\d.]/gi, "");
    setAmount(parsedValue);
  };
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Amount:', amount);
    console.log('Date:', date);
    console.log('description:', description);
    // Rest of your code...
  }
  return (
    <>
      <div className="container py-3">
        <div className="row">
          <div className="mx-auto col-sm-6">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">My Expanses</h4>
              </div>
              <div className="card-body">
                <form className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    {/* <input
                      type="number"
                      className="form-control"
                      id="amount"
                      value={''}
                      required
                    /> */}
                    <CurrencyInput
                    id="input-example"
                    prefix={"₹"}
                    name="input-name"
                    className="form-control"
                    placeholder="Please enter an amount"
                    decimalsLimit={2}
                    value={amount}
                    onChange={handleChange}
                    />

                    <div className="invalid-feedback">
                      Please enter the amount.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={description}
                      placeholder="Please enter the description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter the description.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      defaultValue={currentDateISOString}
                      required
                    />
                    <div className="invalid-feedback">
                      Please select the date.
                    </div>
                  </div>
                  {moreInfo ? (
                    <img
                      src="/images/minus.png"
                      alt="Minus"
                      onClick={moreInfoHandle}
                    />
                  ) : (
                    <img
                      src="/images/plus.png"
                      alt="Minus"
                      onClick={moreInfoHandle}
                    />
                  )}
                  {moreInfo ? (
                    <div className="mb-3">
                      <label htmlFor="moreDetails" className="form-label">
                        More Details
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="more-details"
                        value={moreDetails}
                        onChange={(e) => setMoreDetails(e.target.value)}
                        name="more-details"
                        placeholder="Please provide additional details about your expense."
                      />
                    </div>
                  ) : (
                    " "
                  )}
                  <div className="mb-3">
                    <div className="d-grid gap-2 col-lg-6 mx-auto">
                      <SubmitButton loading={loading} onClick={handleSubmit}>Submit</SubmitButton>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyExpenses;

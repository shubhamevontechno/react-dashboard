import React, { useState } from "react";
import SubmitButton from "../../utils/SubmitButton";
import { showSuccessMessage } from "../../utils/swalUtils";
import AuthUser from "../../api/axios";

const BankAccount = () => {
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [logo, setLogo] = useState();
  const [getLogo, setGetLogo] = useState();
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});
  const { http } = AuthUser();
  const getUserId = sessionStorage.getItem("user");

  //Image function
  function handleChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0].name);
      const selectedFile = e.target.files[0];
      setGetLogo(selectedFile);
      setLogo(URL.createObjectURL(selectedFile));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('file', e.target);
    try {
      const formData = new FormData();
      formData.append('user_id', 8);
      formData.append('bank_name', bankName);
      formData.append('account_name', accountName);
      formData.append('account_number', accountNumber);
      formData.append('logo', getLogo);
  
      const res = await http.post("/bank-account", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          
        },
      });
  
      if (res.data.status === 200) {
        setLoading(false);
        showSuccessMessage(res.data.message);
        setBankName("");
        setAccountName("");
        setAccountNumber("");
        setLogo("");
        e.target.form.reset();
      }
        
      
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error. Please try again later.",error.response);
      } else if(error.response && error.response.status === 422){
        setValidationError(error.response.data.errors);
      } else {
        console.log('else',error);
      }
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="container py-3">
        <div className="row">
          <div className="mx-auto col-sm-6">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">Bank Account</h4>
              </div>
              <div className="card-body">
                <form className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="bankName" className="form-label">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="bank-name"
                      value={bankName}
                      placeholder="Please enter the bank name"
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    {/* Display validation error */}
                    {validationError && validationError.bank_name && (
                      <div className="invalid-feedback" style={{display:'block'}}>{validationError.bank_name[0]}</div>
                    )}
                    
                  </div>
                  <div className="mb-3">
                    <label htmlFor="bankName" className="form-label">
                      Account Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="account-name"
                      value={accountName}
                      placeholder="Please enter the bank name"
                      onChange={(e) => setAccountName(e.target.value)}
                    />
                    {/* Display validation error */}
                    {validationError && validationError.account_name && (
                      <div className="invalid-feedback" style={{display:'block'}}>{validationError.account_name[0]}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bankName" className="form-label">
                      Account Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="account-name"
                      value={accountNumber}
                      placeholder="Please enter the bank name"
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                    
                    {/* Display validation error */}
                    {validationError && validationError.account_number && (
                      <div className="invalid-feedback" style={{display:'block'}}>{validationError.account_number[0]}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bankName" className="form-label">
                      Bank Logo
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="logo"
                      name="logo"
                      placeholder="Please enter the bank name"
                      onChange={handleChange}
                    />
                     {/* Display validation error */}
                     {validationError && validationError.logo && (
                      <div className="invalid-feedback" style={{display:'block'}}>{validationError.logo[0]}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    {logo && <img src={logo} alt="Bank Logo" width={"100px"} className="object-fit-contain border rounded" />}
                  </div>

                  <div className="mb-3">
                    <div className="d-grid gap-2 col-lg-6 mx-auto">
                      <SubmitButton loading={loading} onClick={handleSubmit}>
                        Submit
                      </SubmitButton>
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

export default BankAccount;

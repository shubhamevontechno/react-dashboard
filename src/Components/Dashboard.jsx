import React, { useEffect, useState } from "react";
import AuthUser from "../api/axios";
const Dashboard = () => {
  const { user,http } = AuthUser();
  const [userDetails, setUserDetails] = useState('');

  useEffect(() => {
    getUserDetails();
  },[]);

  const getUserDetails = () => {
    http.post('/me').then((res)=>{
      console.log(res.data);
      setUserDetails(res.data);
    });
  }
  function renderElement(){
    if(userDetails){
        return <div>
            <h4>Name</h4>
            <p>{userDetails.name}</p>
            <h4>Email</h4>
            <p>{userDetails.email}</p>
        </div>
    }else{
        return <p>Loading.....</p>
    }

}

return(
    <div>
        <h1 className='mb-4 mt-4'>Dashboard page</h1>
        { renderElement() }
    </div>
)
};

export default Dashboard;

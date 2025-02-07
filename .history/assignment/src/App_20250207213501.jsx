import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api/?page=1&results=1&seed=abc");
        setUserData(response.data.results[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border p-4 flex">
      <div className="w-40 h-40 border mr-4 flex items-center justify-center">
        <img 
          src={userData.picture.large} 
          alt="User" 
          className="max-w-full max-h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <div>
          <span className="font-bold">FirstName</span> 
          <span className="ml-2">{userData.name.first}</span>
        </div>
        <div>
          <span className="font-bold">LastName</span> 
          <span className="ml-2">{userData.name.last}</span>
        </div>
        <div>
          <span className="font-bold">Gender</span> 
          <span className="ml-2">{userData.gender}</span>
        </div>
        <div>
          <span className="font-bold">Phone Number</span> 
          <span className="ml-2">{userData.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
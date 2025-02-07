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
    <div className="border-2 border-black p-6 w-[450px] flex items-center space-x-8">
      {/* Image Box */}
      <div className="border-2 border-black w-32 h-32 flex items-center justify-center">
        <img 
          src={userData.picture.large} 
          alt="User" 
          className="w-full h-full object-cover"
        />
      </div>
      {/* Details Section */}
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex space-x-6">
            <p className="font-semibold">FirstName</p>
            <p className="font-semibold">LastName</p>
          </div>
          <div className="flex space-x-6">
            <p>{userData.name.first}</p>
            <p>{userData.name.last}</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Gender</p>
          <p>{userData.gender}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>{userData.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
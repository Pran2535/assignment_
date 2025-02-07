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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="border border-gray-400 p-4 flex w-[500px] h-[200px] bg-white shadow-lg">
        {/* Left Section - Image */}
        <div className="w-[150px] h-[150px] border border-gray-400 mr-4 flex items-center justify-center">
          <img
            src={userData.picture.large}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section - User Details */}
        <div className="flex-grow flex flex-col justify-evenly">
          <div className="flex">
            <span className="font-bold w-[100px]">FirstName:</span>
            <span>{userData.name.first}</span>
          </div>
          <div className="flex">
            <span className="font-bold w-[100px]">LastName:</span>
            <span>{userData.name.last}</span>
          </div>
          <div className="flex">
            <span className="font-bold w-[100px]">Gender:</span>
            <span>{userData.gender}</span>
          </div>
          <div className="flex">
            <span className="font-bold w-[100px]">Phone Number:</span>
            <span>{userData.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

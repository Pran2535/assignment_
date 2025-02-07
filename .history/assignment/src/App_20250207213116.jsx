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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center">
          <img
            src={userData.picture.large}
            alt="User Avatar"
            className="w-32 h-32 rounded-full shadow-md"
          />
          <h2 className="mt-4 text-xl font-bold text-gray-800">
            {userData.name.first} {userData.name.last}
          </h2>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-gray-600 mt-2">{userData.location.city}, {userData.location.country}</p>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <p className="text-gray-600">Phone:</p>
          <p className="text-gray-800 font-medium">{userData.phone}</p>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-gray-600">Age:</p>
          <p className="text-gray-800 font-medium">{userData.dob.age}</p>
        </div>
      </div>
    </div>
  );
};

export default App;

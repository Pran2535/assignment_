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
    <div className="border-2 border-black p-4 w-[400px] flex items-center">
      {/* Image Box */}
      <div className="border-2 border-black w-24 h-24 flex items-center justify-center text-sm">
        <img src={userData.picture.large} alt="User" className="w-full h-full object-cover" />
      </div>
      {/* Details Section */}
      <div className="ml-6">
        <div className="flex">
          <p className="font-semibold">FirstName</p>
          <p className="ml-4 font-semibold">LastName</p>
        </div>
        <div className="flex">
          <p>{userData.name.first}</p>
          <p className="ml-4">{userData.name.last}</p>
        </div>
        <p className="mt-2 font-semibold">Gender</p>
        <p>{userData.gender}</p>
        <p className="mt-2 font-semibold">Phone Number</p>
        <p>{userData.phone}</p>
      </div>
    </div>
  );
};

export default App;

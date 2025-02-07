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
    <div className="border border-black p-4 flex w-[500px]">
      <div className="w-[200px] h-[200px] border border-black mr-4">
        <img
          src={userData.picture.large}
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow flex flex-col justify-start space-y-2">
        <div>
          <span className="font-bold">FirstName</span>
          <div>{userData.name.first}</div>
        </div>
        <div>
          <span className="font-bold">LastName</span>
          <div>{userData.name.last}</div>
        </div>
        <div>
          <span className="font-bold">Gender</span>
          <div>{userData.gender}</div>
        </div>
        <div>
          <span className="font-bold">Phone Number</span>
          <div>{userData.phone}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
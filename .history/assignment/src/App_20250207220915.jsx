<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Card</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex items-center justify-center min-h-screen bg-gray-100">
    <div id="root"></div>
    <script type="module">
        import React, { useEffect, useState } from "https://cdn.skypack.dev/react";
        import ReactDOM from "https://cdn.skypack.dev/react-dom";
        import axios from "https://cdn.skypack.dev/axios";

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
                return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
            }

            return (
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <div className="border-2 border-black p-4 flex items-center space-x-4">
                        {/* Image Box */}
                        <div className="border-2 border-black flex items-center justify-center w-32 h-32 overflow-hidden">
                            <img
                                src={userData.picture.large}
                                alt="User Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Details Section */}
                        <div className="space-y-2">
                            {/* First Name and Last Name Section */}
                            <div className="flex space-x-4">
                                <span className="font-semibold text-gray-800">{userData.name.first}</span>
                                <span className="font-semibold text-gray-800">{userData.name.last}</span>
                            </div>
                            
                            {/* Gender Section */}
                            <div>
                                <span className="font-semibold text-gray-800 capitalize">{userData.gender}</span>
                            </div>
                            
                            {/* Phone Number Section */}
                            <div>
                                <span className="font-semibold text-gray-800">{userData.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        ReactDOM.render(<App />, document.getElementById("root"));
    </script>
</body>
</html>
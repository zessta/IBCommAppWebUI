import React, { useEffect } from "react";
import Routes from "./routes/Routes";
import { closeHubConnection, createHubConnection, getHubConnection } from "./utils/hubConnection";
import { getItem } from "./utils/utils";

const App = () => {
  const initializeSocket = async () => {
    const accessToken = getItem("token")??"";
    const hubUrl = process.env.REACT_APP_HUB_URL??"";
    const connection = await createHubConnection(hubUrl, accessToken);
  
    connection.on("ReceiveMessage", (message) => {
      console.log("Message received:", message);
    });
  
    // To send a message
    connection.invoke("SendMessage", "Hello, World!");
  };
  // useEffect(() => {
  //   initializeSocket();
  //   return () => {
  //     closeHubConnection();
  //   }
  // },[])

  // console.log(getHubConnection())
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Routes />
    </div>
  );
};

export default App;

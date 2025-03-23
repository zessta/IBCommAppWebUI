import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const createHubConnection = async (
  hubUrl: string,
  accessToken: string
) => {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    try {
      await connection.start();
      console.log("SignalR connection established.");
    } catch (error) {
      console.error("Error establishing SignalR connection:", error);
    }
  }
  return connection;
};

export const getHubConnection = () => {
  if (!connection) {
    throw new Error(
      "SignalR connection has not been established. Call createHubConnection first."
    );
  }
  return connection;
};

export const closeHubConnection = async () => {
  if (connection) {
    try {
      await connection.stop();
      console.log("SignalR connection closed.");
    } catch (error) {
      console.error("Error closing SignalR connection:", error);
    } finally {
      connection = null;
    }
  }
};

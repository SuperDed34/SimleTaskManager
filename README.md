# Simple Task Manager

This project was created for a test assignment. It uses the MERN stack. The backend is developed on Node.js using the express.js library, the frontend is built with React and Material UI. The database is MongoDB. The bundler used is Vite.js.

In development mode, both the server and client parts are conveniently started from the project root using the command `npm run dev` thanks to the "concurrently" plugin.

## ***Setup Instructions***

1. Clone the repository:
    ```sh
    git clone https://github.com/SuperDed34/SimpleTaskManager.git
    ```

2. Install all dependencies:
    ```sh
    npm install
    cd ./client
    npm install
    cd ..
    ```

3. In the project root, create a file **.env** with the data for connecting to Atlas MongoDB (you can create an account [here](https://www.mongodb.com/cloud/atlas/register) if you don't have one). file **.env.example** contains an example with mandatory fields;

4. In the **client** folder, create the bundler configuration file **vite.config.js** with the server port settings:
    ```js
    export default {
      server: {
        port: 3000,
        proxy: {
          "/api": {
            target: "http://localhost:5000",
            changeOrigin: true,
          },
        },
      },
    };
    ```
5. Start the application:
    ```sh
    npm run dev
    ```

\* - The client part defaults to the address `http://localhost:3000`, the server part defaults to port `5000`. If you plan to change the port from `5000`, update the configuration accordingly.

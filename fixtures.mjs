import express from 'express';

let httpServer;
const app = express();
const port = process.env.TEST_PORT || 9000;

const startServer = () => {
  return new Promise((resolve, reject) => {
    app.use(express.static('./'));  
    httpServer = app.listen(port, () => {
      console.log(`👂 Server is listening on port ${port}`);
      resolve();
    });
  });
}

const stopServer = () => {
  return new Promise((resolve, reject) => {
    if(httpServer) {
      httpServer.close(() => {
        resolve();
      });
    }
  });
}

let server;

export const mochaGlobalSetup = async () => {
  server = await startServer();
  console.log('🚀 Server started');
}

export const mochaGlobalTeardown = async () => {
  await stopServer();
  console.log('🛑 Server stopped');
}
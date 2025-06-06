import { bootstrap } from './presentation/server.js';

async function startServer() {
  try {
    console.log("Bootstrapping application...");
    const app = await bootstrap();

    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running and listening on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1);
  }
}

startServer();
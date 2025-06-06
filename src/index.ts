import { bootstrap } from './presentation/server.js';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  try {
    console.log("Bootstrapping application...");
    const app = await bootstrap();

    // Ruta de health check
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0'
      });
    });

    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running and listening on http://localhost:${port}`);
      console.log(`Health check available at: http://localhost:${port}/health`);
    });

  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1);
  }
}

startServer();
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllCampers, getCamperById } from './services/campers.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/campers', async (req, res) => {
    const campers = await getAllCampers();

    res.status(200).json({
      total: campers.length,
      items: campers,
    });
  });

  app.get('/campers/:id', async (req, res, next) => {
    const { id } = req.params;
    const camper = await getCamperById(id);

    if (!camper) {
      res.status(404).json({
        message: 'Camper not found',
      });
      return;
    }

    res.status(200).json(camper);
  });

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

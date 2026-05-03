import { Router } from 'express';
import { config } from '../config';
import { logger } from '../logger';

export const civicRouter = Router();

civicRouter.get('/lookup', async (req, res) => {
  const address = req.query.address;

  if (!address || typeof address !== 'string' || address.trim() === '') {
    res.status(400).json({ error: 'Address query parameter is required' });
    return;
  }

  try {
    const url = new URL('https://civicinfo.googleapis.com/civicinfo/v2/representatives');
    url.searchParams.append('address', address);
    url.searchParams.append('key', config.googleCivicApiKey);
    
    // We can also include roles if we only want legislators, etc.
    // url.searchParams.append('roles', 'legislatorUpperBody');
    // url.searchParams.append('roles', 'legislatorLowerBody');

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData = await response.text();
      logger.error({ status: response.status, errorData }, 'Google Civic API Error');
      res.status(response.status).json({ error: 'Failed to fetch civic data', details: errorData });
      return;
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    logger.error({ err: error }, 'Internal Server Error during Civic Lookup');
    res.status(500).json({ error: 'Internal server error' });
  }
});

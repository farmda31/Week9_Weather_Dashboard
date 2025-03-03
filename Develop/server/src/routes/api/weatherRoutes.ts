import { Router, type Request, type Response } from 'express';
// import weatherService from '../../service/weatherService';
// import historyService from '../../service/historyService';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
// DF UPDATE - added an async for the POST request
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
  // DF UPDATE - added the contents for the POST request for city name to retrieve weather data
  try {
    const { cityName } = req.body; // This will extract the city name from the body request
    console.log(req.body);

    if (!cityName) {
      return res.status(400).json({ error: 'cityName is required'});
    }

    const weatherData = await WeatherService.getWeatherForCity(cityName);
    console.log(weatherData);

    return res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error retrieving weather data:', error);
    return res.status(500).json({ error: ' An error occurred while retrieving weather data' });
  }
});


// TODO: GET search history
// DF UPDATE - Add contents for the GET Search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getSearchHistory();
    return res.status(200).json(history);
  } catch (error) {
    console.error('Error retrieving search history:', error);
    return res.status(500).json({ error: 'An error occurred while retrieving search history'});
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCityFromHistory(id);
    return res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    console.error('Error deleting city history:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the city history' });
  }
});

export default router;

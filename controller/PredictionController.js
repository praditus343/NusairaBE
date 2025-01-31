import PredictionModel from '../models/DataPrediksi.js';

class PredictionController {
  static async getPredictionsGroupedByProvince(req, res) {
    try {
      const predictions = await PredictionModel.getPredictionsGroupedByProvince();
      res.json(predictions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async getPredictionsByCity(req, res) {
    try {
      const { city } = req.params;
      const predictions = await PredictionModel.getPredictionsByCity(city);
      res.json(predictions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default PredictionController;

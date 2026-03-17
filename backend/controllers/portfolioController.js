const Portfolio = require("../models/PortfolioModel");

exports.createPortfolio = async (req, res) => {
    // console.log(req.file);
  try {

    const portfolio = await Portfolio.create({
      image: req.file.path,
      public_id: req.file.filename
    });

    res.json(portfolio);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPortfolios = async (req, res) => {
  try {

    const portfolios = await Portfolio.find().sort({ order: 1 });

    res.json(portfolios);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
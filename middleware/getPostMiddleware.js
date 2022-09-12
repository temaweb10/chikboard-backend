module.exports = (req, res, next) => {
  let obj = {};
  let category = req.query.category;
  let priceMin = req.query.priceMin;
  let priceMax = req.query.priceMax;

  if (category) {
    obj.category = category;
  }
  if (priceMin) {
    obj.priceMin = priceMin;
  }
  if (priceMax) {
    obj.priceMax = priceMax;
  }
  req.postParams = obj;
  next();
};

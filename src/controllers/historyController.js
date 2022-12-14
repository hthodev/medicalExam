const historyService = require('../service/historyService');

//History
//create History
exports.createHistory = async (req, res) => {
  await historyService.createRecordHistory(req.body);
  return res.status(200).send("create successfulty");
};

// getAll specialty
exports.getAllHistory = async (req, res) => {
  let data = await historyService.getAllRecordHistory();
  return res.status(200).send(data);
};

//getById specialty
exports.getByIdHistory = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await historyService.getByIdRecordHistory(id);
      return res.status(200).send(massage);
    } else {
      return res.status(401).send("data not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

//delete specialty
exports.deleteHistory = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await historyService.deleteRecordHistory(id);
        return res.status(200).send(massage);
      } else {
        return res.status(401).send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

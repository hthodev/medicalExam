import historyService from '../service/historyService';

//History
//create History
let createHistory = async (req, res) => {
  await historyService.createRecordHistory(req.body);
  return res.send("create successfulty");
};

// getAll specialty
let getAllHistory = async (req, res) => {
  let data = await historyService.getAllRecordHistory();
  return res.send(data);
};

//getById specialty
let getByIdHistory = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await historyService.getByIdRecordHistory(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//delete specialty
let deleteHistory = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await historyService.deleteRecordHistory(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createHistory: createHistory,
  getAllHistory: getAllHistory,
  deleteHistory: deleteHistory,
  getByIdHistory: getByIdHistory
}
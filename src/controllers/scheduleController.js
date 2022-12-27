const scheduleService = require('../service/scheduleService');

//Schedule
//create Schedule

exports.createSchedule = async (req, res) => {
  await scheduleService.createRecordSchedule(req.body);
  return res.status(200).send("create successfulty");
};
// getAll specialty
exports.getAllSchedule = async (req, res) => {
  let data = await scheduleService.getAllRecordSchedule();
  return res.status(200).send(data);
};

//getById specialty
exports.getByIdSchedule = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await scheduleService.getByIdRecordSchedule(id);
      return res.status(200).send(massage);
    } else {
      return res.status(401).send("data not found");
    }
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

//update specialty
exports.updateSchedule = async (req, res) => {
  let data = req.body;
  await scheduleService.updateRecordSchedule(data);
  return res.status(200).send("updated");
};

//delete specialty
exports.deleteSchedule = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await scheduleService.deleteRecordSchedule(id);
        return res.status(200).send(massage);
      } else {
        return res.status(401).send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

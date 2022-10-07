import scheduleService from '../service/scheduleService';

//Schedule
//create Schedule

exports.createSchedule = async (req, res) => {
  await scheduleService.createRecordSchedule(req.body);
  return res.send("create successfulty");
};
// getAll specialty
exports.getAllSchedule = async (req, res) => {
  let data = await scheduleService.getAllRecordSchedule();
  return res.send(data);
};

//getById specialty
exports.getByIdSchedule = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await scheduleService.getByIdRecordSchedule(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update specialty
exports.updateSchedule = async (req, res) => {
  let data = req.body;
  await scheduleService.updateRecordSchedule(data);
  return res.send("updated");
};

//delete specialty
exports.deleteSchedule = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await scheduleService.deleteRecordSchedule(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

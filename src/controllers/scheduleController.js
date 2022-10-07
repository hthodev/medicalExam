import scheduleService from '../service/scheduleService';

//Schedule
//create Schedule

let createSchedule = async (req, res) => {
  await scheduleService.createRecordSchedule(req.body);
  return res.send("create successfulty");
};
// getAll specialty
let getAllSchedule = async (req, res) => {
  let data = await scheduleService.getAllRecordSchedule();
  return res.send(data);
};

//getById specialty
let getByIdSchedule = async (req, res) => {
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
let updateSchedule = async (req, res) => {
  let data = req.body;
  await scheduleService.updateRecordSchedule(data);
  return res.send("updated");
};

//delete specialty
let deleteSchedule = async (req, res) => {
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

module.exports = {
  createSchedule: createSchedule,
  updateSchedule: updateSchedule,
  getAllSchedule: getAllSchedule,
  deleteSchedule: deleteSchedule,
  getByIdSchedule: getByIdSchedule
}
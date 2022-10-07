import db from "../models/index";

// schedule
//create schedule
let createRecordSchedule = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.schedules.create({
        currentNumber: data.currentNumber,
        maxNumber: data.maxNumber,
        date: new Date(),
        timeType: data.timeType,
        doctorid: data.doctorid,
      });
      resolve("create ok");
    } catch (error) {
      reject(error);
    }
  });
};

//getAll Schedule
let getAllRecordSchedule = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataScl = await db.schedules.findAll({ raw: true });
      resolve(dataScl);
    } catch (error) {
      reject(error);
    }
  });
};

// getById Schedule
let getByIdRecordSchedule = (dataid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSct = await db.schedules.findByPk(dataid, { raw: true });

      if (dataSct) {
        resolve(dataSct);
      } else {
        resolve("Data not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//update Schedule
let updateRecordSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSct = await db.schedules.findByPk(data.id);
      if (dataSct) {
        (dataSct.currentNumber = data.currentNumber),
          (dataSct.maxNumber = data.maxNumber),
          (dataSct.date = data.date),
          (dataSct.timeType = data.timeType),
          (dataSct.doctorid = data.doctorid),
          (dataSct.updateAt = new Date());
        dataSct.save();

        resolve("updated");
      } else {
        resolve("du lieu khong ton tai");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//delete Schedule
let deleteRecordSchedule = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let DataSct = await db.schedules.findByPk(id);
      if (DataSct) {
        await DataSct.destroy();
        resolve("Deleted successfully");
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createRecordSchedule: createRecordSchedule,
  updateRecordSchedule: updateRecordSchedule,
  getAllRecordSchedule: getAllRecordSchedule,
  deleteRecordSchedule: deleteRecordSchedule,
  getByIdRecordSchedule: getByIdRecordSchedule
}
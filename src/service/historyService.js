import db from "../models/index";

// History
//create History
let createRecordHistory = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.histories.create({
        patient: data.patient,
        doctorid: data.doctorid,
        description: data.description,
        files: data.files,
        createdAt: new Date(),
      });
      resolve("create ok");
    } catch (error) {
      reject(error);
    }
  });
};

//getAll History
let getAllRecordHistory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataHistory = await db.histories.findAll({ raw: true });
      resolve(dataHistory);
    } catch (error) {
      reject(error);
    }
  });
};

// getById History
let getByIdRecordHistory = (dataid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataHistory = await db.histories.findByPk(dataid, { raw: true });

      if (dataHistory) {
        resolve(dataHistory);
      } else {
        resolve("Data not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//delete History
let deleteRecordHistory = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataHistory = await db.histories.findByPk(id);
      if (dataHistory) {
        await dataHistory.destroy();
        resolve("Deleted successfully");
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createRecordHistory: createRecordHistory,
  getAllRecordHistory: getAllRecordHistory,
  deleteRecordHistory: deleteRecordHistory,
  getByIdRecordHistory: getByIdRecordHistory
}
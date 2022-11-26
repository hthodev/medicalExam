const db = require("../models/index");

// History
//create History
exports.createRecordHistory = async (data) => {
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
exports.getAllRecordHistory = () => {
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
exports.getByIdRecordHistory = (dataid) => {
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
exports.deleteRecordHistory = async (id) => {
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

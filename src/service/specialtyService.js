const db = require("../models/index");

// create specialty
exports.createRecordSpecialty = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.specialties.create({
        currentNumber: data.name,
        description: data.description,
        image: data.image,
      });
      resolve("create ok");
    } catch (error) {
      reject(error);
    }
  });
};

//getAll specialty
exports.getAllRecordSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSct = await db.specialties.findAll({ raw: true });
      resolve(dataSct);
    } catch (error) {
      reject(error);
    }
  });
};

// getById specialty
exports.getByIdRecordSpecialty = (dataid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSct = await db.specialties.findByPk(dataid, { raw: true });

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

//update specialty
exports.updateRecordSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSct = await db.specialties.findByPk(data.id);
      if (dataSct) {
        (dataSct.name = data.name),
          (dataSct.description = data.description),
          (dataSct.image = data.description),
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

//delete Specialty
exports.deleteRecordSpecialty = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let DataSct = await db.specialties.findByPk(id);
      if (DataSct) {
        await DataSct.destroy();
        resolve("Deleted successfully");
      }
    } catch (error) {
      reject(error);
    }
  });
};

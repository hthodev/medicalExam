import db from "../models/index";

// Clinic
//create Clinic
exports.createRecordClinic = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.clinics.create({
        name: data.name,
        address: data.address,
        description: data.description,
        image: data.image,
        createdAt: new Date(),
      });
      resolve("create ok");
    } catch (error) {
      reject(error);
    }
  });
};

//getAll Clinic
exports.getAllRecordClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataClinic = await db.clinics.findAll({ raw: true });
      resolve(dataClinic);
    } catch (error) {
      reject(error);
    }
  });
};

// getById Clinic
exports.getByIdRecordClinic = (dataid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataClinic = await db.clinics.findByPk(dataid, { raw: true });

      if (dataClinic) {
        resolve(dataClinic);
      } else {
        resolve("Data not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//update Clinic
exports.updateRecordClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataClinic = await db.clinics.findByPk(data.id);
      if (dataClinic) {
        (dataClinic.name = data.name),
          (dataClinic.address = data.address),
          (dataClinic.description = data.description),
          (dataClinic.image = data.image),
          (dataClinic.updateAt = new Date());
        dataClinic.save();

        resolve("updated");
      } else {
        resolve("du lieu khong ton tai");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//delete Clinic
exports.deleteRecordClinic = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let DataSct = await db.clinics.findByPk(id);
      if (DataSct) {
        await DataSct.destroy();
        resolve("Deleted successfully");
      }
    } catch (error) {
      reject(error);
    }
  });
};

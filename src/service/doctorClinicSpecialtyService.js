import db from "../models/index";

// doctorClinicSpecialty
//create doctorClinicSpecialty
exports.createRecordDoctorClinicSpecialty = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.doctorClinicSpecialties.create({
        doctorid: data.doctorid,
        clinicid: data.clinicid,
        specialtyid: data.specialtyid,
        createdAt: new Date(),
      });
      resolve("create ok");
    } catch (error) {
      reject(error);
    }
  });
};

//getAll doctorClinicSpecialty
exports.getAllRecordDoctorClinicSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataDCS = await db.doctorClinicSpecialties.findAll({ raw: true });
      resolve(dataDCS);
    } catch (error) {
      reject(error);
    }
  });
};

// getById doctorClinicSpecialty
exports.getByIdRecordDoctorClinicSpecialty = (dataid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataDCS = await db.doctorClinicSpecialties.findByPk(dataid, {
        raw: true,
      });

      if (dataDCS) {
        resolve(dataDCS);
      } else {
        resolve("Data not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//update doctorClinicSpecialty
exports.updateRecordDoctorClinicSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataDCS = await db.doctorClinicSpecialties.findByPk(data.id);
      if (dataDCS) {
        (dataDCS.doctorid = data.doctorid),
          (dataDCS.clinicid = data.clinicid),
          (dataDCS.specialtyid = data.specialtyid),
          (dataDCS.updateAt = new Date());
        dataDCS.save();

        resolve("updated");
      } else {
        resolve("du lieu khong ton tai");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//delete doctorClinicSpecialty
exports.deleteRecordDoctorClinicSpecialty = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataDCS = await db.doctorClinicSpecialties.findByPk(id);
      if (dataDCS) {
        await dataDCS.destroy();
        resolve("Deleted successfully");
      }
    } catch (error) {
      reject(error);
    }
  });
};

import db from "../models/index";

// doctorClinicSpecialty
//create doctorClinicSpecialty
let createRecordDoctorClinicSpecialty = async (data) => {
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
let getAllRecordDoctorClinicSpecialty = () => {
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
let getByIdRecordDoctorClinicSpecialty = (dataid) => {
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
let updateRecordDoctorClinicSpecialty = (data) => {
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
let deleteRecordDoctorClinicSpecialty = async (id) => {
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

module.exports = {
  createRecordDoctorClinicSpecialty: createRecordDoctorClinicSpecialty,
  updateRecordDoctorClinicSpecialty: updateRecordDoctorClinicSpecialty,
  getAllRecordDoctorClinicSpecialty: getAllRecordDoctorClinicSpecialty,
  deleteRecordDoctorClinicSpecialty: deleteRecordDoctorClinicSpecialty,
  getByIdRecordDoctorClinicSpecialty: getByIdRecordDoctorClinicSpecialty
}
const doctorClinicSpecialtyService = require('../service/doctorClinicSpecialtyService');

//DoctorClinicSpecialty
//create DoctorClinicSpecialty
exports.createDoctorClinicSpecialty = async (req, res) => {
  await doctorClinicSpecialtyService.createRecordDoctorClinicSpecialty(req.body);
  return res.status(200).send("create successfulty");
};

// getAll specialty
exports.getAllDoctorClinicSpecialty = async (req, res) => {
  let data = await doctorClinicSpecialtyService.getAllRecordDoctorClinicSpecialty();
  return res.status(200).send(data);
};

//getById specialty
exports.getByIdDoctorClinicSpecialty = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await doctorClinicSpecialtyService.getByIdRecordDoctorClinicSpecialty(id);
      return res.status(200).send(massage);
    } else {
      return res.status(401).send("data not found");
    }
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

//update specialty
exports.updateDoctorClinicSpecialty = async (req, res) => {
  let data = req.body;
  let result = await doctorClinicSpecialtyService.updateRecordDoctorClinicSpecialty(data);
  return res.status(200).send(result);
};

//delete specialty
exports.deleteDoctorClinicSpecialty = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await doctorClinicSpecialtyService.deleteRecordDoctorClinicSpecialty(id);
        return res.status(200).send(massage);
      } else {
        return res.status(401).send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

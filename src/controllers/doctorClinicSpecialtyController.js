const doctorClinicSpecialtyService = require('../service/doctorClinicSpecialtyService');

//DoctorClinicSpecialty
//create DoctorClinicSpecialty
exports.createDoctorClinicSpecialty = async (req, res) => {
  await doctorClinicSpecialtyService.createRecordDoctorClinicSpecialty(req.body);
  return res.send("create successfulty");
};

// getAll specialty
exports.getAllDoctorClinicSpecialty = async (req, res) => {
  let data = await doctorClinicSpecialtyService.getAllRecordDoctorClinicSpecialty();
  return res.send(data);
};

//getById specialty
exports.getByIdDoctorClinicSpecialty = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await doctorClinicSpecialtyService.getByIdRecordDoctorClinicSpecialty(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update specialty
exports.updateDoctorClinicSpecialty = async (req, res) => {
  let data = req.body;
  let result = await doctorClinicSpecialtyService.updateRecordDoctorClinicSpecialty(data);
  return res.send(result);
};

//delete specialty
exports.deleteDoctorClinicSpecialty = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await doctorClinicSpecialtyService.deleteRecordDoctorClinicSpecialty(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

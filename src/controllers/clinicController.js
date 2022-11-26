const clinicService = require('../service/clinicService');

//Clinic
//create Clinic
exports.createClinic = async (req, res) => {
  await clinicService.createRecordClinic(req.body);
  return res.send("create successfulty");
};

// getAll specialty
exports.getAllClinic = async (req, res) => {
  let data = await clinicService.getAllRecordClinic();
  return res.send(data);
};

//getById specialty
exports.getByIdClinic = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await clinicService.getByIdRecordClinic(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update specialty
exports.updateClinic = async (req, res) => {
  let data = req.body;
  await clinicService.updateRecordClinic(data);
  return res.send("updated");
};

//delete specialty
exports.deleteClinic = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await clinicService.deleteRecordClinic(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

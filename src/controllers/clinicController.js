const clinicService = require('../service/clinicService');

//Clinic
//create Clinic
exports.createClinic = async (req, res) => {
  await clinicService.createRecordClinic(req.body);
  return res.status(200).send("create successfulty");
};

// getAll specialty
exports.getAllClinic = async (req, res) => {
  let data = await clinicService.getAllRecordClinic();
  return res.status(200).send(data);
};

//getById specialty
exports.getByIdClinic = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await clinicService.getByIdRecordClinic(id);
      return res.status(200).send(massage);
    } else {
      return res.status(401).send("data not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

//update specialty
exports.updateClinic = async (req, res) => {
  let data = req.body;
  await clinicService.updateRecordClinic(data);
  return res.status(200).send("updated");
};

//delete specialty
exports.deleteClinic = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await clinicService.deleteRecordClinic(id);
        return res.status(200).send(massage);
      } else {
        return res.status(401).send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

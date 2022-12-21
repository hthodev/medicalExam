const specialtyService = require('../service/specialtyService');

//create specialty

exports.createSpecialty = async (req, res) => {
  await specialtyService.createRecordSpecialty(req.body);
  return res.status(200).send("create successfulty");
};
// getAll specialty
exports.getAllSpecialty = async (req, res) => {
  let data = await specialtyService.getAllRecordSpecialty();
  return res.status(200).send(data);
};

//getById specialty
exports.getByIdSpecialty = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await specialtyService.getByIdRecordSpecialty(id);
      return res.status(200).send(massage);
    } else {
      return res.status(401).send("data not found");
    }
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

//update specialty
exports.updateSpecialty = async (req, res) => {
  let data = req.body;
  await specialtyService.updateRecordSpecialty(data);
  return res.status(200).send("updated");
};

//delete specialty
exports.deleteSpecialty = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await specialtyService.deleteRecordSpecialty(id);
        return res.status(200).send(massage);
      } else {
        return res.status(401).send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

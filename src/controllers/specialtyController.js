const specialtyService = require('../service/specialtyService');

//create specialty

exports.createSpecialty = async (req, res) => {
  await specialtyService.createRecordSpecialty(req.body);
  return res.send("create successfulty");
};
// getAll specialty
exports.getAllSpecialty = async (req, res) => {
  let data = await specialtyService.getAllRecordSpecialty();
  return res.send(data);
};

//getById specialty
exports.getByIdSpecialty = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await specialtyService.getByIdRecordSpecialty(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update specialty
exports.updateSpecialty = async (req, res) => {
  let data = req.body;
  await specialtyService.updateRecordSpecialty(data);
  return res.send("updated");
};

//delete specialty
exports.deleteSpecialty = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await specialtyService.deleteRecordSpecialty(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

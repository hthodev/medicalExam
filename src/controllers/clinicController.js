import clinicService from '../service/clinicService';

//Clinic
//create Clinic
let createClinic = async (req, res) => {
  await clinicService.createRecordClinic(req.body);
  return res.send("create successfulty");
};

// getAll specialty
let getAllClinic = async (req, res) => {
  let data = await clinicService.getAllRecordClinic();
  return res.send(data);
};

//getById specialty
let getByIdClinic = async (req, res) => {
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
let updateClinic = async (req, res) => {
  let data = req.body;
  await clinicService.updateRecordClinic(data);
  return res.send("updated");
};

//delete specialty
let deleteClinic = async (req, res) => {
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

module.exports = {
  createClinic: createClinic,
  updateClinic: updateClinic,
  getAllClinic: getAllClinic,
  deleteClinic: deleteClinic,
  getByIdClinic: getByIdClinic
}
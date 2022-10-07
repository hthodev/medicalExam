import db from "../models/index";
import CRUDService from "../service/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.user.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let createUser = async (req, res) => {
  let data = req.body;
  let mes = await CRUDService.createRecordUser(data);
  return res.send(mes);
};
let loginUser = async (req, res) => {
  let data = req.body;
  let mes = await CRUDService.LoginRecordUser(data);
  return res.send(mes);
};
let getAllUser = async (req, res) => {
  let result = await CRUDService.getAllRecordUser();
  return res.send(result);
};

//create specialty

let createSpecialty = async (req, res) => {
  await CRUDService.createRecordSpecialty(req.body);
  return res.send("create successfulty");
};
// getAll specialty
let getAllSpecialty = async (req, res) => {
  let data = await CRUDService.getAllRecordSpecialty();
  return res.send(data);
};

//getById specialty
let getByIdSpecialty = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await CRUDService.getByIdRecordSpecialty(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update specialty
let updateSpecialty = async (req, res) => {
  let data = req.body;
  await CRUDService.updateRecordSpecialty(data);
  return res.send("updated");
};

//delete specialty
let deleteSpecialty = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await CRUDService.deleteRecordSpecialty(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//Schedule
//create Schedule

let createSchedule = async (req, res) => {
  await CRUDService.createRecordSchedule(req.body);
  return res.send("create successfulty");
};
// getAll specialty
let getAllSchedule = async (req, res) => {
  let data = await CRUDService.getAllRecordSchedule();
  return res.send(data);
};

//getById specialty
let getByIdSchedule = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await CRUDService.getByIdRecordSchedule(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update specialty
let updateSchedule = async (req, res) => {
  let data = req.body;
  await CRUDService.updateRecordSchedule(data);
  return res.send("updated");
};

//delete specialty
let deleteSchedule = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await CRUDService.deleteRecordSchedule(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//History
//create History

let createHistory = async (req, res) => {
  await CRUDService.createRecordHistory(req.body);
  return res.send("create successfulty");
};
// getAll specialty
let getAllHistory = async (req, res) => {
  let data = await CRUDService.getAllRecordHistory();
  return res.send(data);
};

//getById specialty
let getByIdHistory = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await CRUDService.getByIdRecordHistory(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//delete specialty
let deleteHistory = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await CRUDService.deleteRecordHistory(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//DoctorClinicSpecialty
//create DoctorClinicSpecialty

let createDoctorClinicSpecialty = async (req, res) => {
  await CRUDService.createRecordDoctorClinicSpecialty(req.body);
  return res.send("create successfulty");
};
// getAll specialty
let getAllDoctorClinicSpecialty = async (req, res) => {
  let data = await CRUDService.getAllRecordDoctorClinicSpecialty();
  return res.send(data);
};

//getById specialty
let getByIdDoctorClinicSpecialty = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await CRUDService.getByIdRecordDoctorClinicSpecialty(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update specialty
let updateDoctorClinicSpecialty = async (req, res) => {
  let data = req.body;
  let result = await CRUDService.updateRecordDoctorClinicSpecialty(data);
  return res.send(result);
};

//delete specialty
let deleteDoctorClinicSpecialty = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await CRUDService.deleteRecordDoctorClinicSpecialty(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//Clinic
//create Clinic

let createClinic = async (req, res) => {
  await CRUDService.createRecordClinic(req.body);
  return res.send("create successfulty");
};
// getAll specialty
let getAllClinic = async (req, res) => {
  let data = await CRUDService.getAllRecordClinic();
  return res.send(data);
};

//getById specialty
let getByIdClinic = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await CRUDService.getByIdRecordClinic(id);
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
  await CRUDService.updateRecordClinic(data);
  return res.send("updated");
};

//delete specialty
let deleteClinic = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await CRUDService.deleteRecordClinic(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createBooking = async (req, res) => {
  await CRUDService.createRecordBooking(req.body);
  return res.send("create successfulty");
};
// getAll specialty
let getAllBooking = async (req, res) => {
  let data = await CRUDService.getAllRecordBooking();
  return res.send(data);
};

//getById specialty
let getByIdBooking = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await CRUDService.getByIdRecordBooking(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update specialty
let updateBooking = async (req, res) => {
  let data = req.body;
  await CRUDService.updateRecordBooking(data);
  return res.send("updated");
};

//delete specialty
let deleteBooking = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await CRUDService.deleteRecordBooking(id);
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
  createUser: createUser,
  getAllUser: getAllUser,
  loginUser: loginUser,

  createSpecialty: createSpecialty,
  updateSpecialty: updateSpecialty,
  getAllSpecialty: getAllSpecialty,
  deleteSpecialty: deleteSpecialty,
  getByIdSpecialty: getByIdSpecialty,

  createSchedule: createSchedule,
  updateSchedule: updateSchedule,
  getAllSchedule: getAllSchedule,
  deleteSchedule: deleteSchedule,
  getByIdSchedule: getByIdSchedule,

  createDoctorClinicSpecialty: createDoctorClinicSpecialty,
  updateDoctorClinicSpecialty: updateDoctorClinicSpecialty,
  getAllDoctorClinicSpecialty: getAllDoctorClinicSpecialty,
  deleteDoctorClinicSpecialty: deleteDoctorClinicSpecialty,
  getByIdDoctorClinicSpecialty: getByIdDoctorClinicSpecialty,

  createHistory: createHistory,
  getAllHistory: getAllHistory,
  deleteHistory: deleteHistory,
  getByIdHistory: getByIdHistory,

  createClinic: createClinic,
  updateClinic: updateClinic,
  getAllClinic: getAllClinic,
  deleteClinic: deleteClinic,
  getByIdClinic: getByIdClinic,

  createBooking: createBooking,
  updateBooking: updateBooking,
  getAllBooking: getAllBooking,
  deleteBooking: deleteBooking,
  getByIdBooking: getByIdBooking,
};

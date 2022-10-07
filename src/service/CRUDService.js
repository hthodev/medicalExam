import bcrypt, { hash } from "bcryptjs";
import db from "../models/index";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);

let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

/* user */
// create user. check email invaid

let createRecordUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.user.findOrCreate({
        where: { email: data.email },
        defaults: {
          email: data.email,
          password: await hashPassword(data.password),
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phone: data.phone,
          // image: data.STRING,
          gender: data.gender === "1" ? true : false,
          roleid: 2,
        },
      });
      const token = user[1]
        ? jwt.sign(
            {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              address: user.address,
              phone: user.phone,
              // image: data.STRING,
              gender: user.gender,
              roleid: user.roleid,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        mesage: user[1] ? "successfully!" : "invaid!",
        acess_token: token ? `Baerer ${token}` : token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//login user
let LoginRecordUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.user.findOne({
        where: { email: data.email },
        raw: true,
      });
      const isChecked =
        user && bcrypt.compareSync(data.password, user.password);
      const token = isChecked
        ? jwt.sign(
            {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              address: user.address,
              phone: user.phone,
              // image: data.STRING,
              gender: user.gender,
              roleid: user.roleid,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        massage: token
          ? "login successfully"
          : user
          ? "password wrong"
          : "email isn't registered",
        acess_token: token ? `Baerer ${token}` : token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllRecordUser = () => {
  try {
    return new Promise(async (resolve, reject) => {
      resolve(await db.user.findAll());
    });
  } catch (error) {
    reject(error);
  }
};

// create specialty

let createRecordSpecialty = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.specialties.create({
        currentNumber: data.name,
        description: data.description,
        image: data.image,
      });
      resolve("create ok");
    } catch (error) {
      reject(error);
    }
  });
};

//getAll specialty
let getAllRecordSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSct = await db.specialties.findAll({ raw: true });
      resolve(dataSct);
    } catch (error) {
      reject(error);
    }
  });
};

// getById specialty
let getByIdRecordSpecialty = (dataid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSct = await db.specialties.findByPk(dataid, { raw: true });

      if (dataSct) {
        resolve(dataSct);
      } else {
        resolve("Data not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//update specialty
let updateRecordSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSct = await db.specialties.findByPk(data.id);
      if (dataSct) {
        (dataSct.name = data.name),
          (dataSct.description = data.description),
          (dataSct.image = data.description),
          (dataSct.updateAt = new Date());
        dataSct.save();

        resolve("updated");
      } else {
        resolve("du lieu khong ton tai");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//delete Specialty
let deleteRecordSpecialty = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let DataSct = await db.specialties.findByPk(id);
      if (DataSct) {
        await DataSct.destroy();
        resolve("Deleted successfully");
      }
    } catch (error) {
      reject(error);
    }
  });
};

// schedule
//create schedule
let createRecordSchedule = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.schedules.create({
        currentNumber: data.currentNumber,
        maxNumber: data.maxNumber,
        date: new Date(),
        timeType: data.timeType,
        doctorid: data.doctorid,
      });
      resolve("create ok");
    } catch (error) {
      reject(error);
    }
  });
};

//getAll Schedule
let getAllRecordSchedule = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataScl = await db.schedules.findAll({ raw: true });
      resolve(dataScl);
    } catch (error) {
      reject(error);
    }
  });
};

// getById Schedule
let getByIdRecordSchedule = (dataid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSct = await db.schedules.findByPk(dataid, { raw: true });

      if (dataSct) {
        resolve(dataSct);
      } else {
        resolve("Data not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//update Schedule
let updateRecordSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSct = await db.schedules.findByPk(data.id);
      if (dataSct) {
        (dataSct.currentNumber = data.currentNumber),
          (dataSct.maxNumber = data.maxNumber),
          (dataSct.date = data.date),
          (dataSct.timeType = data.timeType),
          (dataSct.doctorid = data.doctorid),
          (dataSct.updateAt = new Date());
        dataSct.save();

        resolve("updated");
      } else {
        resolve("du lieu khong ton tai");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//delete Schedule
let deleteRecordSchedule = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let DataSct = await db.schedules.findByPk(id);
      if (DataSct) {
        await DataSct.destroy();
        resolve("Deleted successfully");
      }
    } catch (error) {
      reject(error);
    }
  });
};

// History
//create History
let createRecordHistory = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.histories.create({
        patient: data.patient,
        doctorid: data.doctorid,
        description: data.description,
        files: data.files,
        createdAt: new Date(),
      });
      resolve("create ok");
    } catch (error) {
      reject(error);
    }
  });
};

//getAll History
let getAllRecordHistory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataHistory = await db.histories.findAll({ raw: true });
      resolve(dataHistory);
    } catch (error) {
      reject(error);
    }
  });
};

// getById History
let getByIdRecordHistory = (dataid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataHistory = await db.histories.findByPk(dataid, { raw: true });

      if (dataHistory) {
        resolve(dataHistory);
      } else {
        resolve("Data not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//delete History
let deleteRecordHistory = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataHistory = await db.histories.findByPk(id);
      if (dataHistory) {
        await dataHistory.destroy();
        resolve("Deleted successfully");
      }
    } catch (error) {
      reject(error);
    }
  });
};

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

// Clinic
//create Clinic
let createRecordClinic = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.clinics.create({
        name: data.name,
        address: data.address,
        description: data.description,
        image: data.image,
        createdAt: new Date(),
      });
      resolve("create ok");
    } catch (error) {
      reject(error);
    }
  });
};

//getAll Clinic
let getAllRecordClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataClinic = await db.clinics.findAll({ raw: true });
      resolve(dataClinic);
    } catch (error) {
      reject(error);
    }
  });
};

// getById Clinic
let getByIdRecordClinic = (dataid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataClinic = await db.clinics.findByPk(dataid, { raw: true });

      if (dataClinic) {
        resolve(dataClinic);
      } else {
        resolve("Data not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//update Clinic
let updateRecordClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataClinic = await db.clinics.findByPk(data.id);
      if (dataClinic) {
        (dataClinic.name = data.name),
          (dataClinic.address = data.address),
          (dataClinic.description = data.description),
          (dataClinic.image = data.image),
          (dataClinic.updateAt = new Date());
        dataClinic.save();

        resolve("updated");
      } else {
        resolve("du lieu khong ton tai");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//delete Clinic
let deleteRecordClinic = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let DataSct = await db.clinics.findByPk(id);
      if (DataSct) {
        await DataSct.destroy();
        resolve("Deleted successfully");
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Booking
//create Booking
let createRecordBooking = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.bookings.create({
        status: data.status,
        doctorid: data.doctorid,
        patientid: data.patientid,
        date: data.date,
        timetype: data.timeType,
        createdAt: new Date(),
      });
      resolve("create ok");
    } catch (error) {
      reject(error);
    }
  });
};

//getAll Booking
let getAllRecordBooking = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataBooking = await db.bookings.findAll({ raw: true });
      resolve(dataBooking);
    } catch (error) {
      reject(error);
    }
  });
};

// getById Booking
let getByIdRecordBooking = (dataid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataBooking = await db.bookings.findByPk(dataid, { raw: true });

      if (dataBooking) {
        resolve(dataBooking);
      } else {
        resolve("Data not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//update Booking
let updateRecordBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataBooking = await db.bookings.findByPk(data.id);
      if (dataBooking) {
        (dataBooking.status = data.status),
          (dataBooking.doctorid = data.doctorid),
          (dataBooking.patientid = data.patientid),
          (dataBooking.date = data.date),
          (dataBooking.timeType = data.timeType),
          (dataBooking.updateAt = new Date());
        dataBooking.save();

        resolve("updated");
      } else {
        resolve("du lieu khong ton tai");
      }
    } catch (error) {
      reject(error);
    }
  });
};

//delete Booking
let deleteRecordBooking = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let DataBooking = await db.bookings.findByPk(id);
      if (DataBooking) {
        await DataBooking.destroy();
        resolve("Deleted successfully");
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createRecordHistory: createRecordHistory,
  getAllRecordHistory: getAllRecordHistory,
  deleteRecordHistory: deleteRecordHistory,
  getByIdRecordHistory: getByIdRecordHistory,

  createRecordSchedule: createRecordSchedule,
  updateRecordSchedule: updateRecordSchedule,
  getAllRecordSchedule: getAllRecordSchedule,
  deleteRecordSchedule: deleteRecordSchedule,
  getByIdRecordSchedule: getByIdRecordSchedule,

  createRecordSpecialty: createRecordSpecialty,
  updateRecordSpecialty: updateRecordSpecialty,
  getAllRecordSpecialty: getAllRecordSpecialty,
  deleteRecordSpecialty: deleteRecordSpecialty,
  getByIdRecordSpecialty: getByIdRecordSpecialty,

  createRecordDoctorClinicSpecialty: createRecordDoctorClinicSpecialty,
  updateRecordDoctorClinicSpecialty: updateRecordDoctorClinicSpecialty,
  getAllRecordDoctorClinicSpecialty: getAllRecordDoctorClinicSpecialty,
  deleteRecordDoctorClinicSpecialty: deleteRecordDoctorClinicSpecialty,
  getByIdRecordDoctorClinicSpecialty: getByIdRecordDoctorClinicSpecialty,

  createRecordClinic: createRecordClinic,
  updateRecordClinic: updateRecordClinic,
  getAllRecordClinic: getAllRecordClinic,
  deleteRecordClinic: deleteRecordClinic,
  getByIdRecordClinic: getByIdRecordClinic,

  createRecordBooking: createRecordBooking,
  updateRecordBooking: updateRecordBooking,
  getAllRecordBooking: getAllRecordBooking,
  deleteRecordBooking: deleteRecordBooking,
  getByIdRecordBooking: getByIdRecordBooking,

  createRecordUser: createRecordUser,
  LoginRecordUser: LoginRecordUser,
  getAllRecordUser: getAllRecordUser,
};

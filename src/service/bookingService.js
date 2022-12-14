const db = require("../models/index");

// Booking
//create Booking
exports.createRecordBooking = async (data) => {
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
exports.getAllRecordBooking = () => {
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
exports.getByIdRecordBooking = (dataid) => {
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
exports.updateRecordBooking = (data) => {
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
exports.deleteRecordBooking = async (id) => {
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

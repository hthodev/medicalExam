import db from "../models/index";
import emailService from "./nodemailerService"

//create Booking
exports.createRecordBooking = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data.email || !data.doctorid || !data.timeType || !data.date) {
        resolve({
          errCode: -1,
          Message: "Missing parameter!"
        })
      } else {
        // await emailService.sendSimpleEmail({
        //     reciverEmail: data.email,
        //     patientName: "BN",
        //     time:"8:00 - 9:00",
        //     doctorName:"Tran Thi Thien Thao",
        //     redirectLink:"https://facebook.com/thientho.it"
        // })

        let patient = await db.user.findOrCreate({
          where: {email: data.email},
          defaults: {
            email: data.email,
            roleId: "R3"
          }
        })

        if(patient && patient[0]) {
          await db.bookings.findOrCreate({
            where: {patientId: patient[0].id},
            defaults:{
              status: 'S1',
              doctorid: data.doctorid,
              patientId: patient[0].id,
              date: data.date,
              timeType: data.timeType
            }
          })
        }
        resolve({
          errCode: 0,
          Message: "Create Booking Successfully"
        });
      }
      
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

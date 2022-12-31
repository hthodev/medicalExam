import db from "../models/index";
require('dotenv')
import _ from "lodash";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
 
// Booking
// schedule
//create schedule
exports.createRecordSchedule = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data.arrSchedule || !data.doctorid || !data.formatedDate) {
        resolve.json({
          errCode: -1,
          Message: "Missing require param!"
        })
      } else {
        let schedule = data.arrSchedule;
        if(schedule && schedule.length > 0 ){
        schedule = schedule.map(item => {
          item.maxNumber = MAX_NUMBER_SCHEDULE
          return item;
        })
      }

      let existing = await db.schedules.findAll({
        where: {
          doctorid: data.doctorid,
          date: data.formatedDate  
        },
        attributes: ['doctorid', 'date', 'timeType', 'maxNumber'],
        raw:true
      })
      

      let toCreate = _.differenceWith(schedule, existing, (a,b)=> {
        return a.timeType !== b.timeType && a.date !== b.date;
      })

      if(toCreate && toCreate.length > 0){
        await db.schedules.bulkCreate(toCreate)
      }
      }
      
      resolve({
        errCode: 0,
        Massage: "Create successfully!"
      });
    } catch (error) {
      reject(error);
    }
  });
};

//getAll Schedule
exports.getAllRecordSchedule = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataScl = await db.schedules.findAll({ raw: true });
      resolve(dataScl);
    } catch (error) {
      reject(error);
    }
  });
};

exports.getRecordScheduleByDate = (doctorid, date) => {
  return new Promise(async(resolve, reject) => {
    try {
      let result = await db.schedules.findAll({
        where: {
          doctorid: doctorid,
          date:date
        },
        include: [
          {
            model: db.allcodes, 
            as: 'timeTypeData', 
            attributes: ['valueENG','valueVI'],
          
          },
           {
            model: db.doctorInfo,
          
            attributes: {
              exclude: ['id']
            },
            include: [
              {model: db.allcodes, as:'priceTypeData', attributes:['valueENG', 'valueVI']},
              {model: db.allcodes, as:'provinceTypeData', attributes:['valueENG', 'valueVI']},
              {model: db.allcodes, as:'paymentTypeData', attributes:['valueENG', 'valueVI']}
            ]
          }
          
        ],
        raw: false,
        nest:true
      })
      resolve({
        errCode: 0,
        result
      })
    } catch (error) {
      reject(error)
    }
  })
}

// getById Schedule
exports.getByIdRecordSchedule = (dataid) => {
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
exports.updateRecordSchedule = (data) => {
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
exports.deleteRecordSchedule = async (id) => {
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

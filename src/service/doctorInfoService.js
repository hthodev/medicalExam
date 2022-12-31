import db from "../models";

exports.postRecordInfoDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.selectPrice ||
        !data.selectProvince ||
        !data.selectPayment ||
        !data.nameClinic ||
        !data.addressClinic ||
        !data.note
      ) {
        resolve({
          errCode: 1,
          message: "data not invaid",
        });
      } else {
        let result = await db.doctorInfo.findOrCreate({
            where: {doctorId: data.id},
            defaults: {
                priceId: data.selectPrice,
                provinceId: data.selectProvince,
                paymentId: data.selectPayment,
                nameClinic: data.nameClinic,
                addressClinic: data.addressClinic,
                note: data.note
            }
        })
        if(!result){
            resolve({
                errCode: -1,
                Message: "Data not create!"
            })
        } else {
            resolve(result)
        }
        
      }
    } catch (error) {
      reject(error)
    }
  });
};

exports.getMoreInfoDoctor = (id) => {
  return new Promise(async(resolve, reject)=> {
    try {
      let result = await db.doctorInfo.findOne({
        where: {doctorId: id},
        raw: false
      })
      resolve(result)
    } catch (error) {
      reject({
        errCode: -1,
        Message: "Error from sever!"
      })
    }
  })
}

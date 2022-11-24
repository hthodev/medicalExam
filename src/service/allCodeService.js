import db from "../models";

exports.getRecordAllCode = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (type) {
        let data = await db.allcodes.findAll({
          where: { type },
        });
        resolve(data);
      } else {
        resolve({});
      }
    } catch (error) {
      reject({
        errCode: 1,
        message: "data not invaid",
      });
    }
  });
};

const bookingService = require('../service/bookingService');

exports.createBooking = async (req, res) => {
  await bookingService.createRecordBooking(req.body);
  return res.status(200).send("create successfulty");
};
// getAll specialty
exports.getAllBooking = async (req, res) => {
  let data = await bookingService.getAllRecordBooking();
  return res.status(200).send(data);
};

//getById specialty
exports.getByIdBooking = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await bookingService.getByIdRecordBooking(id);
      return res.status(200).send(massage);
    } else {
      return res.status(401).send("data not found");
    }
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
};

//update specialty
exports.updateBooking = async (req, res) => {
  let data = req.body;
  await bookingService.updateRecordBooking(data);
  return res.status(200).send("updated");
};

//delete specialty
exports.deleteBooking = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await bookingService.deleteRecordBooking(id);
        return res.status(200).send(massage);
      } else {
        return res.status(401).send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

import bookingService from '../service/bookingService';

exports.createBooking = async (req, res) => {
  await bookingService.createRecordBooking(req.body);
  return res.send("create successfulty");
};
// getAll specialty
exports.getAllBooking = async (req, res) => {
  let data = await bookingService.getAllRecordBooking();
  return res.send(data);
};

//getById specialty
exports.getByIdBooking = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await bookingService.getByIdRecordBooking(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update specialty
exports.updateBooking = async (req, res) => {
  let data = req.body;
  await bookingService.updateRecordBooking(data);
  return res.send("updated");
};

//delete specialty
exports.deleteBooking = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await bookingService.deleteRecordBooking(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

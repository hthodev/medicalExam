import scheduleService from '../service/scheduleService';

//Schedule
//create Schedule

exports.createSchedule = async (req, res) => {
  let data = req.body
  if(!data){
    return res.status(400).json({
      errCode: -1,
      Massage: "Not found data!"
    })
  } else {
    let result = await scheduleService.createRecordSchedule(data);
    return res.status(200).json(result)
  }
  
};

exports.getScheduleByDate = async(req, res) => {
  let id = req.query.doctorid;
  let date = req.query.date
  try {
    if(id && date) {
      let result = await scheduleService.getRecordScheduleByDate(id,date)
      return res.status(200).json(result)
    } else {
      return res.status(400).json({
        errCode: -1,
        Massage: "Not found data!"
      })
    }
  }
   catch (error) {
    return res.status(404).json({
      errCode:-1,
      Massage: 'Error from the server'
    })

  }
}

// getAll specialty
exports.getAllSchedule = async (req, res) => {
  let data = await scheduleService.getAllRecordSchedule();
  return res.send(data);
};

//getById specialty
exports.getByIdSchedule = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let massage = await scheduleService.getByIdRecordSchedule(id);
      return res.send(massage);
    } else {
      return res.send("data not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//update specialty
exports.updateSchedule = async (req, res) => {
  let data = req.body;
  await scheduleService.updateRecordSchedule(data);
  return res.send("updated");
};

//delete specialty
exports.deleteSchedule = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = req.query.id;
      if (id) {
        let massage = await scheduleService.deleteRecordSchedule(id);
        return res.send(massage);
      } else {
        return res.send("data not found!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

import doctorService from "../service/doctorService";
import { validationResult } from "express-validator";

exports.createDoctor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      result: false,
      message: errors.array(),
    });
  }
  let data = req.body;

  if (data) {
    let result = await doctorService.createRecordDoctor(data);
    return res.status(200).json({
      result,
    });
  } else {
    return res.status(500).json({
      errCode: 2,
      message: "Please input data!",
    });
  }
};

exports.getAllDoctor = async (req, res) => {
  try {
    let result = await doctorService.getAllDoctor();
    if (result) {
      return res.status(200).json({
        errCode: 0,
        result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: -1,
      message: error,
    });
  }
};

exports.getTopDoctor = async (req, res) => {
  let limit = req.query.limit;
  try {
    let result = await doctorService.getTopRecordDoctor(limit);
    if (result) {
      return res.status(200).json({
        errCode: 0,
        result,
      });
    } else {
      return res.status(500).json({
        errCode: -1,
      });
    }
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: error,
    });
  }
};

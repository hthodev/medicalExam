import allCodeService from "../service/allCodeService";

exports.getAllCode = async (req, res) => {
  let result = await allCodeService.getRecordAllCode(req.query.type);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    result,
  });
};

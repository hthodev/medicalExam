import doctorInfoService from "../service/doctorInfoService";

exports.postInfoDoctor = async (req, res) => {
    let data = req.body

    if (!data) {
        return req.status(400).json({
            errCode: 0,
            errMessage: "Not found data!",
        })
    }
    else {
        let result = await doctorInfoService.postRecordInfoDoctor(data);
        return res.status(200).json({
          errCode: 0,
          errMessage: "OK"
        });
    }
  
};
exports.getMoreInfoDoctor = async (req, res) => {
    let id = req.query.id;
    if (!id){
        res.status(400).json({
            errCode: -1,
            errMessage: "Not found doctor!"
        })
    } else {
        let result = await doctorInfoService.getMoreInfoDoctor(id)
        return res.status(200).json({
            errCode: 0,
            Message: "OK",
            result
        })
    }
}

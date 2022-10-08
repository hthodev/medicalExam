import db from "../models/index";

exports.getHomePage = async (req, res) => {
  try {
    let data = await db.user.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

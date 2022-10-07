import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  //user
  //create
  router.post("/create-user", homeController.createUser);
  //login
  router.post("/login-user", homeController.loginUser);
  //getAllUser
  router.get("/get-allUser", homeController.getAllUser);

  //specially
  router.post("/create-specialty", homeController.createSpecialty);
  //update
  router.post("/update-specialty", homeController.updateSpecialty);
  //getAll
  router.get("/getAll-specialty", homeController.getAllSpecialty);
  //delete
  router.get("/remove-specialty", homeController.deleteSpecialty);
  //getByID
  router.get("/getById-specialty", homeController.getByIdSpecialty);

  //Schedule
  router.post("/create-schedule", homeController.createSchedule);
  //updatescheduleSchedule
  router.post("/update-schedule", homeController.updateSchedule);
  //getAllscheduleSchedule
  router.get("/getAll-schedule", homeController.getAllSchedule);
  //deletescheduleSchedule
  router.get("/remove-schedule", homeController.deleteSchedule);
  //getByIDschedule
  router.get("/getById-schedule", homeController.getByIdSchedule);

  //History
  router.post("/create-history", homeController.createHistory);
  //getAllHistoryHistory
  router.get("/getAll-history", homeController.getAllHistory);
  //deleteHistoryHistory
  router.get("/remove-history", homeController.deleteHistory);
  //getByIDHistory
  router.get("/getById-history", homeController.getByIdHistory);

  //doctor-clinic-specialty
  router.post(
    "/create-doctor-clinic-specialty",
    homeController.createDoctorClinicSpecialty
  );
  //updatedoctor-clinic-specialtydoctor-clinic-specialty
  router.post(
    "/update-doctor-clinic-specialty",
    homeController.updateDoctorClinicSpecialty
  );
  //getAlldoctor-clinic-specialtydoctor-clinic-specialty
  router.get(
    "/getAll-doctor-clinic-specialty",
    homeController.getAllDoctorClinicSpecialty
  );
  //deletedoctor-clinic-specialtydoctor-clinic-specialty
  router.get(
    "/remove-doctor-clinic-specialty",
    homeController.deleteDoctorClinicSpecialty
  );
  //getByIDdoctor-clinic-specialty
  router.get(
    "/getById-doctor-clinic-specialty",
    homeController.getByIdDoctorClinicSpecialty
  );

  //Clinic
  router.post("/create-clinic", homeController.createClinic);
  //updateClinicClinic
  router.post("/update-clinic", homeController.updateClinic);
  //getAllClinicClinic
  router.get("/getAll-clinic", homeController.getAllClinic);
  //deleteClinicClinic
  router.get("/remove-clinic", homeController.deleteClinic);
  //getByIDClinic
  router.get("/getById-clinic", homeController.getByIdClinic);

  //Booking
  router.post("/create-booking", homeController.createBooking);
  //updateBookingBooking
  router.post("/update-booking", homeController.updateBooking);
  //getAllBookingBooking
  router.get("/getAll-booking", homeController.getAllBooking);
  //deleteBookingBooking
  router.get("/remove-booking", homeController.deleteBooking);
  //getByIDBooking
  router.get("/getById-booking", homeController.getByIdBooking);

  //rest api
  return app.use("/api", router);
};

module.exports = initWebRoutes;

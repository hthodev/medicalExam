import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import specialtyController from "../controllers/specialtyController";
import scheduleController from "../controllers/scheduleController";
import historyController from "../controllers/historyController";
import doctorClinicSpecialtyController from "../controllers/doctorClinicSpecialtyController";
import clinicController from "../controllers/clinicController";
import bookingController from "../controllers/bookingController";

let router = express.Router();

let initWebRoutes = (app) => {
  //user
  //create
  router.post("/register", userController.createUser);
  //login
  router.post("/login", userController.loginUser);
  //getAllUser
  router.get("/get-allUser", userController.getAllUser);

  //specially
  router.post("/create-specialty", specialtyController.createSpecialty);
  //update
  router.post("/update-specialty", specialtyController.updateSpecialty);
  //getAll
  router.get("/getAll-specialty", specialtyController.getAllSpecialty);
  //delete
  router.get("/remove-specialty", specialtyController.deleteSpecialty);
  //getByID
  router.get("/getById-specialty", specialtyController.getByIdSpecialty);

  //Schedule
  router.post("/create-schedule", scheduleController.createSchedule);
  //updatescheduleSchedule
  router.post("/update-schedule", scheduleController.updateSchedule);
  //getAllscheduleSchedule
  router.get("/getAll-schedule", scheduleController.getAllSchedule);
  //deletescheduleSchedule
  router.get("/remove-schedule", scheduleController.deleteSchedule);
  //getByIDschedule
  router.get("/getById-schedule", scheduleController.getByIdSchedule);

  //History
  router.post("/create-history", historyController.createHistory);
  //getAllHistoryHistory
  router.get("/getAll-history", historyController.getAllHistory);
  //deleteHistoryHistory
  router.get("/remove-history", historyController.deleteHistory);
  //getByIDHistory
  router.get("/getById-history", historyController.getByIdHistory);

  //doctor-clinic-specialty
  router.post(
    "/create-doctor-clinic-specialty",
    doctorClinicSpecialtyController.createDoctorClinicSpecialty
  );
  //updatedoctor-clinic-specialtydoctor-clinic-specialty
  router.post(
    "/update-doctor-clinic-specialty",
    doctorClinicSpecialtyController.updateDoctorClinicSpecialty
  );
  //getAlldoctor-clinic-specialtydoctor-clinic-specialty
  router.get(
    "/getAll-doctor-clinic-specialty",
    doctorClinicSpecialtyController.getAllDoctorClinicSpecialty
  );
  //deletedoctor-clinic-specialtydoctor-clinic-specialty
  router.get(
    "/remove-doctor-clinic-specialty",
    doctorClinicSpecialtyController.deleteDoctorClinicSpecialty
  );
  //getByIDdoctor-clinic-specialty
  router.get(
    "/getById-doctor-clinic-specialty",
    doctorClinicSpecialtyController.getByIdDoctorClinicSpecialty
  );

  //Clinic
  router.post("/create-clinic", clinicController.createClinic);
  //updateClinicClinic
  router.post("/update-clinic", clinicController.updateClinic);
  //getAllClinicClinic
  router.get("/getAll-clinic", clinicController.getAllClinic);
  //deleteClinicClinic
  router.get("/remove-clinic", clinicController.deleteClinic);
  //getByIDClinic
  router.get("/getById-clinic", clinicController.getByIdClinic);

  //Booking
  router.post("/create-booking", bookingController.createBooking);
  //updateBookingBooking
  router.post("/update-booking", bookingController.updateBooking);
  //getAllBookingBooking
  router.get("/getAll-booking", bookingController.getAllBooking);
  //deleteBookingBooking
  router.get("/remove-booking", bookingController.deleteBooking);
  //getByIDBooking
  router.get("/getById-booking", bookingController.getByIdBooking);

  //rest api
  return app.use("/api", router);
};

module.exports = initWebRoutes;

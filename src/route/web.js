import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import specialtyController from "../controllers/specialtyController";
import scheduleController from "../controllers/scheduleController";
import historyController from "../controllers/historyController";
import doctorClinicSpecialtyController from "../controllers/doctorClinicSpecialtyController";
import clinicController from "../controllers/clinicController";
import bookingController from "../controllers/bookingController";
import { checkLogin, checkAdmin } from "../middleware/authorization";
import { userDataValidate } from "../validation/userValidation";
import { updateDataValidate } from "../validation/updateValidator";

let router = express.Router();

let initWebRoutes = (app) => {
  //user
  //create for customer
  router.post("/register", userDataValidate, userController.createUser);
  //create for doctor
  router.post(
    "/register-doctor",
    userDataValidate,
    userController.createDoctor
  );
  //login
  router.post("/login", userController.loginUser);
  //getAllUser
  router.get("/get-user", userController.getUser);
  //DeleteUser
  router.delete("/remove-account", userController.deleteAccount);
  //updateUserDoctor
  router.put(
    "/update-account",
    updateDataValidate,
    userController.updateAccount
  );

  //specially
  router.post(
    "/create-specialty",
    checkLogin,
    checkAdmin,
    specialtyController.createSpecialty
  );
  //update
  router.post(
    "/update-specialty",
    checkLogin,
    checkAdmin,
    specialtyController.updateSpecialty
  );
  //getAll
  router.get(
    "/getAll-specialty",
    checkLogin,
    checkAdmin,
    specialtyController.getAllSpecialty
  );
  //delete
  router.get(
    "/remove-specialty",
    checkLogin,
    checkAdmin,
    specialtyController.deleteSpecialty
  );
  //getByID
  router.get(
    "/getById-specialty",
    checkLogin,
    checkAdmin,
    specialtyController.getByIdSpecialty
  );

  //Schedule
  router.post(
    "/create-schedule",
    checkLogin,
    checkAdmin,
    scheduleController.createSchedule
  );
  //updatescheduleSchedule
  router.post(
    "/update-schedule",
    checkLogin,
    checkAdmin,
    scheduleController.updateSchedule
  );
  //getAllscheduleSchedule
  router.get(
    "/getAll-schedule",
    checkLogin,
    checkAdmin,
    scheduleController.getAllSchedule
  );
  //deletescheduleSchedule
  router.get(
    "/remove-schedule",
    checkLogin,
    checkAdmin,
    scheduleController.deleteSchedule
  );
  //getByIDschedule
  router.get(
    "/getById-schedule",
    checkLogin,
    checkAdmin,
    scheduleController.getByIdSchedule
  );

  //History
  router.post(
    "/create-history",
    checkLogin,
    checkAdmin,
    historyController.createHistory
  );
  //getAllHistoryHistory
  router.get(
    "/getAll-history",
    checkLogin,
    checkAdmin,
    historyController.getAllHistory
  );
  //deleteHistoryHistory
  router.get(
    "/remove-history",
    checkLogin,
    checkAdmin,
    historyController.deleteHistory
  );
  //getByIDHistory
  router.get(
    "/getById-history",
    checkLogin,
    checkAdmin,
    historyController.getByIdHistory
  );

  //doctor-clinic-specialty
  router.post(
    "/create-doctor-clinic-specialty",
    checkLogin,
    checkAdmin,
    doctorClinicSpecialtyController.createDoctorClinicSpecialty
  );
  //updatedoctor-clinic-specialtydoctor-clinic-specialty
  router.post(
    "/update-doctor-clinic-specialty",
    checkLogin,
    checkAdmin,
    doctorClinicSpecialtyController.updateDoctorClinicSpecialty
  );
  //getAlldoctor-clinic-specialtydoctor-clinic-specialty
  router.get(
    "/getAll-doctor-clinic-specialty",
    checkLogin,
    checkAdmin,
    doctorClinicSpecialtyController.getAllDoctorClinicSpecialty
  );
  //deletedoctor-clinic-specialtydoctor-clinic-specialty
  router.get(
    "/remove-doctor-clinic-specialty",
    checkLogin,
    checkAdmin,
    doctorClinicSpecialtyController.deleteDoctorClinicSpecialty
  );
  //getByIDdoctor-clinic-specialty
  router.get(
    "/getById-doctor-clinic-specialty",
    checkLogin,
    checkAdmin,
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
  router.post("/create-booking", checkLogin, bookingController.createBooking);
  //updateBookingBooking
  router.post("/update-booking", checkLogin, bookingController.updateBooking);
  //getAllBookingBooking
  router.get(
    "/getAll-booking",
    checkLogin,
    checkAdmin,
    bookingController.getAllBooking
  );
  //deleteBookingBooking
  router.get(
    "/remove-booking",
    checkLogin,
    checkAdmin,
    bookingController.deleteBooking
  );
  //getByIDBooking
  router.get(
    "/getById-booking",
    checkLogin,
    checkAdmin,
    bookingController.getByIdBooking
  );

  //rest api
  return app.use("/api", router);
};

module.exports = initWebRoutes;

import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneInstructor,
  updateInstructor,
} from "../../Store/InstructorSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function EditInstructor() {
  const [isLoading, setIsLoading] = useState(false);
  const toastError = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
  };
  const successNotification = {
    position: "top-center",
    autoClose: 1500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOneInstructor(id));
  }, [dispatch,id]);

  const { editinstructor } = useSelector((state) => state.instructor);

  const [instructor, setInstructor] = useState({
    instructor_name: "",
    instructor_phone: "",
    instructor_email: "",
    instructor_address: "",
    instructor_courses: "",
  });
  useEffect(() => {
    setInstructor({
      instructor_name: editinstructor.instructor_name || "",
      instructor_phone: editinstructor.instructor_phone || "",
      instructor_email: editinstructor.instructor_email || "",
      instructor_address: editinstructor.instructor_address || "",
      instructor_courses: editinstructor.instructor_courses || "",
    });
  }, [editinstructor]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor({ ...instructor, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!instructor.instructor_name) {
      newErrors.instructor_name = "Instructor Name is required";
    } else if (!instructor.instructor_phone) {
      newErrors.instructor_phone = "Instructor Phone is required";
    } else if (!instructor.instructor_email) {
      newErrors.instructor_email = "Instructor Email is required";
    } else if (!instructor.instructor_courses) {
      newErrors.instructor_courses = "Instructor Courses is required";
    }

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      const { payload } = await dispatch(
        updateInstructor({ id: id, formData: instructor })
      );
      setIsLoading(false);
      if (payload === undefined) {
        toast.error("Something went wrong!", toastError);
      } else {
        toast(payload.msg, successNotification);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="content-body" style={{ minHeight: "835px" }}>
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Edit Instructor</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>Instructor</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>Edit Instructor</Link>
                </li>
              </ol>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12 col-xxl-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    {" "}
                    <i className="fa-solid fa-circle-plus"></i> Edit Instructor
                    Details
                  </h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Instructor Name</label>
                          <input
                            type="text"
                            name="instructor_name"
                            value={instructor.instructor_name}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="error">
                            {errors.instructor_name}
                          </span>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Phone Number</label>
                          <input
                            type="text"
                            name="instructor_phone"
                            value={instructor.instructor_phone}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="error">
                            {errors.instructor_phone}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Email ID</label>
                          <input
                            type="text"
                            name="instructor_email"
                            value={instructor.instructor_email}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="error">
                            {errors.instructor_email}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Courses</label>
                          <input
                            type="text"
                            name="instructor_courses"
                            value={instructor.instructor_courses}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="error">
                            {errors.instructor_courses && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.instructor_courses}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label">Address</label>
                          <textarea
                            type="text"
                            name="instructor_address"
                            value={instructor.instructor_address}
                            onChange={handleChange}
                            className="form-control"
                            rows={2}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn_lg btn-rounded"
                        >
                          {isLoading && (
                            <span
                              className="spinner-grow spinner-grow-sm me-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                          Submit
                        </button>
                        <Link to={"/all-instructor"}
                          type="button"
                          className="btn btn-light btn_lg btn-rounded"
                        >
                          Cencel
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

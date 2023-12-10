import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCourse } from "../../Store/CourseSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./CourseStyle.css";

export default function AddCourse() {
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
  const [formData, setFormData] = useState({
    // date: new Date().toLocaleDateString(),
    course_name: "",
    course_category: "",
    course_duration: "",
    course_fees: "",
    course_details: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.course_name) {
      newErrors.course_name = "Course Name is required";
    } else if (!formData.course_category) {
      newErrors.course_category = "Course Category is required";
    } else if (!formData.course_duration) {
      newErrors.course_duration = "Course Duration is required";
    } else if (!formData.course_fees) {
      newErrors.course_fees = "Course Fees is required";
    }
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      const { payload } = await dispatch(addCourse(formData));
      console.log(payload);
      setIsLoading(false);
      if (payload === undefined) {
        toast.error("Something went wrong!", toastError);
      } else {
        if(payload.status===200){
          toast(payload.msg, successNotification);
        }else{
          toast.error(payload.msg, toastError);
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="content-body" style={{ minheight: "835px" }}>
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Add Course</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>Courses</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>Add Course</Link>
                </li>
              </ol>
            </div>
          </div>
          <div className="add-new-section">
            <Link
              type="submit"
              className="btn btn-rounded btn-secondary"
              to={"/all-course"}
            >
              <span className="btn-icon-left text-secondary">
                <i className="fa-solid fa-list color-secondary"></i>{" "}
              </span>
              All Courses
            </Link>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">
                    <i className="fa-solid fa-circle-plus"></i> Add Course Details
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Course Name <span className="spancolor">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="course_name"
                            value={formData.course_name}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {errors.course_name && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.course_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Course Category <span className="spancolor">*</span>
                          </label>
                          <select
                            className="form-control"
                            id="example-select"
                            name="course_category"
                            value={formData.course_category}
                            onChange={handleChange}
                          >
                            <option value=" ">---Select Category---</option>
                            <option value="Web and App Development">
                              Web and App Development
                            </option>
                            <option value="Digital Marketing">
                              Digital Marketing
                            </option>
                            <option value="Sales">Sales</option>
                          </select>
                          <span className="error">
                            {errors.course_category && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.course_category}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Course Duration <span className="spancolor">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="course_duration"
                            value={formData.course_duration}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {errors.course_duration && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.course_duration}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Course Fees <span className="spancolor">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="course_fees"
                            value={formData.course_fees}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {errors.course_fees && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.course_fees}
                          </span>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Course Details</label>
                          <textarea
                            className="form-control"
                            rows="2"
                            name="course_details"
                            value={formData.course_details}
                            onChange={handleChange}
                          ></textarea>
                          <span className="error">
                            {errors.course_details && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.course_details}
                          </span>
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
                        <button
                          type="button"
                          className="btn btn-light btn_lg btn-rounded"
                        >
                          Cancel
                        </button>
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

import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneCourse, updateCourse } from "../../Store/CourseSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./CourseStyle.css";

export default function EditCourse() {
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

  const {selectedCourseId} = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getOneCourse(selectedCourseId!==null?selectedCourseId:localStorage.getItem("courseid")));
  }, []);

  const { editcourse } = useSelector((state) => state.course);

  const [formData, setFormData] = useState({
    course_name: "",
  course_category: "",
  course_duration: "",
  course_fees: "",
  course_details: "",
  });
  useEffect(() => {
    if (editcourse) {
      setFormData({
        course_name: editcourse.course_name || "",
        course_category: editcourse.course_category || "",
        course_duration: editcourse.course_duration || "",
        course_fees: editcourse.course_fees || "",
        course_details: editcourse.course_details || "",
      });
    }
  }, [editcourse]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleUpdate = async (e) => {
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
      console.log(formData);
      const {payload} = await dispatch(updateCourse({id:selectedCourseId!==null?selectedCourseId:localStorage.getItem("courseid"),formData:formData}));
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
      <div className="content-body" style={{ minheight: "835px" }}>
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Edit Course</h4>
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
                  <Link>Edit Course</Link>
                </li>
              </ol>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">
                    <i className="fa-solid fa-circle-plus"></i> Edit Course Details
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleUpdate}>
                    <div className="row">
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Course Name</label>
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
                          <label className="form-label">Course Category</label>
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
                          <label className="form-label">Course Duration</label>
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
                          <label className="form-label">Course Fees</label>
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
                        <Link
                          type="button"
                          className="btn btn-light btn_lg btn-rounded"
                          to={"/all-course"}
                        >
                          Cancel
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

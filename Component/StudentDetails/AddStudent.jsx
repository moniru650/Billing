import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStudent, getAllStudent } from "../../Store/StudentSlice";
import { getAllCourse } from "../../Store/CourseSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function AddStudent() {
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

  useEffect(() => {
    dispatch(getAllCourse());
    dispatch(getAllStudent());
  }, [dispatch]);
  const { allcourse } = useSelector((state) => state.course);
  const { allstudent } = useSelector((state) => state.student);

  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    reg_no: `REG-000${allstudent?.length + 1}`,
    course: "",
    installment_breakup:"",
    gender: "",
    mobile_no: "",
    guardian_name: "",
    guardian_mobile_no: "",
    date_of_birth: "",
    fees_type:"",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    console.log("Test");
    e.preventDefault();
    const newErrors = {};
    if (!student.first_name) {
      newErrors.first_name = "First name is required";
    } else if (!student.last_name) {
      newErrors.last_name = "Last name is required";
    } else if (!student.email) {
      newErrors.email = "Email is required";
    } else if (!student.reg_no) {
      newErrors.reg_no = "Registration no. is required";
    } else if (!student.course) {
      newErrors.course = "Course is required";
    }  else if (!student.installment_breakup) {
      newErrors.installment_breakup = "Please select installment breakup";
    } else if (!student.gender) {
      newErrors.gender = "Gender is required";
    } else if (!student.mobile_no) {
      newErrors.mobile_no = "Mobile no is required";
    } else if (student.mobile_no.length!==10) {
      newErrors.mobile_no = "Mobile no is invalid";
    }
     else if (!student.guardian_name) {
      newErrors.guardian_name = "Guardian name is required";
    } else if (!student.guardian_mobile_no) {
      newErrors.guardian_mobile_no = "Guardian mobile no is required";
    } else if (student.guardian_mobile_no.length!==10) {
      newErrors.guardian_mobile_no = "Guardian mobile is invalid";
    }else if (!student.date_of_birth) {
      newErrors.date_of_birth = "Birth date is required";
    } else if (!student.fees_type) {
      newErrors.fees_type = "Fees Type is required";
    }
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      const { payload } = await dispatch(addStudent(student));
      setIsLoading(false);
      if (payload.status !== 200) {
        toast.error(payload.msg, toastError);
      } else {
        toast(payload.msg, successNotification);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Add Student</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>Students</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>Add Student</Link>
                </li>
              </ol>
            </div>
          </div>

          <div className="add-new-section">
            <Link
              type="submit"
              className="btn btn-rounded btn-secondary"
              to={"/all-student"}
            >
              <span class="btn-icon-left text-secondary">
                <i class="fa-solid fa-list color-secondary"></i>{" "}
              </span>
              All Student
            </Link>
          </div>

          <div className="row">
            <div className="col-xl-12 col-xxl-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <i class="fa-solid fa-circle-plus"></i> Add Student Details
                  </h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            First Name <span className="spancolor">*</span>
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            value={student.first_name}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="error">
                            {errors.first_name && (
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.first_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Last Name <span className="spancolor">*</span>
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            value={student.last_name}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="error">
                            {errors.last_name && (
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.last_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Email <span className="spancolor">*</span>
                          </label>
                          <input
                            type="text"
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="error">
                            {errors.email && (
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.email}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Reg. No.{" "}
                            <span className="spancolor">*</span>
                          </label>
                          <input
                            type="text"
                            name="reg_no"
                            value={student.reg_no}
                            onChange={handleChange}
                            className="form-control"
                            disabled
                          />
                          <span className="error">{errors.reg_no}</span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Course <span className="spancolor">*</span>
                          </label>
                          <select
                            class="form-control"
                            id="example-select"
                            name="course"
                            value={student.course}
                            onChange={handleChange}
                          >
                            <option value=" ">---Select Course---</option>
                            {allcourse &&
                              allcourse.map((course,idx) => (
                                <>
                                  <option key={idx} value={course.course_name}>
                                    {course.course_name}
                                  </option>
                                </>
                              ))}
                          </select>
                          <span className="error">
                            {errors.course && (
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.course}
                          </span>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Install. Breakup (Months)<span className="spancolor">*</span>
                          </label>
                          <select
                            class="form-control"
                            id="example-select"
                            name="installment_breakup"
                            value={student.installment_breakup}
                            onChange={handleChange}
                          >
                            <option value=" ">---Select Months---</option>
                            {[1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18].map((months,idx)=>(
                              <option key={idx} value={months}>{months} Months</option>
                            ))}
                            
                          </select>
                          <span className="error">
                            {errors.installment_breakup && (
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.installment_breakup}
                          </span>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Gender <span className="spancolor">*</span>
                          </label>
                          <select
                            class="form-control"
                            id="example-select"
                            name="gender"
                            value={student.gender}
                            onChange={handleChange}
                          >
                            <option value=" ">---Select Gender---</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          <span className="error">
                            {errors.gender && (
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.gender}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Mobile No <span className="spancolor">*</span>
                          </label>
                          <input
                            type="number"
                            name="mobile_no"
                            value={student.mobile_no}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="error">
                            {errors.mobile_no && (
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.mobile_no}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Guardian Name <span className="spancolor">*</span>
                          </label>
                          <input
                            type="text"
                            name="guardian_name"
                            value={student.guardian_name}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="error">
                            {errors.guardian_name && (
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.guardian_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Guardian Mobile No.{" "}
                            <span className="spancolor">*</span>
                          </label>
                          <input
                            type="number"
                            name="guardian_mobile_no"
                            value={student.guardian_mobile_no}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="error">
                            {errors.guardian_mobile_no && (
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.guardian_mobile_no}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Date of Birth <span className="spancolor">*</span>
                          </label>
                          <input
                            type="date"
                            name="date_of_birth"
                            value={student.date_of_birth}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="error">
                            {errors.date_of_birth && (
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.date_of_birth}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Fees Type <span className="spancolor">*</span>
                          </label>
                          <select
                            class="form-control"
                            id="example-select"
                            name="fees_type"
                            value={student.fees_type}
                            onChange={handleChange}
                          >
                            <option value=" ">---Select Fees Type---</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Per Month">Per Month</option>
                          </select>
                          <span className="error">
                            {errors.fees_type && (
                              <i class="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {errors.fees_type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Address</label>
                          <textarea
                            className="form-control"
                            name="address"
                            value={student.address}
                            onChange={handleChange}
                            rows="2"
                          ></textarea>
                          <span className="error">{errors.address}</span>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn_lg btn-rounded"
                        >
                          {isLoading && (
                            <span
                              class="spinner-grow spinner-grow-sm me-1"
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
                          Cencel
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

import React, { useState,useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addInstructor } from "../../Store/InstructorSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";
import { getAllCourse } from "../../Store/CourseSlice";

export default function AddInstructor() {
  useEffect(() => {
    dispatch(getAllCourse());
  }, []);
  const { allcourse } = useSelector((state) => state.course);

  const options=allcourse && allcourse.map((course)=>{
    return { label:course.course_name , value: course.course_name }
  })

  const [selected, setSelected] = useState([]);

    
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

  const [instructor, setInstructor] = useState({
    instructor_name: "",
    instructor_phone: "",
    instructor_email: "",
    instructor_address: "",
    instructor_courses: selected,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor({ ...instructor, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleChangeCourses = (selectedOptions) => {
    setSelected(selectedOptions);
    const selectedCourseNames = selectedOptions.map((option) => option.value).join(', ');
    setInstructor({
      ...instructor,
      instructor_courses: selectedCourseNames,
    });
    setErrors({
      ...errors,
      instructor_courses: '',
    });
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
    } else if (selected.length===0) {
      newErrors.instructor_courses = "Instructor Courses is required";
    }

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      const resultString = selected.map(item => item.value).join(', ');
      setInstructor({...instructor,instructor_courses:resultString});
      const { payload } = await dispatch(addInstructor(instructor));
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
      console.log(instructor);
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
                <h4>Add Instructor</h4>
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
                  <Link>Add Instructor</Link>
                </li>
              </ol>
            </div>
          </div>

          <div className="add-new-section">
            <Link
              type="submit"
              className="btn btn-rounded btn-secondary"
              to={"/all-instructor"}
            >
              <span className="btn-icon-left text-secondary">
                <i className="fa-solid fa-list color-secondary"></i>{" "}
              </span>
              All Instructor
            </Link>
          </div>

          <div className="row">
            <div className="col-xl-12 col-xxl-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    {" "}
                    <i className="fa-solid fa-circle-plus"></i> Add Instructor
                    Details
                  </h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Instructor Name <span className="spancolor">*</span></label>
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

                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Mobile Number <span className="spancolor">*</span></label>
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
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Email ID <span className="spancolor">*</span></label>
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
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Courses <span className="spancolor">*</span></label>
                          
                          <MultiSelect
                            options={options}
                            value={selected}
                            onChange={handleChangeCourses}
                            labelledBy="Select"
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
                          <span className="error">
                            {errors.instructor_address}
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
                        <Link
                          type="button"
                          className="btn btn-light btn_lg btn-rounded"
                          to={"/"}
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

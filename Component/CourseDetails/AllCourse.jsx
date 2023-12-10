import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllCourse,
  deleteCourse,
  getOneCourse,
  setSelectedCourseId
} from "../../Store/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default function AllCourse() {
  const dispatch = useDispatch();
  const handleEdit = (courseId) => {
    localStorage.setItem("courseid", courseId);
    dispatch(setSelectedCourseId(courseId));
  };
  useEffect(() => {
    dispatch(getAllCourse());
  }, []);
  const { allcourse } = useSelector((state) => state.course);
  const { editcourse } = useSelector((state) => state.course);
  const fetchCourse = (id) => {
    dispatch(getOneCourse(id));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCourse(id)).then(() => {
          dispatch(getAllCourse());
        });
      }
    });
  };
  return (
    <>
      <div className="content-body" style={{ minHeight: "835px" }}>
        <div
          className="modal fade bd-example-modal-lg"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-body modal-parent">
                <div className="row">
                  <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card modal-content-inner">
                      <div className="card-header">
                        <h5 className="card-title">
                          <i className="fa-solid fa-circle-info"></i> Instructor
                          Details
                        </h5>
                      </div>
                      <div className="card-body student-details-show">
                        <div className="row">
                          <div className="col-lg-6">
                            <p>
                              Creation Date :
                              {new Date(
                                editcourse?.creation_date
                              ).toLocaleDateString()}
                            </p>
                            <p>Course Name : {editcourse?.course_name}</p>
                            <p>Category : {editcourse?.course_category}</p>
                            <p>
                              Duration : {editcourse?.course_duration} Months
                            </p>
                            <p>Total Fees : {editcourse?.course_fees}</p>
                            <p>Details : {editcourse?.course_details}</p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>All Courses</h4>
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
                  <Link>All Courses</Link>
                </li>
              </ol>
            </div>
          </div>

          <div className="add-new-section">
            <Link
              type="submit"
              className="btn btn-rounded btn-secondary"
              to={"/add-course"}
            >
              <span className="btn-icon-left text-secondary">
                <i className="fa-solid fa-plus color-secondary"></i>{" "}
              </span>
              Add Course
            </Link>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <i className="fa-solid fa-table"></i> All Courses Details
                  </h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm text-center">
                      <thead>
                        <tr>
                          <th>SL. No.</th>
                          <th>Date</th>
                          <th>Course Name</th>
                          <th>Category</th>
                          <th>Duration</th>
                          <th>Fees</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allcourse && allcourse.length > 0 ? (
                          allcourse.map((course, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>
                                {new Date(
                                  course.creation_date
                                ).toLocaleDateString()}
                              </td>
                              <td>{course.course_name}</td>
                              <td>{course.course_category}</td>
                              <td>{course.course_duration} Months</td>
                              <td>{course.course_fees}</td>
                              <td>
                                <div className="d-flex flex-direction-row action-items">
                                  <Link
                                    className="btn btn-info action-button"
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={() => fetchCourse(course?._id)}
                                  >
                                    <i className="fa fa-circle-info"></i>
                                  </Link>
                                  <Link
                                    // to={`/edit-course/${course._id}`}
                                    to={`/edit-course`}
                                    onClick={()=>handleEdit(course._id)}
                                    className="btn btn-primary action-button"
                                  >
                                    <i className="fa-solid fa-pencil"></i>
                                  </Link>
                                  <Link
                                    onClick={() => handleDelete(course._id)}
                                    className="btn btn-danger action-button"
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">No courses available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    {
                      allcourse && allcourse.length > 4 ? <nav className="d-flex justify-content-center">
                      <ul class="pagination pagination-sm pagination-circle">
                        <li class="page-item page-indicator">
                          <a class="page-link" href="javascript:void()">
                            <i class="icon-arrow-left"></i>
                          </a>
                        </li>
                        <li class="page-item active">
                          <a class="page-link" href="javascript:void()">
                            1
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="javascript:void()">
                            2
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="javascript:void()">
                            3
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="javascript:void()">
                            4
                          </a>
                        </li>
                        <li class="page-item page-indicator">
                          <a class="page-link" href="javascript:void()">
                            <i class="icon-arrow-right"></i>
                          </a>
                        </li>
                      </ul>
                    </nav> : null 
                    }
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

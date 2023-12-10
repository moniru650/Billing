import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllInstructor,
  deleteInstructor,
  getOneInstructor,
} from "../../Store/InstructorSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default function AllInstructor() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllInstructor());
  }, []);
  const { allinstructor } = useSelector((state) => state.instructor);
  const { editinstructor } = useSelector((state) => state.instructor);
  const fetchInstructor = (id) => {
    dispatch(getOneInstructor(id));
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
        dispatch(deleteInstructor(id)).then(() => {
          dispatch(getAllInstructor());
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
                                editinstructor?.creation_date
                              ).toLocaleDateString()}
                            </p>
                            <p>
                              Instructor Name :{" "}
                              {editinstructor?.instructor_name}
                            </p>
                            <p>Mobile : {editinstructor?.instructor_phone}</p>
                            <p>Email : {editinstructor?.instructor_email}</p>
                            <p>
                              Courses : {editinstructor?.instructor_courses}
                            </p>
                            <p>
                              Address : {editinstructor?.instructor_address}
                            </p>
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
                <h4>All Instructor</h4>
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
                  <Link>All Instructor</Link>
                </li>
              </ol>
            </div>
          </div>
          <div className="add-new-section">
            <Link
              type="submit"
              className="btn btn-rounded btn-secondary"
              to={"/add-instructor"}
            >
              <span className="btn-icon-left text-secondary">
                <i className="fa-solid fa-plus color-secondary"></i>{" "}
              </span>
              Add Instructor
            </Link>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <i className="fa-solid fa-table"></i> All Instructor Details
                  </h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm text-center">
                      <thead>
                        <tr>
                          <th>SL. No.</th>
                          <th>Date</th>
                          <th>Instructor</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Course</th>
                          <th>Address</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allinstructor && allinstructor.length > 0 ? (
                          allinstructor.map((instructor, idx) => (
                            <tr key={instructor._id}>
                              <td>{idx + 1}</td>
                              <td>
                                {new Date(
                                  instructor?.creation_date
                                ).toLocaleDateString()}
                              </td>
                              <td>{instructor?.instructor_name}</td>
                              <td>{instructor?.instructor_phone}</td>
                              <td>{instructor?.instructor_email}</td>
                              <td>{instructor?.instructor_courses}</td>
                              <td>{instructor?.instructor_address}</td>
                              <td>
                                <div className="d-flex flex-direction-row action-items">
                                  <Link
                                    className="btn btn-info action-button"
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={() =>
                                      fetchInstructor(instructor?._id)
                                    }
                                  >
                                    <i className="fa fa-circle-info"></i>
                                  </Link>
                                  <Link
                                    to={`/edit-instructor/${instructor?._id}`}
                                    className="btn btn-primary action-button"
                                  >
                                    <i className="fa-solid fa-pencil"></i>
                                  </Link>
                                  <Link
                                    onClick={() =>
                                      handleDelete(instructor?._id)
                                    }
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
                            <td colSpan="8">No instructors available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    {
                      allinstructor && allinstructor.length > 4 ? <nav className="d-flex justify-content-center">
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

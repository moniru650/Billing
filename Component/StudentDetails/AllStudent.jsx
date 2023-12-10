import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllStudent,
  deleteStudent,
  getOneStudent,
} from "../../Store/StudentSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useDispatch, useSelector } from "react-redux";

export default function AllStudent() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStudent());
  }, [dispatch]);

  const { allstudent } = useSelector((state) => state.student);
  const { editstudent } = useSelector((state) => state.student);

  const fetchStudent = (id) => {
    dispatch(getOneStudent(id));
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
        dispatch(deleteStudent(id)).then(() => {
          dispatch(getAllStudent());
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
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body modal-parent">
                <div className="row">
                  <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card modal-content-inner">
                      <div className="card-header">
                        <h5 className="card-title">
                          <i className="fa-solid fa-circle-info"></i> Student
                          Details
                        </h5>
                      </div>
                      <div className="card-body student-details-show">
                        <div className="row">
                          <div className="col-lg-6">
                            <p>
                              Registration Date :
                              {new Date(
                                editstudent?.registration_date
                              ).toLocaleDateString()}
                            </p>
                            <p>First Name : {editstudent?.first_name}</p>
                            <p>Last Name : {editstudent?.last_name}</p>
                            <p>Email : {editstudent?.email}</p>
                            <p>Registratin No. : {editstudent?.reg_no}</p>
                            <p>Course : {editstudent?.course}</p>
                            <p>Gender. : {editstudent?.gender}</p>
                          </div>
                          <div className="col-lg-6">
                            <p>Mobile : {editstudent?.mobile_no}</p>
                            <p>Guardian Name : {editstudent?.guardian_name}</p>
                            <p>Guardian Mobile : {editstudent?.guardian_mobile_no}</p>
                            <p>Date of Birth : {new Date(
                                editstudent?.date_of_birth
                              ).toLocaleDateString()}</p>
                            <p>Installment Type : {editstudent?.fees_type}</p>
                            <p>Blood Group : {editstudent?.blood_group}</p>
                            <p>Address : {editstudent?.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
                <h4>All Student</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>Student</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>All Student</Link>
                </li>
              </ol>
            </div>
          </div>

          <div className="add-new-section">
            <Link
              type="submit"
              className="btn btn-rounded btn-secondary"
              to={"/add-student"}
            >
              <span className="btn-icon-left text-secondary">
                <i className="fa-solid fa-plus color-secondary"></i>{" "}
              </span>
              Add Student
            </Link>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <i className="fa-solid fa-table"></i> All Student's Details
                  </h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm text-center">
                      <thead>
                        <tr>
                          <th>SL. No.</th>
                          <th>Reg. Date</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Reg. No.</th>
                          <th>Course</th>
                          <th>Mobile No.</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                            {allstudent && allstudent.length > 0 ? (
                              allstudent.map((student,idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>
                                {new Date(
                                  student?.registration_date
                                ).toLocaleDateString()}
                              </td>
                              <td>
                                {student?.first_name} {student?.last_name}
                              </td>
                              <td>{student?.email}</td>
                              <td>{student.reg_no}</td>
                              <td>{student?.course}</td>
                              <td>{student?.mobile_no}</td>

                              <td>
                                <div className="d-flex flex-direction-row action-items">
                                  <Link
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    className="btn btn-info action-button"
                                    onClick={() => fetchStudent(student?._id)}
                                  >
                                    <i className="fa fa-circle-info"></i>
                                  </Link>
                                  <Link
                                    to={`/edit-student/${student?._id}`}
                                    className="btn btn-primary action-button"
                                  >
                                    <i className="fa-solid fa-pencil"></i>
                                  </Link>
                                  <Link
                                    onClick={() => {
                                      handleDelete(student._id);
                                    }}
                                    className="btn btn-danger action-button"
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))) : (
                            <tr>
                              <td colSpan="7">No student available</td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                    {
                      allstudent && allstudent.length > 4 ? <nav className="d-flex justify-content-center">
                      <ul class="pagination pagination-sm pagination-circle">
                        <li class="page-item page-indicator">
                          <Link class="page-link">
                            <i class="icon-arrow-left"></i>
                          </Link>
                        </li>
                        <li class="page-item active">
                          <Link class="page-link">
                            1
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link">
                            2
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link">
                            3
                          </Link>
                        </li>
                        <li class="page-item">
                          <Link class="page-link">
                            4
                          </Link>
                        </li>
                        <li class="page-item page-indicator">
                          <Link class="page-link">
                            <i class="icon-arrow-right"></i>
                          </Link>
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

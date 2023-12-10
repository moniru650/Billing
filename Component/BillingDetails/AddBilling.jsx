import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllStudent,
  getOneStudent,
  addStudent,
} from "../../Store/StudentSlice";
import { addInstallment, searchByReg } from "../../Store/InstallmentSlice";
import { getAllInstallment } from "../../Store/InstallmentSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function AddBilling() {
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
    dispatch(getAllStudent());
    dispatch(getAllInstallment());
  }, []);
  const { allinstallment } = useSelector((state) => state.installment);
  const { allstudent, editstudent } = useSelector((state) => state.student);
  const { searchbyreg } = useSelector((state) => state.installment);

  const [billNo, setBIllNo] = useState();

  const fetchStudentDetails = (id, idx) => {
    setBilling({ installment_no: "", installment_amount: "" });
    setBIllNo(`B-000${allinstallment?.length + 1}`);
    dispatch(getOneStudent(id));
    dispatch(searchByReg(allstudent[idx]));
  };

  const [billing, setBilling] = useState({
    bill_no: "",
    reg_no: "",
    first_name: "",
    last_name: "",
    email: "",
    course_name: "",
    course_fees:"",
    mobile_no: "",
    guardian_mobile_no: "",
    installment_no: "",
    installment_amount: "",
    installment_due: "",
    pay_per_month:""
  });
  const[addInfo,setAddInfo]=useState({
    pay_per_month:""
  });

  useEffect(() => {
    setBilling({
      bill_no: `B-000${allinstallment?.length + 1}` || "",
      reg_no: editstudent.reg_no || "",
      first_name: editstudent.first_name || "",
      last_name: editstudent.last_name || "",
      email: editstudent.email || "",
      course_name: editstudent.course || "",
      course_fees:searchbyreg.course_fees || "",
      mobile_no: editstudent.mobile_no || "",
      payment_mode: editstudent.payment_mode || "",
      installment_no: searchbyreg.inst_no || "",
    });
    setAddInfo({
      pay_per_month:searchbyreg.pay_per_month || ""
    })
  }, [editstudent, searchbyreg]);

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBilling({ ...billing, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!billing.first_name) {
      newErrors.first_name = "first name is required";
    } else if (!billing.last_name) {
      newErrors.last_name = " last name is required";
    } else if (!billing.course_name) {
      newErrors.course_name = "course name is required ";
    } else if (!billing.mobile_no) {
      newErrors.mobile_no = " mobile no is required";
    } else if (!billing.payment_mode) {
      newErrors.payment_mode = "Payment mode is required";
    } else if (!billing.installment_no) {
      newErrors.installment_no = "Installment no is required";
    } else if (!billing.installment_amount) {
      newErrors.installment_amount = "installment amount required";
    }
    console.log(billing);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      const { payload } = await dispatch(addInstallment(billing));
      dispatch(searchByReg(payload?.resp));
      console.log(payload,"Add114");
      setIsLoading(false);
      if (payload.status !== 200) {
        toast.error(payload.msg, toastError);
      } else {
        

        dispatch(getAllInstallment()).then((resp) => {
          const currentBillNumber = parseInt(resp.payload.data[resp.payload.data.length - 1].bill_no.split("-")[1]);
          setBIllNo(`B-000${currentBillNumber + 1}`);

          setBilling((prevBilling) => ({
            ...prevBilling,
            bill_no:`B-000${currentBillNumber+1}`,
            installment_amount: "",
            payment_mode: "",
          }));
        });
        
        toast(payload.msg, successNotification);
      }
    } else {
      setError(newErrors);
    }
  };

  return (
    <>
      <div className="content-body" style={{ minheight: "835px" }}>
        <div
          className="modal fade bd-example-modal-lg"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <div className="row">
                  <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title">
                          <i className="fa-solid fa-circle-plus"></i> Generate Bill
                        </h5>
                      </div>
                      <div className="card-body">
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12">
                              <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                  type="text"
                                  name="first_name"
                                  value={
                                    billing.first_name + " " + billing.last_name
                                  }
                                  onChange={handleChange}
                                  className="form-control"
                                  disabled
                                />
                                <span className="error">
                                  {error.first_name}
                                </span>
                              </div>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-12">
                              <div className="form-group">
                                <label className="form-label">
                                  Course Name
                                </label>
                                <input
                                  type="text"
                                  name="course_name"
                                  value={billing.course_name}
                                  onChange={handleChange}
                                  className="form-control"
                                  disabled
                                />
                                <span className="error">
                                  {error.course_name}
                                </span>
                              </div>
                            </div>
                            
                            <div className="col-lg-3 col-md-6 col-sm-12">
                              <div className="form-group mb-4">
                                <label className="form-label">Bill No.</label>
                                <input
                                  type="text"
                                  name="bill_no"
                                  value={billNo}
                                  className="form-control"
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                              <div className="form-group mb-4">
                                <label className="form-label">Payable Amount</label>
                                <input
                                  type="text"
                                  name="pay_per_month"
                                  value={addInfo.pay_per_month}
                                  onChange={handleChange}
                                  className="form-control"
                                  disabled
                                />
                                <span className="error">{error.pay_per_month}</span>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                              <div className="form-group mb-4">
                                <label className="form-label">
                                  Install. No
                                </label>
                                <input
                                  type="text"
                                  name="installment_no"
                                  value={billing?.installment_no}
                                  onChange={handleChange}
                                  className="form-control"
                                  disabled
                                />
                                <span className="error">
                                  {error.installment_no}
                                </span>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                              <div className="form-group">
                                <label className="form-label">
                                  Payment Mode
                                </label>
                                <input
                                  type="text"
                                  name="payment_mode"
                                  value={billing.payment_mode}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                                <span className="error">
                                  {error.payment_mode}
                                </span>
                              </div>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-12">
                              <div className="form-group">
                                <label className="form-label">
                                  Install. Amount
                                </label>
                                <input
                                  type="text"
                                  name="installment_amount"
                                  value={billing.installment_amount}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                                <span className="error">
                                  {error.installment_amount}
                                </span>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                              <div className="form-group mb-4">
                                <label className="form-label">
                                  Install. Due
                                </label>
                                <input
                                  type="text"
                                  name="installment_due"
                                  value={searchbyreg.due}
                                  onChange={handleChange}
                                  className="form-control"
                                  disabled
                                />
                                <span className="error">
                                  {error.installment_due}
                                </span>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12"></div>
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
                                data-dismiss="modal"
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
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Add Billing</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link>Billing</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>Add Billing</Link>
                </li>
              </ol>
            </div>
          </div>
          <div className="add-new-section">
            <Link
              type="submit"
              className="btn btn-rounded btn-secondary"
              to={"/all-billing"}
            >
              <span className="btn-icon-left text-secondary">
                <i className="fa-solid fa-list color-secondary"></i>{" "}
              </span>
              All Bills
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
                          <th>Gender</th>
                          <th>Mobile No.</th>
                        </tr>
                      </thead>
                      <tbody>
                            {allstudent && allstudent.length > 0 ? (
                              allstudent.map((student,idx) => (
                            <tr
                            key={idx}

                              data-toggle="modal"
                              data-target=".bd-example-modal-lg"
                              onClick={() =>
                                fetchStudentDetails(student._id, idx)
                              }
                            >
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
                              <td>{student?.gender}</td>
                              <td>{student?.mobile_no}</td>
                              <td>
                                <div className="d-flex flex-direction-row action-items"></div>
                              </td>
                            </tr>
                          ))
                          ) : (
                            <tr>
                              <td colSpan="7">No student available</td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
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

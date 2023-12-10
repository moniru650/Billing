import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneInstallment,
  updateInstallment,
} from "../../Store/InstallmentSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function EditBilling() {
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
    dispatch(getOneInstallment(id));
  }, []);

  const { editinstallment } = useSelector((state) => state.installment);

  const [billing, setBilling] = useState({
    reg_no: "",
    bill_no: "",
    first_name: "",
    last_name: "",
    email: "",
    course_name: "",
    // mobile_no: editinstallment.mobile_no,
    payment_mode:"",
    installment_no: "",
    installment_amount: "",
  });
  useEffect(() => {
    setBilling({
      reg_no: editinstallment.reg_no || "",
      bill_no: editinstallment.bill_no || "",
      first_name: editinstallment.first_name || "",
      last_name: editinstallment.last_name || "",
      email: editinstallment.email || "",
      course_name: editinstallment.course_name || "",
      // mobile_no: editinstallment.mobile_no,
      payment_mode:editinstallment.payment_mode || "",
      installment_no: editinstallment.installment_no || "",
      installment_amount: editinstallment.installment_amount || "",
    });
  }, [editinstallment]);

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
    } else if (!billing.installment_no) {
      newErrors.installment_no = "Installment no is required";
    } else if (!billing.installment_amount) {
      newErrors.installment_amount = "installment amount required";
    }
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      console.log(billing);
      const { payload } = await dispatch(updateInstallment({id:id,formData:billing}));
      setIsLoading(false);
      if (payload === undefined) {
        toast.error("Something went wrong!", toastError);
      } else {
        toast(payload.msg, successNotification);
      }
    } else {
      setError(newErrors);
      console.log(error);
    }
  };

  return (
    <>
      <div className="content-body" style={{ minheight: "835px" }}>
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Edit Billing</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>Billing</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>Edit Billing</Link>
                </li>
              </ol>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">
                    <i className="fa-solid fa-circle-plus"></i> Edit Billing Details
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Bill No.</label>
                          <input
                            type="text"
                            className="form-control"
                            name="bill_no"
                            value={billing.bill_no}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            value={billing.first_name}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {error.first_name && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {error.first_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            value={billing.last_name}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {error.last_name && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {error.last_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={billing.email}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {error.email && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {error.email}
                          </span>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Course</label>
                          <input
                            type="text"
                            className="form-control"
                            name="course_name"
                            value={billing.course_name}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {error.course_name && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {error.course_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Payment Mode</label>
                          <input
                            type="text"
                            className="form-control"
                            name="payment_mode"
                            value={billing.payment_mode}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {error.payment_mode && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {error.payment_mode}
                          </span>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Installment No.</label>
                          <input
                            type="text"
                            className="form-control"
                            name="installment_no"
                            value={billing.installment_no}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {error.installment_no && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {error.installment_no}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Installment Amount
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="installment_amount"
                            value={billing.installment_amount}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {error.installment_amount && (
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            )}{" "}
                            {error.installment_amount}
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
                          to={"/all-billing"}
                          type="button"
                          className="btn btn-light btn_lg btn-rounded"
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

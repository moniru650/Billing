import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  getAllInstallment,
  deleteInstallment,
  getOneInstallment,
} from "../../Store/InstallmentSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import ReactPrint from "react-to-print";
// if (process.env.NODE_ENV === 'development') {
//   console.error = (message) => {
//     if (message.startsWith('Warning: validateDOMNesting(...): Whitespace text nodes cannot appear as a child of <tbody>. Make sure you don\'t have any extra whitespace between tags on each line of your source code.')) {
//       // Do nothing or log the message differently
//     } else {
//       console.error(message);
//     }
//   };
// }
export default function AllInstallment() {
  const dispatch = useDispatch();
  const [billing, setBilling] = useState(null);
  const { printdata } = useSelector((state) => state.installment);

  useEffect(() => {
    dispatch(getAllInstallment());
  }, []);

  const { allinstallment } = useSelector((state) => state.installment);
  const { editinstallment } = useSelector((state) => state.installment);

  const fetchInstallment = (id) => {
    dispatch(getOneInstallment(id));
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
        dispatch(deleteInstallment(id)).then(() => {
          dispatch(getAllInstallment());
        });
      }
    });
  };

  const ref = useRef();

  // const handleFetchPrint = (id) => {
  //   setBilling(allinstallment[id]);
  // };
  const openPdfInNewTab = (id) => {
    // dispatch(printPdfFile(id)).then((resp)=>{
    //   console.log(resp);
    // })
    const pdfLink = `http://localhost:4500/api/pdfs/${id}`;
    window.open(pdfLink, '_blank');
  };
  return (
    <>
      <div className="content-body" style={{ minHeight: "835px" }}>
        <iframe
          id="ifmcontentstoprint"
          style={{ height: "0px", width: "0px", position: "absolute" }}
        ></iframe>
        <div className="printable-content" id="bill-content" ref={ref}>
          <section className="back">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="invoice-wrapper">
                    <div className="invoice-top">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="invoice-top-left">
                            <h2 className="client-company-name">Adret Software</h2>
                            <h6 className="client-address">
                              Unit 206, Merlin Matrix, DN 10, Sector V, Salt
                              Lake, Kolkata - 700091
                            </h6>
                          </div>
                        </div>
                        <div className="col-sm-6 mt-4">
                          <div className="invoice-top-right">
                            <div className="logo-wrapper">
                              <img
                                src="./bill-print/adret-logo1.png"
                                className="img-responsive pull-right logo"
                              />
                            </div>
                            <h5>06 September 2023</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-bottom">
                      <div className="row">
                        <div className="col-md-offset-1 col-12">
                          <div className="invoice-bottom-right">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Bill No.</th>
                                  <th>Student Name</th>
                                  <th>Student Registration No.</th>
                                  <th>Installment No.</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{billing && billing?.bill_no}</td>
                                  <td>
                                    {billing?.first_name} {billing?.last_name}
                                  </td>
                                  <td>{billing?.reg_no}</td>
                                  <td>{billing?.installment_no}</td>
                                  <td>{billing?.installment_amount}</td>
                                </tr>
                                <tr style={{ height: "40px" }}></tr>
                              </tbody>
                              <thead>
                                <tr>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th>Total</th>
                                  <th>₹{billing?.installment_amount}</th>
                                </tr>
                              </thead>
                            </table>
                            <h4 className="terms">Terms</h4>
                            <ul>
                              <li>Invoice to be paid in advance.</li>
                            </ul>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="col-xs-12">
                          <hr className="divider" />
                        </div>
                        <div className="col-sm-4 footer-links">
                          <a href="https://adretacademy.com/">
                          <i className="fa-solid fa-globe"></i>{" "}
                            adretacademy.com
                          </a>
                        </div>
                        <div className="col-sm-4 footer-links">
                          <a href="mailto:info@adretacademy.com">
                          <i className="fa-solid fa-envelope-open"></i>
                            info@adretacademy.com
                          </a>
                        </div>
                        <div className="col-sm-4 footer-links">
                          <a href="tel:+91 9477966119">
                          <i className="fa-solid fa-phone-volume"></i>
                            +91 9477966119</a>
                        </div>
                      </div>
                      <div className="bottom-bar"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
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
                          <i className="fa-solid fa-circle-info"></i> Billing
                          Details
                        </h5>
                      </div>
                      <div className="card-body student-details-show">
                        <div className="row">
                          <div className="col-lg-6">
                            <p>Bill No. :{editinstallment?.bill_no}</p>
                            <p>
                              Installment Date :
                              {new Date(
                                editinstallment?.installment_date
                              ).toLocaleDateString()}
                            </p>
                            <p>First Name : {editinstallment?.first_name}</p>
                            <p>Last Name : {editinstallment?.last_name}</p>
                            <p>Email : {editinstallment?.email}</p>
                            <p>Registratin No. : {editinstallment?.reg_no}</p>
                            <p>Course : {editinstallment?.course_name}</p>
                          </div>
                          <div className="col-lg-6">
                            <p>Mobile : {editinstallment?.mobile_no}</p>
                            <p>
                              Payment Mode : {editinstallment?.payment_mode}
                            </p>
                            <p>
                              Installment No. :{" "}
                              {editinstallment?.installment_no}
                            </p>
                            <p>
                              Installment Amount :{" "}
                              {editinstallment?.installment_amount}
                            </p>
                            <p>
                              Remaining Fees :{" "}
                              {editinstallment?.installment_due}
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
                <h4>All Billing's</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>Billing's</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link>All Billing's</Link>
                </li>
              </ol>
            </div>
          </div>

          <div className="add-new-section">
            <Link
              type="submit"
              className="btn btn-rounded btn-secondary"
              to={"/add-billing"}
            >
              <span className="btn-icon-left text-secondary">
                <i className="fa-solid fa-plus color-secondary"></i>{" "}
              </span>
              Generate Bill
            </Link>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <i className="fa-solid fa-table"></i> All Billing's Details
                  </h5>
                </div>

                <div className="card-body" id="print-bill">
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm text-center">
                      <thead>
                        <tr>
                          <th>SL. No.</th>
                          <th>Insta. Date</th>
                          <th>Name</th>
                          <th>Course</th>
                          <th>Mobile No.</th>
                          <th>Insta No.</th>
                          <th>Payment Mode</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>

                            {allinstallment && allinstallment.length > 0 ? (
                              allinstallment.map((installment,idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>
                                {new Date(
                                  installment.installment_date
                                ).toLocaleDateString()}
                              </td>
                              <td>
                                {installment?.first_name}{" "}
                                {installment?.last_name}
                              </td>
                              <td>{installment?.course_name}</td>
                              <td>{installment?.mobile_no}</td>
                              <td>{installment.installment_no}</td>
                              <td>{installment.payment_mode}</td>
                              <td>{installment.installment_amount}</td>
                              <td>
                                <div className="d-flex flex-direction-row action-items">
                                  <Link
                                    className="btn btn-info action-button"
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={() =>
                                      fetchInstallment(installment?._id)
                                    }
                                  >
                                    <i className="fa fa-circle-info"></i>
                                  </Link>
                                  <Link
                                    to={`/edit-billing/${installment?._id}`}
                                    className="btn btn-primary action-button"
                                  >
                                    <i className="fa-solid fa-pencil"></i>
                                  </Link>
                                  <Link
                                    onClick={() =>
                                      handleDelete(installment?._id)
                                    }
                                    className="btn btn-danger action-button"
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </Link>
                                  {/* <ReactPrint
                                    trigger={() => (
                                      <Link
                                        className="btn btn-primary action-button"
                                      >
                                        <i className="fa-solid fa-print"></i>
                                      </Link>
                                    )}
                                    content={() => ref.current}
                                    onBeforeGetContent={() =>
                                      handleFetchPrint(idx)
                                    }
                                  /> */}
                                  <Link
                                  onClick={()=>openPdfInNewTab(installment?.bill_no)}
                                        className="btn btn-primary action-button"
                                      >
                                        <i className="fa-solid fa-print"></i>
                                      </Link>
                                </div>
                              </td>
                            </tr>
                          ))
                          ) : (
                            <tr>
                              <td colSpan="7">No bill available</td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                    {
                      allinstallment && allinstallment.length > 4 ? <nav className="d-flex justify-content-center">
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

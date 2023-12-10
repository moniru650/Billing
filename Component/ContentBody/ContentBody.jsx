import React from 'react'
import { Link } from 'react-router-dom'


export default function ContentBody() {
    return (
        <>
             <div className="content-body">
                <div className="container-fluid">

                    <div className="row">

                        <div className="col-xl-3 col-xxl-3 col-md-3 col-sm-6">
                            <div className="widget-stat card emp_box">
                                <div className="card-body">
                                    <div className="media">
                                        <span className="mr-3">
                                            <i className="fa fa-user-graduate"></i>
                                        </span>
                                        <div className="media-body text-white">
                                            <p className="mb-1">Students</p>
                                            <h3 className="text-white">245</h3>
                                            <div className="progress mb-2 bg-white">
                                                <div className="progress-bar progress-animated bg-light" style={{ width: "40%" }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-xxl-3 col-md-3 col-sm-6">
                            <div className="widget-stat card bg-blue-dark">
                                <div className="card-body">
                                    <div className="media">
                                        <span className="mr-3">
                                            <i className="fa fa-building"></i>

                                        </span>
                                        <div className="media-body text-white">
                                            <p className="mb-1">Department</p>
                                            <h3 className="text-white">10+</h3>
                                            <div className="progress mb-2 bg-white">
                                                <div className="progress-bar progress-animated bg-light" style={{ width: "50%" }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-xxl-3 col-md-3 col-sm-6">
                            <div className="widget-stat card bg_blue_dark">
                                <div className="card-body">
                                    <div className="media">
                                        <span className="mr-3">
                                            <i className="fa fa-trophy"></i>

                                        </span>
                                        <div className="media-body text-white">
                                            <p className="mb-1">Awards</p>
                                            <h3 className="text-white">50+</h3>
                                            <div className="progress mb-2 bg-white">
                                                <div className="progress-bar progress-animated bg-light" style={{ width: "40%" }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-xxl-3 col-md-3 col-sm-6">
                            <div className="widget-stat card bg-orange-dark">
                                <div className="card-body">
                                    <div className="media">
                                        <span className="mr-3">
                                            <i className="fas fa-graduation-cap"></i>
                                        </span>
                                        <div className="media-body text-white">
                                            <p className="mb-1">Placement</p>
                                            <h3 className="text-white">200+</h3>
                                            <div className="progress mb-2 bg-white">
                                                <div className="progress-bar progress-animated bg-light" style={{ width: "30%" }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Students List</h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive recentOrderTable">
                                        <table className="table verticle-middle table-responsive-md">
                                            <thead>
                                                <tr>
                                                    <th scope="col">No.</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Date Of Admit</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Subject</th>
                                                    <th scope="col">Fees</th>
                                                    <th scope="col">Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>01</td>
                                                    <td>Jack Ronan</td>
                                                    <td>01 August 2020</td>
                                                    <td><span className="badge badge-rounded badge-primary">Checkin</span></td>
                                                    <td>Commerce</td>
                                                    <td>120$</td>
                                                    <td>
                                                        <Link to="/editcourse">
                                                        <a href="edit-student.html" className="btn btn-sm btn-primary"><i className="la la-pencil"></i></a>
                                                        </Link>

                                                        <a href="javascript:void(0);" className="btn btn-sm btn-danger"><i className="la la-trash-o"></i></a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>02 </td>
                                                    <td>Jimmy Morris</td>
                                                    <td>31 July 2020</td>
                                                    <td><span className="badge badge-rounded badge-warning">Panding</span></td>
                                                    <td>Mechanical</td>
                                                    <td>120$</td>
                                                    <td>
                                                      <Link to="/editcourse">
                                                      <a href="edit-student.html" className="btn btn-sm btn-primary"><i className="la la-pencil"></i></a>
                                                      </Link>
                                                        <a href="javascript:void(0);" className="btn btn-sm btn-danger"><i className="la la-trash-o"></i></a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>03 </td>
                                                    <td>Nashid Martines</td>
                                                    <td>30 July 2020</td>
                                                    <td><span className="badge badge-rounded badge-danger">Canceled</span></td>
                                                    <td>Science</td>
                                                    <td>520$</td>
                                                    <td>
                                                    <Link to="/editcourse">
                                                      <a href="edit-student.html" className="btn btn-sm btn-primary"><i className="la la-pencil"></i></a>
                                                      </Link>
                                                        <a href="javascript:void(0);" className="btn btn-sm btn-danger"><i className="la la-trash-o"></i></a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>04</td>
                                                    <td>Roman Aurora</td>
                                                    <td>29 July 2020</td>
                                                    <td><span className="badge badge-rounded badge-success">Checkin</span></td>
                                                    <td>Arts</td>
                                                    <td>220$</td>
                                                    <td>
                                                    <Link to="/editcourse">
                                                      <a href="edit-student.html" className="btn btn-sm btn-primary"><i className="la la-pencil"></i></a>
                                                      </Link>
                                                        <a href="javascript:void(0);" className="btn btn-sm btn-danger"><i className="la la-trash-o"></i></a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>05</td>
                                                    <td>Samantha</td>
                                                    <td>28 July 2020</td>
                                                    <td><span className="badge badge-rounded badge-success">Checkin</span></td>
                                                    <td>Maths</td>
                                                    <td>130$</td>
                                                    <td>
                                                    <Link to="/editcourse">
                                                      <a href="edit-student.html" className="btn btn-sm btn-primary"><i className="la la-pencil"></i></a>
                                                      </Link>
                                                        <a href="javascript:void(0);" className="btn btn-sm btn-danger"><i className="la la-trash-o"></i></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
           
        </>
    )
}

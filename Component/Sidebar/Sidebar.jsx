import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      {/*--------     Sidebar start --------*/}

      <div className="dlabnav">
        <div className="dlabnav-scroll">
          <ul className="metismenu" id="menu">
            <li className="nav-label first">Main Menu</li>

            <li>
              <Link className="has-arrow">
                <i className="la la-home"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link className="has-arrow">
                <i className="la la-graduation-cap"></i>
                <span className="nav-text">Courses</span>
              </Link>
              <ul>
                <li>
                  <Link to="/all-course">All Courses</Link>
                </li>
                <li>
                  <Link to="/add-course">Add Courses</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="has-arrow">
                <i className="fa fa-chalkboard-teacher"></i>
                <span className="nav-text">Instructors</span>
              </Link>
              <ul>
                <li>
                  <Link to="/all-instructor">All Instructors</Link>
                </li>
                <li>
                  <Link to="/add-instructor">Add Instructors</Link>
                </li>                
              </ul>
            </li>

            <li>
              <Link className="has-arrow">
                <i className="fa fa-user-graduate"></i>
                <span className="nav-text">Students</span>
              </Link>
              <ul>
                <li>
                  <Link to="/all-student">All Students</Link>
                </li>
                <li>
                  <Link to="/add-student">Add Students</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link className="has-arrow">
                <i className="la la-building"></i>
                <span className="nav-text">Billing</span>
              </Link>
              <ul>
                <li>
                  <Link to="/all-billing">All Billing</Link>
                </li>
                <li>
                  <Link to="/add-billing">Add Billing</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/*--------     Sidebar end --------*/}
    </>
  );
}

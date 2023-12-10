import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {expand} from '../../Store/MenuSlice'

export default function Header() {
    const {sidebarSize} = useSelector((state) => state.layout);  
    const dispatch = useDispatch();
  return (
    <>
        <div className="nav-header">
            <Link className="brand-logo">
                <img className="logo-abbr" src="images/logo-white-3.png" alt=""/>
                <img className="logo-compact" src="images/logo-text-white.png" alt=""/>
                <img className="brand-title" src="images/logo-text-white.png" alt=""/>
            </Link>

            <div className="nav-control" onClick={()=>dispatch(expand(!sidebarSize))}>
                <div className={sidebarSize===true?"hamburger is-active":"hamburger"}>
                    <span className="line"></span><span className="line"></span><span className="line"></span>
                </div>
            </div>
        </div>


{/*  Header start */}
           
   
        <div className="header">
            <div className="header-content">
                <nav className="navbar navbar-expand">
                    <div className="collapse navbar-collapse justify-content-between">
                        <div className="header-left">
                            <div className="search_bar dropdown">
                                <span className="search_icon p-3 c-pointer" data-toggle="dropdown">
                                    <i className="mdi mdi-magnify"></i>
                                </span>
                                <div className="dropdown-menu p-0 m-0">
                                    <form>
                                        <input className="form-control" type="search" placeholder="Search"
                                            aria-label="Search"/>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <ul className="navbar-nav header-right">
                            <li className="nav-item dropdown notification_dropdown">
                                <Link className="nav-link bell ai-icon"  role="button" data-toggle="dropdown">
                                    <svg id="icon-user" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                    </svg>
                                    <div className="pulse-css"></div>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <ul className="list-unstyled">
                                        <li className="media dropdown-item">
                                            <span className="success"><i className="ti-user"></i></span>
                                            <div className="media-body">
                                                <Link>
                                                    <p><strong>Martin</strong> has added a <strong>customer</strong>
                                                        Successfully
                                                    </p>
                                                </Link>
                                            </div>
                                            <span className="notify-time">3:20 am</span>
                                        </li>
                                        <li className="media dropdown-item">
                                            <span className="primary"><i className="ti-shopping-cart"></i></span>
                                            <div className="media-body">
                                                <Link>
                                                    <p><strong>Jennifer</strong> purchased Light Dashboard 2.0.</p>
                                                </Link>
                                            </div>
                                            <span className="notify-time">3:20 am</span>
                                        </li>
                                        <li className="media dropdown-item">
                                            <span className="danger"><i className="ti-bookmark"></i></span>
                                            <div className="media-body">
                                                <Link>
                                                    <p><strong>Robin</strong> marked a <strong>ticket</strong> as
                                                        unsolved.
                                                    </p>
                                                </Link>
                                            </div>
                                            <span className="notify-time">3:20 am</span>
                                        </li>
                                        <li className="media dropdown-item">
                                            <span className="primary"><i className="ti-heart"></i></span>
                                            <div className="media-body">
                                                <Link>
                                                    <p><strong>David</strong> purchased Light Dashboard 1.0.</p>
                                                </Link>
                                            </div>
                                            <span className="notify-time">3:20 am</span>
                                        </li>
                                        <li className="media dropdown-item">
                                            <span className="success"><i className="ti-image"></i></span>
                                            <div className="media-body">
                                                <Link>
                                                    <p><strong> James.</strong> has added a<strong>customer</strong>
                                                        Successfully
                                                    </p>
                                                </Link>
                                            </div>
                                            <span className="notify-time">3:20 am</span>
                                        </li>
                                    </ul>
                                    <Link className="all-notification" >See all notifications <i
                                            className="ti-arrow-right"></i></Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown header-profile">
                                <Link className="nav-link"  role="button" data-toggle="dropdown">
                                    <img src="images/profile/education/pic1.jpg" width="20" alt=""/>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <Link className="dropdown-item ai-icon">
                                        <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <span className="ml-2">Profile </span>
                                    </Link>
                                    <Link className="dropdown-item ai-icon">
                                        <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
                                            <path
                                                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                            </path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                        <span className="ml-2">Inbox </span>
                                    </Link>
                                    <Link className="dropdown-item ai-icon">
                                        <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round"
                                            className="feather feather-log-out">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        <span className="ml-2">Logout </span>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </>
  )
}

import Home from "../Component/Home/Home";

import AllCourse from "../Component/CourseDetails/AllCourse";
import AddCourse from "../Component/CourseDetails/AddCourse";
import EditCourse from "../Component/CourseDetails/EditCourse";

import AllInstructor from "../Component/InstructorDetails/AllInstructor";
import EditInstructor from "../Component/InstructorDetails/EditInstructor";
import AddInstructor from "../Component/InstructorDetails/AddInstructor";

import AllStudent from "../Component/StudentDetails/AllStudent";
import AddStudent from "../Component/StudentDetails/AddStudent";
import EditStudent from "../Component/StudentDetails/EditStudent";

import AllBilling from "../Component/BillingDetails/AllBilling";
import AddBilling from "../Component/BillingDetails/AddBilling";
import EditBilling from "../Component/BillingDetails/EditBilling";

export const privateRoute = [
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <AllCourse />,
    path: "/all-course",
  },
  {
    element: <EditCourse />,
    path: "/edit-course",
  },
  {
    element: <AddCourse />,
    path: "/add-course",
  },
  {
    element: <AllStudent />,
    path: "/all-student",
  },
  {
    element: <EditStudent />,
    path: "/edit-student/:id",
  },
  {
    element: <AddStudent />,
    path: "/add-student",
  },
  {
    element: <AllInstructor />,
    path: "/all-instructor",
  },
  {
    element: <EditInstructor />,
    path: "/edit-instructor/:id",
  },
  {
    element: <AddInstructor />,
    path: "/add-instructor",
  },
  {
    element: <AllBilling />,
    path: "/all-billing",
  },
  {
    element: <EditBilling />,
    path: "/edit-billing/:id",
  },
  {
    element: <AddBilling />,
    path: "/add-billing",
  },
];
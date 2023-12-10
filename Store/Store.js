import { configureStore } from "@reduxjs/toolkit";
import MenuChange from "./MenuSlice";
import CourseSlice from "./CourseSlice";
import InstructorSlice from "./InstructorSlice";
import StudentSlice from "./StudentSlice";
import InstallmentSlice from "./InstallmentSlice";

const Store=configureStore({
    reducer:{
        layout:MenuChange,
        course:CourseSlice,
        instructor:InstructorSlice,
        student:StudentSlice,
        installment:InstallmentSlice
    }
})
export default Store;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";

const initialState = {
  allcourse: "",
  editcourse: "",
  selectedCourseId: null,
};

export const addCourse = createAsyncThunk("/add-course", async (formData) => {
  let resp = await axiosInstance.post("/add-course", formData);
  let respData = resp?.data;
  return respData;
});
export const getAllCourse = createAsyncThunk("/get-all-course", async () => {
  let resp = await axiosInstance.get("/get-all-course");
  let respData = resp?.data;
  return respData;
});
export const deleteCourse = createAsyncThunk("/delete-course", async (id) => {
  let resp = await axiosInstance.delete(`/delete-course/${id}`);
  let respData = resp?.data;
  console.log('Delete');
  return respData;
});
export const getOneCourse = createAsyncThunk("/get-course", async (id) => {
  let resp = await axiosInstance.get(`/get-course/${id}`);
  let respData = resp?.data;
  return respData;
});
export const updateCourse = createAsyncThunk("/update-course", async ({ id, formData }) => {
  console.log(formData)
  let resp = await axiosInstance.patch(`/update-course/${id}`, formData);
  console.log('Update',resp);
  let respData = resp?.data;
  return respData;
});

const CourseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers:{
    setSelectedCourseId: (state, action) => {
      state.selectedCourseId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourse.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getAllCourse.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.allcourse = payload.data;
      })
      .addCase(getAllCourse.rejected, (state, payload) => {
        state.status = "idle";
      })

      .addCase(getOneCourse.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getOneCourse.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.editcourse = payload.data;
      })
      .addCase(getOneCourse.rejected, (state, payload) => {
        state.status = "idle";
      });
  },
});
export const { setSelectedCourseId } = CourseSlice.actions;
export default CourseSlice.reducer;

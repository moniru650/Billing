import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";

const initialState = {
  allstudent: "",
  editstudent: "",
};

export const addStudent = createAsyncThunk("/add-student", async (formData) => {
  let resp = await axiosInstance.post("/add-student", formData);
  console.log(resp);
  let respData = resp?.data;
  return respData;
});
export const getAllStudent = createAsyncThunk("/get-all-student", async () => {
  let resp = await axiosInstance.get("/get-all-student");
  let respData = resp?.data;
  return respData;
});
export const deleteStudent = createAsyncThunk("/delete-student", async (id) => {
  let resp = await axiosInstance.delete(`/delete-student/${id}`);
  let respData = resp?.data;
  return respData;
});
export const getOneStudent = createAsyncThunk("/get-student", async (id) => {
  let resp = await axiosInstance.get(`/get-student/${id}`);
  let respData = resp?.data;
  return respData;
});
export const updateStudent = createAsyncThunk("/update-student", async ({ id, formData }) => {
  let resp = await axiosInstance.patch(`/update-student/${id}`, formData);
  console.log('Update', resp);
  let respData = resp?.data;
  return respData;
});

const StudentSlice = createSlice({
  name: "student",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudent.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getAllStudent.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.allstudent = payload.data;
      })
      .addCase(getAllStudent.rejected, (state, payload) => {
        state.status = "idle";
      })

      .addCase(getOneStudent.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getOneStudent.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.editstudent = payload.data;
      })
      .addCase(getOneStudent.rejected, (state, payload) => {
        state.status = "idle";
      });
  },
});

export default StudentSlice.reducer;

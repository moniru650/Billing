import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";

const initialState = {
  allinstructor: "",
  editinstructor: "",
};

export const addInstructor = createAsyncThunk("/add-instructor", async (formData) => {
  let resp = await axiosInstance.post("/add-instructor", formData);
  let respData = resp?.data;
  return respData;
});
export const getAllInstructor = createAsyncThunk("/get-all-instructor", async () => {
  let resp = await axiosInstance.get("/get-all-instructor");
  let respData = resp?.data;
  return respData;
});
export const deleteInstructor = createAsyncThunk("/delete-instructor", async (id) => {
  let resp = await axiosInstance.delete(`/delete-instructor/${id}`);
  let respData = resp?.data;
  return respData;
});
export const getOneInstructor = createAsyncThunk("/get-instructor", async (id) => {
  let resp = await axiosInstance.get(`/get-instructor/${id}`);
  let respData = resp?.data;
  return respData;
});
export const updateInstructor = createAsyncThunk("/update-instructor", async ({ id, formData }) => {
  let resp = await axiosInstance.patch(`/update-instructor/${id}`, formData);
  console.log('Update',resp);
  let respData = resp?.data;
  return respData;
});

const InstructorSlice = createSlice({
  name: "instructor",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllInstructor.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getAllInstructor.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.allinstructor = payload.data;
      })
      .addCase(getAllInstructor.rejected, (state, payload) => {
        state.status = "idle";
      })

      .addCase(getOneInstructor.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getOneInstructor.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.editinstructor = payload.data;
      })
      .addCase(getOneInstructor.rejected, (state, payload) => {
        state.status = "idle";
      });
  },
});

export default InstructorSlice.reducer;

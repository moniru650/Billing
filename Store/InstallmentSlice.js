import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";

const initialState = {
  allinstallment: "",
  editinstallment: "",
  searchbyreg:"",
  printdata:"",
};

export const addInstallment = createAsyncThunk("/add-installment", async (formData) => {
  let resp = await axiosInstance.post("/add-installment", formData);
  let respData = resp?.data;
  return respData;
});
export const getAllInstallment = createAsyncThunk("/get-all-installment", async () => {
  let resp = await axiosInstance.get("/get-all-installment");
  let respData = resp?.data;
  return respData;
});
export const deleteInstallment = createAsyncThunk("/delete-installment", async (id) => {
  let resp = await axiosInstance.delete(`/delete-installment/${id}`);
  let respData = resp?.data;
  return respData;
});
export const getOneInstallment = createAsyncThunk("/get-installment", async (id) => {
  let resp = await axiosInstance.get(`/get-installment/${id}`);
  let respData = resp?.data;
  return respData;
});
export const updateInstallment = createAsyncThunk("/update-installment", async ({ id, formData }) => {
  let resp = await axiosInstance.patch(`/update-installment/${id}`, formData);
  let respData = resp?.data;
  return respData;
});
export const searchByReg = createAsyncThunk("/search-by-reg", async (formData) => {
    let resp = await axiosInstance.post(`/search-by-reg`, formData);
    console.log("Test",resp);
    let respData = resp?.data;
    return respData;
  });
  export const printPdfFile = createAsyncThunk("/pdf-print", async (id) => {
    let resp = await axiosInstance.get(`/pdfs/${id}`);
    let respData = resp?.data;
    return respData;
  });

const InstallmentSlice = createSlice({
  name: "installment",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllInstallment.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getAllInstallment.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.allinstallment = payload.data;
      })
      .addCase(getAllInstallment.rejected, (state, payload) => {
        state.status = "idle";
      })

      .addCase(getOneInstallment.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getOneInstallment.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.editinstallment = payload.data;
      })
      .addCase(getOneInstallment.rejected, (state, payload) => {
        state.status = "idle";
      })

      .addCase(searchByReg.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(searchByReg.fulfilled, (state, { payload }) => {
        state.status = "idle";
        console.log(payload.data)
        state.searchbyreg = payload.data;
      })
      .addCase(searchByReg.rejected, (state, payload) => {
        state.status = "idle";
      })

      .addCase(printPdfFile.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(printPdfFile.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.status = "idle";
        state.printdata=payload.data;
      })
      .addCase(printPdfFile.rejected, (state, payload) => {
        state.status = "idle";
      });
  },
});

export default InstallmentSlice.reducer;

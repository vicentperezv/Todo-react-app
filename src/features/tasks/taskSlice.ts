import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";
import Task from "models/Task";


export interface TaskState{
  loading: boolean;
  error: string | null;
  data: Task[] | null;
}

// Define Get Task function with axios
export const getTasks = createAsyncThunk("task/getTasks", async (data, thunkApi) =>{    
    try{
        const response = await axios.get<Task[]>(
            "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos"
        );        
        return response.data;
    } catch (error: any) {
          const message = error.message;
          return thunkApi.rejectWithValue(message);
    }     
});
// Define Post Task function with axios
export const postTask = createAsyncThunk("task/postTask", async ( data : { label: string, checked: boolean} ,thunkApi) =>{    
    try{
        const response = await axios.post<Task>(
            "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos",
            data
        );
        return response.data;
    } catch (error: any) {
          const message = error.message;
          return thunkApi.rejectWithValue(message);
    }     
});
// Define Delete Task function with axios
export const patchTask = createAsyncThunk("task/patchTask", async ( data : { id: number, checked: boolean} ,thunkApi) =>{    
    try{
        const id = data.id;
        const checked = !data.checked;

        const response = await axios.patch<Task>(
            `https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${id}`,
           { checked: checked }
        );
        return response.data;
    } catch (error: any) {
          const message = error.message;
          return thunkApi.rejectWithValue(message);
    }     
});
// Define Delete Task function with axios
export const delTask = createAsyncThunk("task/deleteTask", async ( data : { id: number} ,thunkApi) =>{    
    try{
        const id = data.id;
        await axios.delete(
            `https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${id}`,
            
        );                        
        return id;
    } catch (error: any) {
          const message = error.message;
          return thunkApi.rejectWithValue(message);
    }     
});
// Define taskSclice
const initialState = {
    loading: false,
    error: null,
    data: [],
} as TaskState

// Define taskSclice
export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        /*
            Get Cases
        */
        .addCase(getTasks.pending, (state, action) => {           
            state.loading= true;
            state.error = null;
        })
        .addCase(getTasks.fulfilled, (state, action : PayloadAction<Task[]>) => {           
            state.data = action.payload;
            state.loading= false;
            state.error = null;
        })
        .addCase(getTasks.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading= false;

        })
        /*
            Post Cases
        */
        .addCase(postTask.pending, (state, action) => {           
            state.loading= true;
            state.error = null;
        })
        .addCase(postTask.fulfilled, (state, action : PayloadAction<Task>) => {           
            state.data.push(action.payload);
            state.loading= false;
            state.error = null;
        })
        .addCase(postTask.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading= false;

        })
        /*
            Delete Cases
        */
        .addCase(delTask.pending, (state, action) => {           
            state.loading= true;
            state.error = null;
        })
        .addCase(delTask.fulfilled, (state, action : PayloadAction<number>) => {           
            
            const foundTask = state.data.find((task) => task.id === action.payload);
            if (foundTask) {
                state.data.splice(state.data.indexOf(foundTask), 1);
            }            
            state.loading= false;
            state.error = null;
        })
        .addCase(delTask.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading= false;
        })
        /*
            Patch Cases
        */
        .addCase(patchTask.pending, (state, action) => {           
            state.loading= true;
            state.error = null;
        })
        .addCase(patchTask.fulfilled, (state, action : PayloadAction<Task>) => {          
            
            const { id, checked } = action.payload;
            const foundTask = state.data.find((task) => task.id === id);
            if (foundTask) {
                foundTask.checked = checked;               
            }
            state.loading= false;
            state.error = null;

        })
        .addCase(patchTask.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading= false;
        })
    }
});

export default taskSlice.reducer;
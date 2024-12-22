import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

export interface locationState {
    isLoading:boolean,
    error?:string,
    location:{lat:number,lng:number}
}

const initialState: locationState = {
    isLoading: false,
    error:undefined,
    location: {
        lat: 0,
        lng: 0
        }
}

//async action 
export const addLocationToBackend = createAsyncThunk(
    'addLocation',
    async (location: { lat: number; lng: number }, { rejectWithValue }) => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add location');
          }
    console.log(response.json())
          return  location;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to add location');
      }
    }
  );

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      // Pending state: set loading to true and clear errors
      .addCase(addLocationToBackend.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
        //here we add toast for loading animation we use isLoadingstate in component
      })
      // Fulfilled state: update location and set loading to false
      .addCase(addLocationToBackend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.location = action.payload; // Assuming the response contains the updated location
      //here we add toast for loading animation we use isLoadingstate in component

      })
      // Rejected state: set loading to false and save the error message
      .addCase(addLocationToBackend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
                //here we add toast for loading animation we use isLoadingstate in component
      });
  },
})

// Action creators are generated for each case reducer function
export const { } = locationSlice.actions;

export default locationSlice.reducer;
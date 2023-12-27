"use client";
import getCityAndHubs, {
  GetCityAndHubsResponseI,
} from "@/app/api/city&hubs/getCityAndHubs";
import loginUser, {
  LoginUserParamI,
  LoginUserResponseI,
} from "@/app/api/user/login";
import logOut, { LogOutResponseI } from "@/app/api/user/logout";
import { UserI } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserInitialValuePropI {
  user: UserI | null;
  loading: boolean;
  cities?: GetCityAndHubsResponseI[] | null;
}
if (typeof window !== "undefined" && window.localStorage) {
  var user = JSON.parse(localStorage.getItem("user")!);
}

const initialValue: UserInitialValuePropI = {
  user: user ? user : null,
  loading: false,
  cities: null,
};

export const getUserAction = createAsyncThunk<
  LoginUserResponseI,
  LoginUserParamI
>("user/login", async (options, { rejectWithValue }) => {
  try {
    const response = await loginUser(options);
    if (response && typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("user", JSON.stringify(response));
    }
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getCitiesAction = createAsyncThunk<GetCityAndHubsResponseI[]>(
  "Cities/getCities",
  async (_: unknown, { rejectWithValue }) => {
    try {
      const response = await getCityAndHubs();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOutUseAction = createAsyncThunk<LogOutResponseI>(
  "user/logout",
  async (_: unknown, { rejectWithValue }) => {
    try {
      const response = await logOut();

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUser: (state, action: PayloadAction<UserI>) => {
      if (typeof state.user !== null) {
        state.user = action.payload;
      }
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserAction.rejected, (state) => {
      state.loading = true;
    });
    builder.addCase(logOutUseAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logOutUseAction.fulfilled, (state) => {
      state.user = null;
    });
    builder.addCase(logOutUseAction.rejected, (state) => {
      state.loading = true;
    });
    builder.addCase(getCitiesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCitiesAction.fulfilled, (state, action) => {
      state.cities = action.payload;
      state.loading = false;
    });
    builder.addCase(getCitiesAction.rejected, (state) => {
      state.loading = true;
    });
  },
});
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

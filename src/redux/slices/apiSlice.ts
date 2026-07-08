import { type BaseQueryFn, type FetchArgs, type FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://xhkrpfff-4000.inc1.devtunnels.ms/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      localStorage.clear();
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "auth/refresh",
        method: "POST",
        body: {
          refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const data = refreshResult.data as {
        accessToken: string;
        refreshToken: string;
      };

      localStorage.setItem("token", data.accessToken);

      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.clear();
      window.location.href = "/login";
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Course", "Courses", "EnrollCourses", "Students", "Questions"],
  endpoints: () => ({}),
});
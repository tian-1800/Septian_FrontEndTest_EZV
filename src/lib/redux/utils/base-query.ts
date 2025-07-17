import { JSONPLACEHOLDER_URL } from "@/config/env-config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: JSONPLACEHOLDER_URL,
});

import { LaunchInfo } from "./api";

export type LaunchStatus = "ALL" | "SUCCESS" | "FAIL";

export type SortType = "desc" | "asc";

export type RequestConfig = {
  url: string;
  data?: object;
  params?: Record<string, string | number>;
  path?: Record<string, string | number>;
  headers?: HeadersInit;
  config?: {
    merge?: boolean;
    refresh?: boolean; 
  }
};

export type Query = {
  $text?: {
    $search?: string;
  };
  date_utc?: {
    $gte: string;
    $lte: string;
  };
  success?: boolean;
};

export type Options = {
  limit?: number;
  page?: number;
  sort?: {
    [K in keyof LaunchInfo]?: SortType;
  };
};

export type QueryParams = {
  query?: Query;
  options?: Options;
};

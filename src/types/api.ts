export interface LaunchInfo {
  fairings: null;
  links: Links;
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  tdb: boolean;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  details: string;
  capsules: string[];
  payloads: string[];
  launchpad: string;
  auto_update: boolean;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  id: string;
}

export interface Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean;
  landing_type: string;
  landpad: string;
}

export interface Links {
  patch: Patch;
  reddit: Reddit;
  flickr: Flickr;
  presskit: string;
  webcast: string;
  youtube_id: string;
  article: string;
  wikipedia: string;
}

export interface Flickr {
  small: string[];
  original: string[];
}

export interface Patch {
  small: string;
  large: string;
}

export interface Reddit {
  campaign: string;
  launch: string;
  media: string;
  recovery: null;
}

export interface Pagination {
  hasNextPage: boolean; // This is a name key
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  offset: number;
  page: number;
  pagingCounter: number;
  prevPage: null;
  totalDocs: number;
  totalPages: number;
}

export interface QueryResponse {
  docs: LaunchInfo[];
  hasNextPage: boolean; // This is a name key
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  offset: number;
  page: number;
  pagingCounter: number;
  prevPage: null;
  totalDocs: number;
  totalPages: number;
}

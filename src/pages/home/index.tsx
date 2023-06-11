import React, { useRef } from "react";
import { timeout, useRequestList, useScrollBottom } from "@/utils";
import api from "@/api";
import VideoCard from "./components/VideoCard";
import {
  LaunchInfo,
  Options,
  Query,
  QueryParams,
  QueryResponse,
} from "@/types";
import PageContainer from "@/components/PageContainer";
import {
  AppBar,
  Box,
  Fab,
  Grid,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import SearchForm, { FormData } from "./components/SearchForm/SearchForm";
import QueryModal from "./components/SearchForm/QueryModal";
import { ArrowUpwardOutlined } from "@mui/icons-material";

const Home: React.FC = () => {
  const loadingRef = useRef(null);
  const queryParamsRef = useRef<QueryParams>({
    options: {
      limit: 12,
      page: 1,
      sort: { date_utc: "desc" },
    },
  });
  const queryParams = queryParamsRef.current;

  const { data, run, loading } = useRequestList<QueryResponse>({
    url: api.query,
    data: {
      options: queryParams.options,
    },
  });

  const loadMoreData = async () => {
    await timeout(3000);
    const { query, options } = queryParams;
    let nextPage = 2;
    if (data && data?.length) {
      nextPage = data[data.length - 1]?.nextPage ?? 2;
    }
    return run({
      url: api.query,
      data: {
        query,
        options: {
          ...options,
          page: nextPage,
        },
      },
    });
  };

  useScrollBottom(loadingRef.current, loadMoreData);

  const handleSearch = (values: FormData) => {
    const { search, date_utc, launchStatus, sort } = values;
    const options: Options = {
      limit: 12,
      page: 1,
    };
    const query: Query = {};

    if (date_utc?.length === 2 && date_utc[0] && date_utc[1]) {
      query.date_utc = {
        $gte: date_utc[0].toISOString(),
        $lte: date_utc[1].toISOString(),
      };
    }

    if (launchStatus !== "ALL") {
      query.success = launchStatus === "SUCCESS";
    }
    if (search != null) {
      query.$text = { $search: search };
    }

    options.sort = {
      date_utc: sort,
    };

    queryParamsRef.current = {
      ...queryParams,
      query,
      options,
    };

    run({
      url: api.query,
      data: queryParamsRef.current,
      config: {
        refresh: true,
      },
    });
    handleScrollTop();
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const launchList: LaunchInfo[] = data?.reduce(
    (pre, cur) => [...pre, ...cur.docs],
    []
  );

  const isHideLoading =
    loading || !launchList?.length || !data?.[data?.length - 1]?.hasNextPage;

  return (
    <PageContainer showHeader={false}>
      <AppBar
        position="sticky"
        sx={{
          marginBottom: "24px",
          paddingBottom: { xs: "0px", md: "6px" },
        }}
      >
        <Toolbar>
          <QueryModal
            sx={{ display: { xs: "block", md: "none" } }}
            onOk={handleSearch}
          />
          <SearchForm
            sx={{ display: { xs: "none", md: "block" } }}
            onOk={handleSearch}
          />
        </Toolbar>
      </AppBar>
      <Grid container spacing={{ xs: 6, md: 6 }} columns={{ xs: 2, md: 2 }}>
        {launchList?.map((i, index) => (
          <Grid item xs={42} sm={1} md={1} key={index}>
            <VideoCard data={i} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          textAlign: "center",
          padding: "15px",
          display: isHideLoading ? "none" : "block",
        }}
        ref={loadingRef}
      >
        <CircularProgress />
      </Box>
      {launchList?.length && (
        <Fab
          onClick={handleScrollTop}
          sx={{ position: "fixed", opacity: 0.6, bottom: 60, right: 30 }}
        >
          <ArrowUpwardOutlined />
        </Fab>
      )}
    </PageContainer>
  );
};

export default Home;

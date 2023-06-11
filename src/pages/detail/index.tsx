import React from "react";
import { useMatches, useLocation } from "react-router-dom";
import { LaunchInfo } from "@/types";
import api from "@/api";
import styles from "./index.module.less";
import PageContainer from "@/components/PageContainer";
import VideoPlayer from "@/components/VideoPlayer";
import { useRequest } from "@/utils";
import { Grid, Typography } from "@mui/material";

const Detail: React.FC = () => {
  const matches = useMatches();
  const {
    state: { poster },
  } = useLocation();
  const { data } = useRequest<LaunchInfo>({
    url: api.detail,
    path: {
      id: matches[0].params.id as string,
    },
  });

  return (
    <PageContainer title="BACK TO LAUNCHES" back="/">
      <div className={styles.content}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <VideoPlayer
              poster={poster ?? ""}
              url={data?.links.webcast}
              id={data?.links?.youtube_id}
            />
          </Grid>
          <Grid container item direction="column" spacing={1}>
            <Grid item>
              {data?.date_local && new Date(data?.date_local).toDateString()}
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ fontFamily: "D-DIN-Bold" }}>
                {data?.name}
              </Typography>
            </Grid>
            <Grid container item sx={{ marginTop: "20px" }} spacing={3}>
              <Grid item xs={6}>
                {data?.details ??
                  `
                  The Dragon spacecraft is equipped with two drogue parachutes to stabilize the spacecraft following reentry
                  and four main parachutes to further decelerate the spacecraft prior to landing.
                `}
              </Grid>
              <Grid item xs={6}>
                {data?.details ??
                  `
                  The Dragon spacecraft is equipped with two drogue parachutes to stabilize the spacecraft following reentry
                  and four main parachutes to further decelerate the spacecraft prior to landing.
                `}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </PageContainer>
  );
};

export default Detail;

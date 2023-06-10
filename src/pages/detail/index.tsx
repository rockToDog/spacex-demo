import React from "react";
import { useMatches, useLocation } from "react-router-dom";
import { LaunchInfo } from "../../types";
import api from "../../api";
import styles from "./index.module.less";
import PageContainer from "../../components/PageContainer";
import VideoPlayer from "../../components/VideoPlayer";
import { useRequest } from "../../utils";

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
        <div>
          <VideoPlayer
            poster={poster ?? ""}
            url={data?.links.webcast}
            id={data?.links?.youtube_id}
          />
        </div>
        {data?.details}
      </div>
    </PageContainer>
  );
};

export default Detail;

import React, { useState } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import styles from "./index.module.less";

const VideoPlayer: React.FC<{
  id: string | undefined;
  url: string | undefined;
  poster: string | undefined;
}> = ({ id, url, poster }) => {
  const [isStartPlay, setIsStartPlay] = useState(false);
  const handlePlay = () => {
    setIsStartPlay(true);
  };

  const getPlayUrl = () => {
    if (url) {
      return (
        `https://www.youtube.com/embed/` + id ??
        new URL(url).search.replace("?v=", "")
      );
    }
    return url;
  };

  return (
    <div className={styles.videoPlayer} onClick={handlePlay}>
      <div
        className={`${styles.poster} ${
          isStartPlay ? styles.hide : styles.show
        }`}
      >
        <img src={poster} />
        <PlayCircleFilledIcon className={styles.playIcon} />
      </div>
      <iframe
        className={`${styles.frame} ${
          !isStartPlay ? styles.hide : styles.show
        }`}
        src={getPlayUrl()}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;

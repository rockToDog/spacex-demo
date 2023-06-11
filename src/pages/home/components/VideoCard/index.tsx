import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./index.module.less";
import { LaunchInfo } from "@/types";
import { getImgUrl, mergeClassNames } from "@/utils";
import Image from "@/components/Image";

export interface Props {
  data: LaunchInfo;
}

const VideoCard: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  data,
  className,
}) => {
  const { id, date_local, name } = data;
  const imgUrl = getImgUrl(data);
  const mergedClassName = mergeClassNames(styles.content, className);
  return (
    <div className={mergedClassName}>
      <Image
        style={{ height: 350 }}
        alt={name}
        src={imgUrl ?? ""}
        lazy={true}
      />
      <div className={styles.date}>{new Date(date_local).toDateString()}</div>
      <div className={styles.name}>{name}</div>
      <Button className={styles.btnLink} variant="outlined">
        <Link
          to={`detail/${id}`}
          state={{
            poster: imgUrl,
          }}
        >
          LEARN MORE
        </Link>
      </Button>
    </div>
  );
};

export default VideoCard;

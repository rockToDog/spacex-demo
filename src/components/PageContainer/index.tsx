import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

const PageContainer: React.FC<{
  children: React.ReactElement | React.ReactElement[];
  title?: string;
  back?: string;
  showHeader?: boolean;
}> = ({ showHeader = true, children, title, back }) => {
  return (
    <div
      style={{
        // padding: "20px 20px",
        width: "100%",
        margin: "0 auto",
        maxWidth: "1400px",
      }}
    >
      {showHeader && (
        <Link to={back ?? "/"}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              paddingBottom: 16,
              marginTop: 20 
            }}
          >
            <ArrowBackIosIcon
              style={{
                fontSize: "1em",
              }}
            />{" "}
            {title}
          </div>
        </Link>
      )}
      <>{children}</>
    </div>
  );
};

export default PageContainer;

import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="skeleton"
    {...props}
  >
    <circle cx="139" cy="139" r="139" />
    <rect x="0" y="298" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="344" rx="10" ry="10" width="280" height="65" />
    <rect x="0" y="427" rx="10" ry="10" width="97" height="32" />
    <rect x="141" y="424" rx="10" ry="10" width="134" height="38" />
    <rect x="226" y="446" rx="0" ry="0" width="1" height="1" />
  </ContentLoader>
);

export default Skeleton;

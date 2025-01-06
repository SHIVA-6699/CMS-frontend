import React from "react";
import CreateLive from "../components/Content/LiveStream/CreateLive";
import LiveStreamsList from "../components/Content/LiveStream/LiveStreamsList";


const LiveStreamLayout = () => {
  return (
    <div className="page-content">
        <CreateLive/>
        <LiveStreamsList/>
    </div>
  );
};

export default LiveStreamLayout;

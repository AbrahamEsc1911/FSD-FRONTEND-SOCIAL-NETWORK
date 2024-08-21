import "./CBlockContent.css";

import React from "react";

export const CBlockContent = ({ content, id }) => {
  return (
    <>
      <div className="ui-main-block" id={id}>
        {content}
      </div>
    </>
  );
};

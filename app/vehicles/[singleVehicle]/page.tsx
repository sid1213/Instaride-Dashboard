"use client";

import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import React from "react";
import data from "../../../public/data.json";
const json = data;

const Page = () => {
  return (
    <div>
      <JsonView
        data={json}
        shouldExpandNode={allExpanded}
        style={defaultStyles}
      />
    </div>
  );
};

export default Page;

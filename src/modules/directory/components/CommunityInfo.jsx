import React from "react";
import CommonBox from "../../../components/CommonBox";
import { useParams } from "react-router-dom";

export default function CommunityInfo() {
  const { id } = useParams();

  return <CommonBox title={"Community Info"}></CommonBox>;
}

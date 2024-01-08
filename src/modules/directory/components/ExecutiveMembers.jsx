import React from "react";
import CommonBox from "../../../components/CommonBox";
import { useParams } from "react-router-dom";

export default function ExecutiveMembers() {
  const { id } = useParams();

  console.log("id", id);
  return <CommonBox title={"Executive Members"}></CommonBox>;
}

import React, { useEffect } from "react";
import Base from "../../components/Base";
import CommonBox from "../../components/CommonBox";
import List from "../../components/List";
import { RowCell, Row } from "../../components/List";
import { firebaseconfig } from "../../api/firebase/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import Moment from "react-moment";
import { orderBy } from "lodash";

export default function LeadsScreen() {
  const [contactData, setContactData] = useState([]);
  const firebaseApp = initializeApp(firebaseconfig);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState(true);

  const db = getFirestore(firebaseApp);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      console.log(data);
      setContactData(data);
    };

    fetchData();
  }, [db]);

  const sortedData = orderBy(
    contactData,
    (item) => {
      if (sortBy === "time") {
        const timestampDate = new Date(item?.timestamp);
        return timestampDate.getTime() || 0;
      } else {
        return item;
      }
    },
    sortDirection ? "asc" : "desc"
  );
  console.log("sortBy is", sortBy);
  console.log("sortDirection is", sortDirection);
  console.log("sortedData is", sortedData);

  return (
    <Base>
      <CommonBox title={"Leads"}>
        <List
          columns={["name", "phone Number", "organization Name", "time"]}
          data={sortedData}
          setSortBy={setSortBy}
          setSortDirection={setSortDirection}
          sortDirection={sortDirection}
          sortBy={sortBy}
          renderRow={({ item }) => {
            return (
              <Row>
                <RowCell value={item?.name} />
                <RowCell value={item?.phoneNumber} />
                <RowCell value={item?.organizationName} />
                <Moment fromNow>{item?.timestamp}</Moment>
              </Row>
            );
          }}
        />
      </CommonBox>
    </Base>
  );
}

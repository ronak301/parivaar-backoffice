import React, { useEffect, useState } from 'react';
import { getFirebaseAppRemoteConfig } from '../firebase';
const useFireBase = () => {
  const [typeSubtypes, setTypeSubtypes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const configData = await getFirebaseAppRemoteConfig();
        if (configData && Array.isArray(configData.CommunityTypes)) {
          const typeSubtypesObj = {};

          configData.CommunityTypes.forEach((type) => {
            const subtypes = type.subTypes?.map((subtype) => subtype.id) || [];
            typeSubtypesObj[type.id] = subtypes;
          });
          setTypeSubtypes(typeSubtypesObj);
        } else {
          console.error('Invalid or missing data structure in configData.');
        }
      } catch (error) {
        console.error('Error fetching remote config:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log(typeSubtypes);
  }, [typeSubtypes]);

  return <div></div>;
};

export default useFireBase;

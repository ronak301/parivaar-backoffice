import { isEqual } from "lodash";
export const checkChange = (old, newt) => {
  const extractedObject = old.reduce((acc, { field, value }) => {
    acc[field] = value;
    return acc;
  }, {});
  console.log(extractedObject);
  console.log(newt);

  return isEqual(extractedObject, newt);
};
export const renameKey = (obj, oldKey, newKey) => {
  if (!obj.hasOwnProperty(oldKey)) {
    return obj;
  }
  const newObj = { ...obj };

  newObj[newKey] = newObj[oldKey];
  delete newObj[oldKey];
  return newObj;
};

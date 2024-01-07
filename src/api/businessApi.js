import client from "./baseApiClient";

export const getAllBusinesses = (communityId, query = "", filter = {}) => {
  return client.post(`business/${communityId}`, {
    query,
    filter,
    limit: 300,
    skip: 0,
  });
};

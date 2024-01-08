import axios from "axios";
import client, { API_BASE_URL } from "./baseApiClient";

export const getAllCommunities = () => {
  return client.get("/community/all");
};

export const getUserCommunities = (userId) => {
  return client.get(`user/communities/${userId}`);
};

export const getCommunityDetailsForId = (id) => {
  return client.get(`/community/${id}`);
};

export const getCommunityMembersForCommunityId = (
  id,
  skip = 0,
  limit = 10,
  query = "",
  filter = {}
) => {
  return axios.post(
    `${API_BASE_URL}community/members/${id}`,
    {
      filter,
      query,
      skip,
      limit,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getMemberDetails = (userId) => {
  return client.get(`/user/${userId}`);
};

export const searchUser = (phone) => {
  return client.post(`/user/search`, {
    query: phone,
    filter: {},
    limit: 1,
    offset: 0,
  });
};

export const createUser = (input) => {
  return client.post(`/user/new`, {
    ...input,
  });
};

export const addToCommunity = (communityId, userId) => {
  return client.post(`/community/join/${communityId}`, {
    userId,
  });
};

export const removeFromCommunity = (communityId, userId) => {
  return client.delete(`/community/member/delete`, {
    data: {
      communityId,
      userId,
    },
  });
};

export const createRelation = (userId, relativeId, relationshipType) => {
  return client.post(`/relationship/relation/new`, {
    userId,
    relativeId,
    type: relationshipType,
  });
};

export const createReverseRelation = (userId, relativeId, relationshipType) => {
  return client.post(`/relationship/relation/new`, {
    userId: relativeId,
    relativeId: userId,
    type: relationshipType,
  });
};

export const createRelative = (input) => {
  return client.post(`/relationship/relative/new`, {
    ...input,
  });
};

export const updateAddress = (id, input) => {
  return client.put(`/address/${id}`, input);
};

export const updateBusiness = (id, input) => {
  return client.put(`/business/${id}`, input);
};

export const createBusiness = (input) => {
  return client.post(`/business/new`, input);
};

export const getAllTodaysBirthdays = (communityId) => {
  return client.get(`/user/events/${communityId}`);
};

export const wishBirthday = (to, from, communityId) => {
  return client.post(`/user/event/wishBirthday`, {
    to,
    from,
    communityId,
  });
};

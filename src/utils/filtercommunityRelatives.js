export const filtercommunityRelatives = (relatives, communityId) => {
  console.log("relatives", relatives);
  console.log("communityId", communityId);
  const filteredObj = relatives.filter((item) => {
    return checkCommunity(item.communities, communityId);
  });
  console.log("filteredObj", filteredObj);
  return filteredObj;
};
export const checkCommunity = (communities, communityId) => {
  let flag = false;
  communities.forEach((item) => {
    if (item.id === communityId) {
      console.log("item.id", item.id);
      flag = true;
    }
  });
  return flag;
};

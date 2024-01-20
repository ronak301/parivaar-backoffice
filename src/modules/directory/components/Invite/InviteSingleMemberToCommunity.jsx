import { Box } from "@chakra-ui/react";
import React from "react";
import UserAlreadyExist from "./UserAlreadyExist";
import NewUser from "./NewUser";
import InviteMemberInitiateForm from "./InviteMemberInitiateForm";
import MemberAddedSuccessFully from "./MemberAddedSuccessFully";

export const USER_EXIST_STATUS = {
  NOT_EXIST: "NOT_EXIST",
  EXIST_IN_PLATFORM_BUT_NOT_IN_COMMUNITY:
    "EXIST_IN_PLATFORM_BUT_NOT_IN_COMMUNITY",
  EXIST_IN_COMMUNITY: "EXIST_IN_COMMUNITY",
};

export default function InviteSingleMemberToCommunity({ communityDetails }) {
  const [inviteStatus, setInviteStatus] = React.useState();

  const [userExistStatus, setUserExistStatus] = React.useState(null);

  const [existingUser, setExistingUser] = React.useState(null);

  const [phone, setPhone] = React.useState("");

  let Component = <Box />;

  switch (userExistStatus) {
    case USER_EXIST_STATUS.NOT_EXIST:
      Component = (
        <NewUser
          communityId={communityDetails?.id}
          setInviteStatus={setInviteStatus}
          phone={phone}
        />
      );
      break;
    case USER_EXIST_STATUS.EXIST_IN_PLATFORM_BUT_NOT_IN_COMMUNITY:
      Component = (
        <UserAlreadyExist
          communityId={communityDetails?.id}
          user={existingUser}
          setExistingUser={setExistingUser}
          setUserExistStatus={setUserExistStatus}
          setInviteStatus={setInviteStatus}
        />
      );
      break;
    default:
      Component = (
        <InviteMemberInitiateForm
          setUserExistStatus={setUserExistStatus}
          communityDetails={communityDetails}
          setExistingUser={setExistingUser}
          phone={phone}
          setPhone={setPhone}
        />
      );
  }

  if (inviteStatus === "success") {
    return (
      <MemberAddedSuccessFully
        setInviteStatus={setInviteStatus}
        setExistingUser={setExistingUser}
        setUserExistStatus={setUserExistStatus}
      />
    );
  }

  return <>{Component}</>;
}

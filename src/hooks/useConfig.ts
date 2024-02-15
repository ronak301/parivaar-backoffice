import React from "react";
import { getFirebaseAppRemoteConfig } from "../api/firebase/firebase";

type Item = {
  id: string;
  label: string;
};

export type CommunityConfig = {
  features?: {
    WelcomeScreen?: boolean;
    AboutScreenExtraInfo?: boolean;
    ShowOnlyHeadsInAllMembers?: boolean;
  };
};

export type Config = {
  id: string;
  BloodGroups: Item[];
  BusinessTypes: Item[];
  Cities: Item[];
  CommunityTypes: Item[];
  FamilyMemberRelationshipTypes: Item[];
  Gender: Item[];
  Localities: Item[];
  State: Item[];
  appMeta: {
    currentVersionAndroid: {
      name: string;
      version: string;
    };
    currentVersionIos: {
      name: string;
      version: string;
    };
    minVersion: string;
  };
  configByCommunity: {
    [id: string]: CommunityConfig;
  };
};

export const useConfigManager = () => {
  const [config, setConfig] = React.useState<Config | null>(null);

  React.useEffect(() => {
    if (!config)
      getFirebaseAppRemoteConfig()
        .then((c) => {
          setConfig(c);
        })
        .catch(() => {});
  }, []);

  return {
    config,
  };
};

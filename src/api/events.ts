import axios from "axios";

export const sendEvent = (text: string) => {
  return axios.post(
    `https://discord.com/api/webhooks/1149059227273412639/fOf_NGJQ8pdnQmiQd1j5fnBF1uURdBTBCOjselXtE5-5Pe7TFxu7FfruQkRZguWaRsO1`,
    {
      username: "Test",
      content: text,
    }
  );
};

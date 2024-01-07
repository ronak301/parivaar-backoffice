import client from "./baseApiClient";

export const sendOtp = (number) => {
  return client.post(`/user/sendOtp`, {
    number,
  });
};

export const verifyOtp = (number, otp) => {
  return client.post(`/user/verifyOtp`, {
    number,
    otp,
  });
};

export const updateUser = (id, input) => {
  return client.put(`/user/${id}`, input);
};

export const deleteUser = (id) => {
  return client.delete(`/user/delete/${id}`);
};

export const mappedValue = (options, dvalue) => {
  options?.forEach(({ id, label }) => {
    if (id === dvalue) {
      dvalue = label;
    }
  });
  return dvalue;
};

export const mappedValue = (options, dvalue) => {
  options?.forEach(({ id, label }) => {
    if (id === dvalue) {
      dvalue = label;
    }
  });
  return dvalue;
};
export const reversedMappedValue = (options, dvalue) => {
  options?.forEach(({ id, label }) => {
    if (label === dvalue) {
      dvalue = id;
    }
  });

  return dvalue;
};

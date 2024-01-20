export const getUriImage = (uri: string | undefined | null) => {
  return uri || false ? { uri } : undefined;
};

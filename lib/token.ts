import localforage from "localforage";

export const storeTokens = async (accessToken: string) => {
  try {
    await localforage.setItem("accessToken", accessToken);
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
};

export const getTokens = async () => {
  try {
    const accessToken = await localforage.getItem("accessToken");
    return { accessToken };
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    return null;
  }
};

export const removeTokens = async () => {
  try {
    await localforage.removeItem("accessToken");
  } catch (error) {
    console.error("Error removing tokens:", error);
  }
};
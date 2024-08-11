export const fetcher = async (url: any, options = {}) => {
  let response;
  try {
    if (!options) {
      response = await fetch(url);
    } else {
      response = await fetch(url, options);
    }
    const data = await response.json();
    // console.log("data is ", data);
    if (
      data?.error?.status == 401 &&
      !window?.location?.pathname?.includes("sign-in")
    ) {
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

import { fetcher } from '@/lib/fetchers';
import axios from 'axios';

// update professional banner
export const updateBannerPic = async (
  image: any,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  jwt: any,
  profileId: any
) => {
  if (image) {
    setLoader(true);
    const body = new FormData();
    body.append('files', image);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload/`,
        body,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response) {
        const data = {
          Banner_photo: response.data[0].id,
        };
        const res = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-profiles/${profileId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              data: data,
            }),
            method: 'PUT',
          }
        );
        setLoader(false);
      } else {
        setLoader(false);
      }

      return response;
    } catch (error) {
      setLoader(false);
    }
  }
};

// update professional profile pic
export const updateProfessionalPic = async (
  image: any,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  jwt: any,
  profileId: any,
  clientId:any
) => {
  if (image) {
    setLoader(true);
    const body = new FormData();
    body.append('files', image);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload/`,
        body,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response) {
        const data = {
          professional_photo: response.data[0].id,
        };
        const data1 = {
          profile_pic: response.data[0].id,
        };
        const res = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-profiles/${profileId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              data: data,
            }),
            method: 'PUT',
          }
        );
        const res1 = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/client-profiles/${clientId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              data: data1,
            }),
            method: 'PUT',
          }
        );
        setLoader(false);
      } else {
        setLoader(false);
      }

      return response;
    } catch (error) {
      setLoader(false);
    }
  }
};

export const updateProfessionalDetails = async (
  data: any,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  jwt: any,
  profileId: any
) => {
  setLoader(true);

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-profiles/${profileId}`,
      {
        data: {
          ...data,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setLoader(false);
    return response;
  } catch (error) {
    setLoader(false);
  }
};

export const updateEvent = async (
  data: any,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  jwt: any,
  eventId: any
) => {
  setLoader(true);

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${eventId}`,
      {
        data: {
          ...data,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setLoader(false);
    return response;
  } catch (error) {
    setLoader(false);
  }
};

export const createEvent = async (
  data: any,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  jwt: string
) => {
  setLoader(true);

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/`,
      {
        data: {
          ...data,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setLoader(false);
    return response.data.data.id;
  } catch (error) {
    setLoader(false);
  }
};

export const updateProfessionalAgencyDetails = async (
  data: any,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  jwt: any,
  AgentId: any,
  profileId: any,
  profId: any
) => {
  setLoader(true);

  try {
    if (!AgentId) {
      const profile = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/agencies`,
        {
          data: {
            client_profile: profileId,
            professional_profile: profId,
            ...data,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } else {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/agencies/${AgentId}`,
        {
          data: {
            ...data,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    }

    setLoader(false);
  } catch (error) {
    setLoader(false);
  }
};

export const deleteEduArticles = async (
  id: number | string | undefined,
  jwt: any
) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error('Error at Delete Document: ', err);
  }
};


export const deleteServ = async (
  id: number | string | undefined,
  jwt: any
) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/services/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error('Error at Delete Document: ', err);
  }
};

export const updateEduArticles = async (
  id: number | string | undefined,
  data: any,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  jwt: any
) => {
  setLoader(true);

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/${id}`,
      {
        data: {
          ...data,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setLoader(false);
    return response;
  } catch (error) {
    setLoader(false);
  }
};

export const deletePortfolio = async (
  id: number | string | undefined,
  jwt: any
) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/portfolios/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error('Error at Delete Document: ', err);
  }
};

export const deleteCetification = async (
  id: number | string | undefined,
  jwt: any
) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/certifications/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error('Error at Delete Document: ', err);
  }
};

export const updateCetification = async (
  id: number | string | undefined,
  data: any,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  jwt: any
) => {
  setLoader(true);

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/certifications/${id}`,
      {
        data: {
          ...data,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setLoader(false);
    return response;
  } catch (error) {
    setLoader(false);
  }
};

export const updatePortfolio = async (
  id: number | string | undefined,
  data: any,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  jwt: any
) => {
  setLoader(true);
            
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/portfolios/${id}`,
      {
        data: {
          ...data,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setLoader(false);
    return response;
  } catch (error) {
    setLoader(false);
  }
};

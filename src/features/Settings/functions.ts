import axios from 'axios';

export async function updateUserAccount(
  id: number,
  data: undefined | null | Record<string, any>,
  jwt: string
) {
  if (jwt) {
    return await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${id}`,

      {
        email: data?.email,
        username: data?.username,
      },

      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  } else {
    return;
  }
}

type updateData = {
  email?: string | null | undefined;
  first_name?: string | null | undefined;
  last_name?: string | null | undefined;
  location?: string | null | undefined;
  gender?: string | null | undefined;
  favourites?: any[];
};

export async function updateProfileAccount(
  id: number,
  data: updateData,
  jwt: string
) {
  if (jwt) {
    return await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/client-profiles/${id}`,
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
  } else {
    return;
  }
}

export async function changeUserPassword(data: any, jwt: any) {
  if (jwt) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/change-password`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  }
}


export async function uploadListingRefferelCode(data: any, jwt: any) {
  if (jwt) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/listing-invites`,
      { data: data },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  }
}

export async function uploadRefferelCodeToDb(data: any, jwt: any) {
  if (jwt) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/referrals`,
      { data: data },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  }
}

// get the user by Email
export async function getProfessionalByEmail(email: string, jwt: string) {
  if (jwt) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/client-profiles?filters[user][email][$eq]=${email}&filters[professional_profile][id][$notNull]=true&populate[0]=professional_profile`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response?.data?.data?.length < 1) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-profiles?filters[email][$eq]=${email}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (response?.data?.data?.length < 1) {
          return false;
        } else {
          return response?.data?.data[0]?.id
        }
      } else {
        return response?.data?.data[0]?.attributes?.professional_profile?.data
          ?.id;
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  } else {
    throw new Error('JWT token is missing');
  }
}

export async function getPlans(jwt: string) {
  if (jwt) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/subscriptions`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  } else {
    throw new Error('JWT token is missing');
  }
}

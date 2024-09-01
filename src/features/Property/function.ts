import { fetcher } from '@/lib/fetchers';
import axios from 'axios';

const getProperty = async (jwt: any, id: any) => {
  try {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/listings/${id}?&populate[0]=coverPhoto&populate[1]=Gallery&populate[2]=user_generated_showcase&populate[3]=professional_profile.client_profile.user&populate[4]=client_profile&populate[5]=event&populate[6]=invites.professional_photo&populate[7]=invites.client_profile.user&populate[8]=additional_information&populate[9]=overview&populate[10]=furnitureSugesstions&populate[11]=energy_efficiency_metrics&populate[12]=interactiveFloorPlans`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        method: 'GET',
      }
    );
    return res;
  } catch (err) {
    console.error('Error at Get Property: ', err);
  }
};

const createProperty = async (jwt: any, data: any) => {
  try {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/listings?&populate=*`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: data,
        }),
        method: 'POST',
      }
    );

    return res;
  } catch (err) {
    console.error('Error at Updating Property: ', err);
  }
};

const updateProperty = async (jwt: any, id: any, data: any) => {
  try {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/listings/${id}?&populate=*`,
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

    return res;
  } catch (err) {
    console.error('Error at Updating Property: ', err);
  }
};

const updateViews = async (jwt: any, id: any, profileId: any) => {
  try {
    const data = {
      properties_viewed: {
        connect: [id],
      },
    };

    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/client-profiles/${profileId}`,
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
    console.log('added view');
    return res;
  } catch (err) {
    console.error('An error occured');
  }
};

async function uploadImage(jwt: any, picture: File | File[]) {
  const files = Array.isArray(picture) ? picture : [picture];

  if (files.length === 0) {
    return [];
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log('Error uploading images:', error);
    throw error;
  }
}

async function destroyImage(jwt: any, id: any | null) {
  if (id) {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload/files/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log('error is ', error);
    }
  }
}

const uploadImageByUrl = async (jwt: string, imageUrl: string) => {
  if (!imageUrl) {
    return 'Please enter an image URL.';
  }

  try {
    // Fetch the image from the provided URL
    const response = await fetch(imageUrl);

    // Convert the image to a Blob
    const myBlob = await response.blob();

    // Check the MIME type of the Blob
    const mimeType = myBlob.type;
    if (mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
      return 'Only PNG and JPG images are allowed.';
    }

    // Create a FormData object and append the Blob
    const formData = new FormData();
    formData.append('files', myBlob, 'uploaded_image_by_url'); // The third parameter is the filename

    // Upload the image to Strapi
    const uploadResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error('Image upload failed');
    }

    const result = await uploadResponse.json();
    console.log('Image uploaded successfully:', result);
    return result;
  } catch (error) {
    console.error('Error uploading image:', error);
    return 'An error occurred while uploading the image.';
  }
};

export {
  getProperty,
  createProperty,
  updateProperty,
  uploadImage,
  destroyImage,
  uploadImageByUrl,
  updateViews,
};

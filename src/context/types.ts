import { Dispatch, SetStateAction } from 'react';

// auth context types
export type AuthProps = {
  jwt?: string | null;
  profileId?: number;
  loading?: boolean;
  profileEmail?: string;
  userId?: number;
  userRole?: string;
  profile?: Profile;
  professionalId?: string;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  user?: UserData;
  prof?: ProfileSettings;
  profileBanner?: string;
  profilepic?: string;
  agency?: AgencyData;
  logoId: any;
  setLogoId: Dispatch<any>;
};

export interface UserData {
  data?: {
    attributes: {
      createdAt?: string | null;
      email?: string | null;
      name?: string | null;
      username?: string | null;
    };
    id?: number;
  };
}

export interface AgencyData {
  data?: {
    attributes: {
      Agency_name?: string | null;
      Agency_bio?: string | null;
      Expertise?: string | null;
      Tax_number?: string | null;
      Service_area?: string | null;
    };
    id?: number;
  };
}

export interface Portfolio {
  attributes: {
    name?: string;
    description?: string;
    location?: string;
    price?: string;
    currency?: string;
    Gallery?: {
      data?: Array<{
        attributes?: {
          url?: string | null;
        };
      }>;
    };
  };

  id?: number;
}

export interface Cert {
  attributes: {
    name?: string;
    issued_by?: string;
    issue_date?: string;
    type?: ['Award', 'Certification'];
  };
  id?: number;
}

export interface Article {
  attributes: {
    title?: string;
    description?: string;
    body?: string;
    article_banner?: {
      data?: {
        attributes?: {
          url?: string | null;
        };
      };
    };
    createdAt?: string;
  };
  id?: number;
}

export interface Service {
  attributes: {
    name?: string;
    description?: string;
    location?: string;
    price?: string;
    currency?: string;
    Gallery?: Array<{
      data?: {
        attributes?: {
          url?: string | null;
        };
      };
    }>;
  };
  id?: number;
}

export interface Event {
  attributes: {
    location?: string;
    event_type?: string;
    dates?: any[];
    listing?: Listing;
  };
  id?: number;
}

export interface Listing {
  attributes: {
    name?: string;
    description?: string;
    location?: string;
    status?: ['active', 'sold'];
    price?: string;
    currency?: string;
    views?: number;
    favourites?: number;
    Gallery?: Array<{
      data?: {
        attributes?: {
          url?: string | null;
        };
      };
    }>;
    coverPhoto?: 
      | Array<{ data?: { attributes?: { url?: string | null } } }>
      | { data?: { attributes?: { url?: string | null } } };
    event?: {
      data?: Event;
    };
    coverPhotoFromUrl: string | null;
  };
  id?: number;
}

export interface ProfileSettings {
  data?: {
    attributes: {
      url_link?: string | null;
      full_name?: string | null;
      Experience?: string | null;
      phone?: string | null;
      email?: string | null;
      city?: string | null;
      social_links?: any[] | null;
      professional_photo?: {
        data?: {
          attributes?: {
            url?: string | null;
          };
        };
      };
      profile_logo?: {
        data?: {
          attributes?: {
            url?: string | null;
            name?: string | null;
          };
          id?: number;
        };
      };
      brand_color?: string | null;
      Custom_cta_button?: string | null;
      promo_text?: string | null;
      promo_code?: string | null;
    };
    id?: number;
  };
}

interface ProfileAttributes {
  birthday?: string | null;
  first_name?: string | null;
  gender?: string | null;
  last_name?: string | null;
  location?: string | null;
  address?: string | null;
  zip?: string | null;
  state?: string | null;
  phone?: string | null;
  role?: string;
  user?: UserData;
  professional_profile?: ProfileSettings;
  agency?: AgencyData;
  favourites?: any[];
  views?: any[];
  planId?: string | null;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripePriceId?: string | null;
  profile_pic?: any;
}

export type Profile = {
  id: number;
  attributes: ProfileAttributes;
};

// profilesettings context types

export type ProfSettingsProps = {
  banner?: string;
  setBanner?: Dispatch<SetStateAction<undefined>>;
  bannerLoader?: boolean;
  setBannerLoader?: Dispatch<SetStateAction<boolean>>;
  professional_photo?: undefined;
  profileLogo?: File | string | null | undefined;
  setPortfolioLoader?: Dispatch<SetStateAction<boolean>>;
  portfolioLoader?: boolean;
  setListingsLoader?: Dispatch<SetStateAction<boolean>>;
  listingsLoader?: boolean;
  setServicesLoader?: Dispatch<SetStateAction<boolean>>;
  servicesLoader?: boolean;
  setCertLoader?: Dispatch<SetStateAction<boolean>>;
  certLoader?: boolean;
  setArticleLoader?: Dispatch<SetStateAction<boolean>>;
  articleLoader?: boolean;
  setRealtorLoader?: Dispatch<SetStateAction<boolean>>;
  reviewsLoader: boolean;
  setReviewsLoader: Dispatch<SetStateAction<boolean>>;
  realtorLoader?: boolean;
  setBrokerLoader?: Dispatch<SetStateAction<boolean>>;
  brokerLoader?: boolean;
  setSelectedListing?: Dispatch<any>;
  selectedListing?: any;
  data : any[];
  setData: Dispatch<SetStateAction<any[]>>;
  setEventDetails?: Dispatch<
    SetStateAction<{
      location: string;
      event_type: string;
    }>
  >;

  eventDetails?: {
    location: string;
    event_type: string;
  };
  setDays?: Dispatch<any>;
  days?: any;
  profileCustomization?: {
    Custom_cta_button: string;
    url_link: string;
    brand_color: string;
  };
  setProfileCustomization?: Dispatch<
    SetStateAction<{
      Custom_cta_button: string;
      url_link: string;
      brand_color: string;
    }>
  >;
  setProfessionalPhoto?: Dispatch<SetStateAction<undefined>>;
  setProfileLogo?: Dispatch<SetStateAction<File | string | null | undefined>>;
  profAgentDetails?: {
    Agency_name: string;
    Agency_bio: string;
    Expertise: string;
    Tax_number: string;
    Service_area: string;
  };
  setProfAgentDetails?: Dispatch<
    SetStateAction<{
      Agency_name: string;
      Agency_bio: string;
      Expertise: string;
      Tax_number: string;
      Service_area: string;
    }>
  >;
  profDetails?: {
    full_name: string;
    Experience: string;
    phone: string;
    email: string;
    city: string;
    social_links?: any[];
    promo_text: string;
    promo_code:string
  };
  setProfDetails?: Dispatch<
    SetStateAction<{
      full_name: string;
      Experience: string;
      phone: string;
      email: string;
      city: string;
      social_links?: Array<{ value: string; source: string; url: string }>;
      promo_code: string;
      promo_text: string;
    }>
  >;
  isEditing?:boolean;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
};

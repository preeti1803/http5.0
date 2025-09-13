export interface LoginForm {
  phoneNumber: string;
  otp: string;
}

export interface SignupForm extends LoginForm {
  name: string;

}
export interface Hospital {
  id: string;
  name: string;
  distance: number;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  emergency?: boolean;
  specialties?: string[];
}

export interface User {
  id: string;
  name: string;
  phone: string; // Note: using 'phone' instead of 'phoneNumber'

  createdAt: Date;
}

export interface SignupForm {
  name: string;
  phoneNumber: string;
  
  otp: string;
}
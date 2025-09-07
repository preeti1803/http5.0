export interface LoginForm {
  phoneNumber: string;
  otp: string;
}

export interface SignupForm extends LoginForm {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
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
  age: number;
  gender: 'male' | 'female' | 'other';
  createdAt: Date;
}

export interface SignupForm {
  name: string;
  phoneNumber: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  otp: string;
}
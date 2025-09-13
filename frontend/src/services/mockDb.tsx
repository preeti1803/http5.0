interface User {
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
}

class MockDatabase {
  private users: User[] = [];
  private otpStore: Map<string, {otp: string, expiry: Date}> = new Map();

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }


  async verifyOTP(phone: string, otp: string): Promise<boolean> {
    const storedData = this.otpStore.get(phone);
    if (!storedData) return false;
    
    const { otp: correctOtp, expiry } = storedData;
    if (Date.now() > expiry.getTime()) {
      this.otpStore.delete(phone);
      return false;
    }

    return otp === correctOtp;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    return this.users.find(user => user.phone === phone);
  }
  async sendOTP(phoneNumber: string): Promise<boolean> {
    const otp = this.generateOTP();
    const expiry = new Date(Date.now() + 5 * 60000); // 5 minutes expiry
    this.otpStore.set(phoneNumber, { otp, expiry });
    
    // Development-only console output
    if (process.env.NODE_ENV === 'development') {
      console.log('%c🔐 OTP Details:', 'background: #333; color: #bada55; padding: 2px;');
      console.log(`📱 Phone: ${phoneNumber}`);
      console.log(`🔑 OTP: ${otp}`);
      console.log(`⏰ Expires: ${expiry.toLocaleTimeString()}`);
    }

    return true;
  }
}

export const mockDb = new MockDatabase();
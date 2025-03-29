export interface UserTypeFromApi {
    dateOfBirth: string; // "0001-01-01T00:00:00"
    email: string; // "SN@example.com"
    fullName: string; // "Surya Narayana"
    location: string | null; // null or string value
    mobileNo: string | null; // null or string value
    policeStation: string | null; // null or string value
    rank: string; // "IG"
    role: number; // 0 (role identifier)
    userId: number; // 1 (user identifier)
    zone: string | null; // null or string value
  }

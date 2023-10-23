export interface User {
  user: UserClass;
  token: string;
}

export interface UserClass {
  roles: string[];
  _id: string;
  email: string;
  telephone: string;
  avatar: string;
  isActive: boolean;
  profileImage: string;
  lastLogin: Date;
  isVerified: boolean;
  notifications: string[];
  companyName: string;
  nameCompanyRep: string;
  numColegiado: string;
  surnameCompanyRep: string;
  industryType: string;
  companySize: string;
  companyWebsite: string;
  socialLinks: string[];
  location: string;
  companyDescription: string;
  openRoles: string[];
  jobTitle: string;
  educationLevel: string;
  languages: string[];
  certifications: string[];
  portfolioUrl: string;
  resumeUrl: string;
  availability: string;
  signupDate: Date;
  isCompany: boolean;
  curriculum: string[];
  skills: string[];
  preferences: Preferences;
  appliedProjects: any[];
  peopleBlocked: any[];
  previousProjects: any[];
  projects: any[];
}

export interface Preferences {
  typeOfProjects: string[];
  cityOfProjects: string[];
  areaLegalProjects: string[];
  _id: string;
}

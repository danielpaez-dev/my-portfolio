export type Locale = "es" | "en";

export interface ResumeData {
  basics: Basics;
  aboutMe: AboutMe;
  workExperience: Array<WorkExperience>;
  volunteer: Array<Volunteer>;
  education: Array<Education>;
  awards: Array<Award>;
  certificates: Array<Certificate>;
  publications: Array<Publication>;
  skills: Skills;
  languages: Array<Language>;
  interests: Array<Interest>;
  references: Array<Reference>;
  projects: Projects;
}

export interface Basics {
  name: string;
  label: string;
  image: string;
  url: string;
  summary: string;
  contact: Contact;
  location: Location;
  profiles: Array<Profile>;
}

export interface Contact {
  email: Email;
  phone: Phone;
}

export interface Email {
  email: string;
  emailIcon: string;
}

export interface Phone {
  phone: string;
  phoneIcon: string;
}

export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
  icon: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
  icon: string;
}

export interface AboutMe {
  icon: string;
  description: string;
}

export interface WorkExperience {
  icon: string;
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: Array<string>;
}

export interface Volunteer {
  icon: string;
  organization: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: Array<string>;
}

export interface Education {
  icon: string;
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: Array<string>;
}

export interface Award {
  icon: string;
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

export interface Certificate {
  icon: string;
  name: string;
  date: string;
  issuer: string;
  credential_url: string;
  credential_id: string;
  summary: string;
  skills: Array<string>;
  image: string;
}

export interface Publication {
  icon: string;
  name: string;
  publisher: string;
  releaseDate: string;
  url: string;
  summary: string;
}

export interface Skills {
  icon: string;
  list: Array<Skill>;
}

export interface Skill {
  name: string;
  keywords: Array<string>;
  icon: string;
}

export interface Language {
  language: string;
  fluency: string;
  icon: string;
}

export interface Interest {
  name: string;
  keywords: Array<string>;
}

export interface Reference {
  name: string;
  image: string;
  reference: string;
}

export interface Projects {
  icon: string;
  list: Array<Project>;
}

export interface Project {
  name: string;
  description: string;
  highlights: Array<string>;
  url: string;
  githubURL: string;
  image: string;
  keywords: Array<string>;
}

export interface AuthorProfile {
  name: string;
  role: string;
  credential: string;
  bio: string;
  profilePath: string;
  /** Public profiles that confirm who the author is (LinkedIn, organisation site). Add only real URLs the owner provides. */
  sameAs?: readonly string[];
}

const najeebDegree = 'MSc in Environmental Sciences';

export const authors: readonly AuthorProfile[] = [
  {
    name: 'Najeeb',
    role: 'Founder and editor',
    credential: najeebDegree,
    bio: `Najeeb holds an ${najeebDegree} and works as a conservation scientist with hands-on field survey experience. He founded HydroRigor to make home hydroponics advice traceable to university and extension research, and he checks every guide he publishes against the sources listed at the end of it.`,
    profilePath: '/about/#najeeb',
  },
];

export function findAuthor(name: string): AuthorProfile | undefined {
  return authors.find((author) => author.name === name);
}

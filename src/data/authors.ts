export interface AuthorProfile {
  name: string;
  role: string;
  bio: string;
  profilePath: string;
}

export const authors: readonly AuthorProfile[] = [
  {
    name: 'Najeeb',
    role: 'Founder and editor',
    bio: 'Najeeb is a master’s-trained conservation scientist with hands-on field survey experience. He founded HydroRigor to make home hydroponics advice traceable to university and extension research, and he checks every guide he publishes against the sources listed at the end of it.',
    profilePath: '/about/#najeeb',
  },
];

export function findAuthor(name: string): AuthorProfile | undefined {
  return authors.find((author) => author.name === name);
}

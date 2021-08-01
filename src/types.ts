const Unknown = 'unknown';
export type Url = string;
export type DateTime = string;
export const CharacterStatus = {
  Alive: 'Alive',
  Dead: 'Dead',
  Unknown,
} as const;

export const Genders = {
  Female: 'Female',
  Male: 'Male',
  Genderless: 'Genderless',
  Unknown,
} as const;

Object.freeze(CharacterStatus);
Object.freeze(Genders);

export type ResourceRef = {
  url: Url;
  name: string;
};

interface Resource {
  id: number;
  url: Url;
  created: DateTime;
}

export interface Character extends Resource {
  name: string;
  status: typeof CharacterStatus[keyof typeof CharacterStatus];
  species: string;
  type: string;
  gender: typeof Genders[keyof typeof Genders];
  origin: ResourceRef;
  location: ResourceRef;
  image: Url;
  episode: Array<Url>;
}

export interface Location extends Resource {
  name: string;
  type: string;
  dimention: string;
  residents: Array<Url>;
}

export interface Episode extends Resource {
  name: string;
  // eslint-disable-next-line camelcase
  air_date: string;
  episode: string;
  characters: Array<Url>;
}

export type PaginationInfo = {
  count: number;
  pages: number;
  next: Url | null;
  prev: Url | null;
};

export type Page<R> = {
  error?: string;
  info?: PaginationInfo;
  results?: Array<R>;
};

export type PageQuery<R> = Partial<R> & {
  page?: number | string;
};

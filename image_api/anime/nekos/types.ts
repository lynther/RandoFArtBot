export enum NekosRating {
  Safe = 'safe',
  Suggestive = 'suggestive',
  Borderline = 'borderline',
  Explicit = 'explicit',
}

export interface Query {
  rating: NekosRating;
  limit?: string;
  tags?: string;
}

export interface ImageData {
  id: number;
  url: string;
  rating: NekosRating;
  color_dominant: number[];
  color_palette: Array<number[]>;
  artist_name: null | string;
  tags: string[];
  source_url: null | string;
}

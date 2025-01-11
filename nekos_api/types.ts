export type Rating = 'safe' | 'suggestive' | 'borderline' | 'explicit';

export interface Query {
  rating: Rating;
  limit?: string;
  tags?: string;
}

export interface ImageData {
  id: number;
  url: string;
  rating: Rating;
  color_dominant: number[];
  color_palette: Array<number[]>;
  artist_name: null | string;
  tags: string[];
  source_url: null | string;
}

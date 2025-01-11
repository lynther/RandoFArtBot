export interface Query {
  tags: string;
}

export interface Data {
  posts: Post[];
}

export interface Post {
  id: number;
  created_at: Date;
  updated_at: Date;
  file: File;
  preview: Preview;
  sample: Sample;
  score: Score;
  tags: Tags;
  locked_tags: any[];
  change_seq: number;
  flags: Flags;
  rating: string;
  fav_count: number;
  sources: string[];
  pools: any[];
  relationships: Relationships;
  approver_id: number;
  uploader_id: number;
  description: string;
  comment_count: number;
  is_favorited: boolean;
  has_notes: boolean;
  duration: null;
}

export interface File {
  width: number;
  height: number;
  ext: string;
  size: number;
  md5: string;
  url: string;
}

export interface Flags {
  pending: boolean;
  flagged: boolean;
  note_locked: boolean;
  status_locked: boolean;
  rating_locked: boolean;
  deleted: boolean;
}

export interface Preview {
  width: number;
  height: number;
  url: string;
}

export interface Relationships {
  parent_id: null;
  has_children: boolean;
  has_active_children: boolean;
  children: any[];
}

export interface Sample {
  has: boolean;
  height: number;
  width: number;
  url: string;
  alternates: Alternates;
}

export interface Alternates {}

export interface Score {
  up: number;
  down: number;
  total: number;
}

export interface Tags {
  general: string[];
  artist: string[];
  contributor: string[];
  copyright: string[];
  character: string[];
  species: string[];
  invalid: any[];
  meta: string[];
  lore: any[];
}

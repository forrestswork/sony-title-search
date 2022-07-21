export interface Title{
  id: string;
  name: string;
  full_name: string;
  level_1_title?: string | null;
  external_id?: number | null;
  season_number?: string | null;
  episode_number?: string | null;
  title_level?: string | null;
}

export interface TitleState {
  titles: Title[];
  myTitles: Title[];
  dirty: boolean;
  filter: string | null;
}

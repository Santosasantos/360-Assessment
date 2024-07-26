export interface IRating {
  id: number;
  rating?: string | null;
  ratingvalue?: number | null;
}

export type NewRating = Omit<IRating, 'id'> & { id: null };

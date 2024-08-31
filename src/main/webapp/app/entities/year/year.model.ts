export interface IYear {
  id: number;
  year?: number | null;
}

export type NewYear = Omit<IYear, 'id'> & { id: null };

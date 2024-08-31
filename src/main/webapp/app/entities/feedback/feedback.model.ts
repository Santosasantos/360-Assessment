import dayjs from 'dayjs/esm';
import { IEmployee } from 'app/entities/employee/employee.model';
import { IYear } from 'app/entities/year/year.model';

export interface IFeedback {
  id: number;
  requestDate?: dayjs.Dayjs | null;
  status?: string | null;
  responseDate?: dayjs.Dayjs | null;
  requesters?: IEmployee | null;
  responders?: IEmployee | null;
  sessions?: IYear | null;
}

export type NewFeedback = Omit<IFeedback, 'id'> & { id: null };

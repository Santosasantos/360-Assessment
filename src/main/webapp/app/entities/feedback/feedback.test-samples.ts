import dayjs from 'dayjs/esm';

import { IFeedback, NewFeedback } from './feedback.model';

export const sampleWithRequiredData: IFeedback = {
  id: 9510,
  requestDate: dayjs('2024-06-22T19:41'),
  status: 'correctly',
};

export const sampleWithPartialData: IFeedback = {
  id: 24236,
  requestDate: dayjs('2024-06-23T08:02'),
  status: 'meh frequent jovial',
  responseDate: dayjs('2024-06-23'),
};

export const sampleWithFullData: IFeedback = {
  id: 21896,
  requestDate: dayjs('2024-06-23T00:05'),
  status: 'unexpectedly bestir sophisticated',
  responseDate: dayjs('2024-06-23'),
};

export const sampleWithNewData: NewFeedback = {
  requestDate: dayjs('2024-06-22T14:48'),
  status: 'against',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

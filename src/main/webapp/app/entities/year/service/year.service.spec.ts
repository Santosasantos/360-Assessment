import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IYear } from '../year.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../year.test-samples';

import { YearService } from './year.service';

const requireRestSample: IYear = {
  ...sampleWithRequiredData,
};

describe('Year Service', () => {
  let service: YearService;
  let httpMock: HttpTestingController;
  let expectedResult: IYear | IYear[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(YearService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Year', () => {
      const year = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(year).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Year', () => {
      const year = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(year).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Year', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Year', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Year', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addYearToCollectionIfMissing', () => {
      it('should add a Year to an empty array', () => {
        const year: IYear = sampleWithRequiredData;
        expectedResult = service.addYearToCollectionIfMissing([], year);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(year);
      });

      it('should not add a Year to an array that contains it', () => {
        const year: IYear = sampleWithRequiredData;
        const yearCollection: IYear[] = [
          {
            ...year,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addYearToCollectionIfMissing(yearCollection, year);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Year to an array that doesn't contain it", () => {
        const year: IYear = sampleWithRequiredData;
        const yearCollection: IYear[] = [sampleWithPartialData];
        expectedResult = service.addYearToCollectionIfMissing(yearCollection, year);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(year);
      });

      it('should add only unique Year to an array', () => {
        const yearArray: IYear[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const yearCollection: IYear[] = [sampleWithRequiredData];
        expectedResult = service.addYearToCollectionIfMissing(yearCollection, ...yearArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const year: IYear = sampleWithRequiredData;
        const year2: IYear = sampleWithPartialData;
        expectedResult = service.addYearToCollectionIfMissing([], year, year2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(year);
        expect(expectedResult).toContain(year2);
      });

      it('should accept null and undefined values', () => {
        const year: IYear = sampleWithRequiredData;
        expectedResult = service.addYearToCollectionIfMissing([], null, year, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(year);
      });

      it('should return initial array if no Year is added', () => {
        const yearCollection: IYear[] = [sampleWithRequiredData];
        expectedResult = service.addYearToCollectionIfMissing(yearCollection, undefined, null);
        expect(expectedResult).toEqual(yearCollection);
      });
    });

    describe('compareYear', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareYear(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareYear(entity1, entity2);
        const compareResult2 = service.compareYear(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareYear(entity1, entity2);
        const compareResult2 = service.compareYear(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareYear(entity1, entity2);
        const compareResult2 = service.compareYear(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as dateManager from '../../helpers/expiration';

import { TestComponent } from './test.component';

describe('Validating Expiration and Near Expiration function', () => {
  const daysForExpiration = 7;
  const date1 = '4/21/2020';
  const date2 = '4/23/2020';
  const date3 = '4/23/20 18:00';
  const date4 = '4/24/20';
  const date5 = '4/30/2020';
  const date6 = '5/1/2020';

  describe('Testing Near Expiration condition', () => {
    it(`Testing date ${date1}. Should not be near expiration, its already expired`, () => {
      expect(dateManager.isNearExpiration(date1, daysForExpiration)).toBe(
        false
      );
    });
    it(`Testing date ${date2}. Should not be near expiration, its already expired`, () => {
      expect(dateManager.isNearExpiration(date2, daysForExpiration)).toBe(
        false
      );
    });
    it(`Testing date ${date3}. Should be near expiration`, () => {
      expect(dateManager.isNearExpiration(date3, daysForExpiration)).toBe(true);
    });
    it(`Testing date ${date4}. Should be near expiration`, () => {
      expect(dateManager.isNearExpiration(date4, daysForExpiration)).toBe(true);
    });
    it(`Testing date ${date5}. Should be near expiration`, () => {
      expect(dateManager.isNearExpiration(date5, daysForExpiration)).toBe(true);
    });
    it(`Testing date ${date6}. Should not be near expiration, its not within the 7 day period`, () => {
      expect(dateManager.isNearExpiration(date6, daysForExpiration)).toBe(
        false
      );
    });
  });

  describe('Testing Expired condition', () => {
    it(`Testing date ${date1}. Should be expired`, () => {
      expect(dateManager.isExpired(date1)).toBe(true);
    });
    it(`Testing date ${date2}. Should be expired`, () => {
      expect(dateManager.isExpired(date2)).toBe(true);
    });
    it(`Testing date ${date3}. Should not be expired, its still not 6:00pm`, () => {
      expect(dateManager.isExpired(date3)).toBe(false);
    });
    it(`Testing date ${date4}. Should not be expired`, () => {
      expect(dateManager.isExpired(date4)).toBe(false);
    });
    it(`Testing date ${date5}. Should not be expired`, () => {
      expect(dateManager.isExpired(date5)).toBe(false);
    });
    it(`Testing date ${date6}. Should not be expired`, () => {
      expect(dateManager.isExpired(date6)).toBe(false);
    });
  });
});

import { isSameDate } from "../../src/bl/time.bl";

describe('isSameDate', () => {
    it('should return true for the same date', () => {
        const date1 = new Date('2023-10-01T00:00:00Z');
        const date2 = new Date('2023-10-01T23:59:59Z');
        expect(isSameDate(date1, date2)).toBe(true);
    });

    it('should return false for different dates', () => {
        const date1 = new Date('2023-10-01T00:00:00Z');
        const date2 = new Date('2023-10-02T00:00:00Z');
        expect(isSameDate(date1, date2)).toBe(false);
    });

    it('should return false for different months', () => {
        const date1 = new Date('2023-10-01T00:00:00Z');
        const date2 = new Date('2023-11-01T00:00:00Z');
        expect(isSameDate(date1, date2)).toBe(false);
    });

    it('should return false for different years', () => {
        const date1 = new Date('2023-10-01T00:00:00Z');
        const date2 = new Date('2022-10-01T00:00:00Z');
        expect(isSameDate(date1, date2)).toBe(false);
    });
});






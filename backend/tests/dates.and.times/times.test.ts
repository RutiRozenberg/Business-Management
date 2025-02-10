import { isBeforeTime, isValidTimes } from '../../src/bl/time.bl'

describe('isBeforeTime', () => {
    it('should return true if dateData1 is before dateData2', () => {
        const date1 = new Date('2023-10-01T13:00:00Z');
        const date2 = new Date('2023-10-01T14:00:00Z');
        expect(isBeforeTime(date1, date2)).toBe(true);
    });

    it('should return false if dateData1 is after dateData2', () => {
        const date1 = new Date('2023-10-01T12:00:00Z');
        const date2 = new Date('2023-10-01T11:00:00Z');
        expect(isBeforeTime(date1, date2)).toBe(false);
    });

    it('should return false if dateData1 is the same hour and minute as dateData2', () => {
        const date1 = new Date('2023-10-01T11:00:00Z');
        const date2 = new Date('2023-10-01T11:00:00Z');
        expect(isBeforeTime(date1, date2)).toBe(false);
    });

    it('should return true if dateData1 is the same hour but earlier minute than dateData2', () => {
        const date1 = new Date('2023-10-01T11:00:00Z');
        const date2 = new Date('2023-10-01T11:05:00Z');
        expect(isBeforeTime(date1, date2)).toBe(true);
    });
});



describe('isValidTimes', () => {
    it('should return false if start or end date is invalid', () => {
        expect(isValidTimes(new Date('invalid-date'), new Date())).toBe(false);
        expect(isValidTimes(new Date(), new Date('invalid-date'))).toBe(false);
    });

    it('should return false if start date is after end date', () => {
        const start = new Date('2023-10-02T22:00:00Z');
        const end = new Date('2023-10-01T23:00:00Z');
        expect(isValidTimes(start, end)).toBe(false);
    });

    it('should return false if start and end date are the same but start time is before current time', () => {
        const start = new Date();
        const end = new Date(start);
        start.setHours(start.getHours() - 1); 
        expect(isValidTimes(start, end)).toBe(false);
    });

    it('should return true if start date is before end date and valid', () => {
        const start = new Date();
        const end = new Date(start);
        end.setHours(end.getHours() + 1); 
        expect(isValidTimes(start, end)).toBe(true);
    });
});


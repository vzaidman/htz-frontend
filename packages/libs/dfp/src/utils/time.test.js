import { addHours, addDays, } from './time';

describe('addHours', () => {
  it('should be a function', () => {
    expect(typeof addHours).toBe('function');
  });

  it('should throw an error when called without any parameters', () => {
    expect(() => addHours()).toThrowError(Error);
  });

  it('should throw an error when called with a single parameter', () => {
    expect(() => addHours(new Date())).toThrowError(Error);
  });

  it("should not throw an error when called with an integer as the 'hours' param", () => {
    expect(() => addHours(new Date(), 5)).not.toThrowError(Error);
  });

  it("should not throw an error when called with an string as the 'hours' param", () => {
    expect(() => addHours(new Date(), '5')).not.toThrowError(Error);
  });

  it("should not throw an error when called with an float as the 'hours' param", () => {
    expect(() => addHours(new Date(), 2.515)).not.toThrowError(Error);
  });

  it("should not throw an error when called with an float-like string as the 'hours' param", () => {
    expect(() => addHours(new Date(), '2.515')).not.toThrowError(Error);
  });

  it("should throw an error when called with a NaN object as the 'hours' param", () => {
    expect(() => addHours(new Date(), 'number')).toThrowError(Error);
  });

  it('should return a proper date object, with the added hours', () => {
    const now = new Date();
    const later = new Date(now);
    later.setHours(now.getHours() + 5);
    expect(addHours(now, 5).getTime()).toBe(later.getTime());
  });

  it('should return a proper date object, with the subtracted hours', () => {
    const now = new Date();
    const later = new Date(now);
    later.setHours(now.getHours() - 5);
    expect(addHours(now, -5).getTime()).toBe(later.getTime());
  });
});

describe('addDays', () => {
  it('should be a function', () => {
    expect(typeof addDays).toBe('function');
  });

  it('should throw an error when called without any parameters', () => {
    expect(() => addDays()).toThrowError(Error);
  });

  it('should throw an error when called with a single parameter', () => {
    expect(() => addDays(new Date())).toThrowError(Error);
  });

  it("should not throw an error when called with an integer as the 'days' param", () => {
    expect(() => addDays(new Date(), 5)).not.toThrowError(Error);
  });

  it("should not throw an error when called with an string as the 'days' param", () => {
    expect(() => addDays(new Date(), '5')).not.toThrowError(Error);
  });

  it("should not throw an error when called with an float as the 'days' param", () => {
    expect(() => addDays(new Date(), 2.515)).not.toThrowError(Error);
  });

  it("should not throw an error when called with an float-like string as the 'days' param", () => {
    expect(() => addDays(new Date(), '2.515')).not.toThrowError(Error);
  });

  it("should throw an error when called with a NaN object as the 'days' param", () => {
    expect(() => addDays(new Date(), 'number')).toThrowError(Error);
  });

  it('should return a proper date object, with the added days', () => {
    const now = new Date();
    const later = new Date(now);
    later.setDate(now.getDate() + 5);
    expect(addDays(now, 5).getTime()).toBe(later.getTime());
  });

  it('should return a proper date object, with the subtracted days', () => {
    const now = new Date();
    const later = new Date(now);
    later.setDate(now.getDate() - 5);
    expect(addDays(now, -5).getTime()).toBe(later.getTime());
  });
});

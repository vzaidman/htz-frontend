import { routePattern, } from './server';

describe('routePattern', () => {
  test('matches the homepage path', () => {
    const url = '/';
    expect(routePattern.exec(url).slice()).toEqual([
      url,
      undefined,
      undefined,
      undefined,
    ]);
  });

  test('matches a contentId with no section', () => {
    const url = '/12.345';
    expect(routePattern.exec(url).slice()).toEqual([
      url,
      undefined,
      undefined,
      '12.345',
    ]);
  });

  test('matches a premium contentId with no section', () => {
    const url = '/.premium-12.345';
    expect(routePattern.exec(url).slice()).toEqual([
      url,
      undefined,
      '.premium-',
      '12.345',
    ]);
  });

  test('matches a contentId with a section one level deep', () => {
    const url = '/news/12.345';
    expect(routePattern.exec(url).slice()).toEqual([
      url,
      'news',
      undefined,
      '12.345',
    ]);
  });

  test('matches a premium contentId with a section one level deep', () => {
    const url = '/news/.premium-12.345';
    expect(routePattern.exec(url).slice()).toEqual([
      url,
      'news',
      '.premium-',
      '12.345',
    ]);
  });

  test('matches a contentId with a section multiple levels deep', () => {
    const url = '/news/world/asia/12.345';
    expect(routePattern.exec(url).slice()).toEqual([
      url,
      'news/world/asia',
      undefined,
      '12.345',
    ]);
  });

  test('matches a premium contentId with a section multiple levels deep', () => {
    const url = '/news/world/asia/.premium-12.345';
    expect(routePattern.exec(url).slice()).toEqual([
      url,
      'news/world/asia',
      '.premium-',
      '12.345',
    ]);
  });

  test('works with a section with a contentId-like name', () => {
    const url = '/12.345/67.890';
    expect(routePattern.exec(url).slice()).toEqual([
      url,
      '12.345',
      undefined,
      '67.890',
    ]);
  });

  test('works with premium content in a section with a contentId-like name', () => {
    const url = '/12.345/.premium-67.890';
    expect(routePattern.exec(url).slice()).toEqual([
      url,
      '12.345',
      '.premium-',
      '67.890',
    ]);
  });

  test('works with multiple sections with contentId-like names', () => {
    const url = '/1.23/4.56/7.89';
    expect(routePattern.exec(url).slice()).toEqual([
      url,
      '1.23/4.56',
      undefined,
      '7.89',
    ]);
  });
});

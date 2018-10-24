export const domainToSiteNumber = domain =>
  (domain.includes('themarker.com') ? '10'
    : domain.includes('haaretz.com') ? '85'
      : domain.includes('haaretz.co.il') ? '80'
        : '');

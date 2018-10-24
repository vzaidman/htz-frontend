<<<<<<< HEAD
const domainToSiteNumber = domain =>
=======
export const domainToSiteNumber = domain =>
>>>>>>> feat(login): wIP dockerify
  (domain.includes('themarker.com') ? '10'
    : domain.includes('haaretz.com') ? '85'
      : domain.includes('haaretz.co.il') ? '80'
        : '');
<<<<<<< HEAD

export { domainToSiteNumber, };
=======
>>>>>>> feat(login): wIP dockerify

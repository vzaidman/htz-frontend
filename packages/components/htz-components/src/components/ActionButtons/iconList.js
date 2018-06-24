/* global window */
import IconComment from '../Icon/icons/IconComment';
import IconFacebook from '../Icon/icons/IconFacebook';
import IconFacebookLogo from '../Icon/icons/IconFacebookLogo';
import IconGPlus from '../Icon/icons/IconGPlus';
import IconMail from '../Icon/icons/IconMail';
import IconMailAlert from '../Icon/icons/IconMailAlert';
import IconPrint from '../Icon/icons/IconPrint';
import IconTwitter from '../Icon/icons/IconTwitter';
import IconWhatsapp from '../Icon/icons/IconWhatsapp';
import IconZen from '../Icon/icons/IconZen';

const getIcon = (iconName, articleTitle, articleUrl, toggleZen) => {
  const icons = {
    comments: {
      component: IconComment,
      actionTag: 'href',
      action: '',
      bi: 111,
    },
    facebook: {
      component: IconFacebook,
      actionTag: 'href',
      action: '',
      bi: 10,
    },
    facebooklogo: {
      component: IconFacebookLogo,
      actionTag: 'href',
      action: `https://www.facebook.com/sharer/sharer.php?&u=${articleUrl}`,
      bi: 10,
    },
    googleplus: {
      component: IconGPlus,
      actionTag: 'href',
      action: '',
    },
    mail: {
      component: IconMail,
      actionTag: 'href',
      action: `mailto:?subject=${articleTitle}&body=${articleUrl}`,
      bi: 13,
    },
    mailalert: {
      component: IconMailAlert,
      actionTag: 'href',
      action: `mailto:?subject=${articleTitle}&body=${articleUrl}`,
      bi: 13,
    },
    print: {
      component: IconPrint,
      actionTag: 'href',
      action: `/misc/article-print-page/${articleUrl}`,
      bi: 112,
    },
    twitter: {
      component: IconTwitter,
      actionTag: 'href',
      action: '',
    },
    whatsapp: {
      component: IconWhatsapp,
      actionTag: 'onClick',
      action: () => {
        window.open(
          `https://web.whatsapp.com/send?text=${articleUrl}` + // eslint-disable-line prefer-template
            encodeURIComponent(
              '?utm_source=Web_Share&utm_medium=Whatsapp&utm_campaign=Share'
            ),
          'popup',
          'width=635,height=800,scrollbars=no,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no'
        );
        return false;
      },
      bi: 11,
    },
    zen: {
      component: IconZen,
      actionTag: 'onClick',
      action: toggleZen,
      bi: 92,
    },
  };
  return icons[iconName.toLowerCase()];
};

export default getIcon;

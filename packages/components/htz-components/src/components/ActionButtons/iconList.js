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

const getIcon = (iconName, articleTitle, articleUrl) => {
  const icons = {
    comments: {
      component: IconComment,
      actionTag: 'href',
      action: '',
    },
    facebook: {
      component: IconFacebook,
      actionTag: 'href',
      action: '',
    },
    facebooklogo: {
      component: IconFacebookLogo,
      actionTag: 'href',
      action: `https://www.facebook.com/sharer/sharer.php?&u=${articleUrl}`,
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
    },
    mailalert: {
      component: IconMailAlert,
      actionTag: 'href',
      action: `mailto:?subject=${articleTitle}&body=${articleUrl}`,
    },
    print: {
      component: IconPrint,
      actionTag: 'href',
      action: `/misc/article-print-page/${articleUrl}`,
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
    },
    zen: {
      component: IconZen,
      actionTag: 'href',
      action: '',
    },
  };
  return icons[iconName.toLowerCase()];
};

export default getIcon;

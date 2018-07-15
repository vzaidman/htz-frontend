/* eslint-disable import/no-named-as-default, import/no-unresolved */
/** *************************************** *
 *       C  O  M  P  O  N  E  N  T  S       *
 * **************************************** */

import A11yDialog from './components/A11yDialog/A11yDialog';
import A11yError from './components/A11yError/A11yError';
import ActionButtons from './components/ActionButtons/ActionButtons';
import AriaLive from './components/AriaLive/AriaLive';
import ArticleBody from './components/ArticleBody/ArticleBody';
import Button from './components/Button/Button';
import ButtonGroup from './components/Button/ButtonGroup';
import Caption from './components/Caption/Caption';
import CheckBox from './components/CheckBox/CheckBox';
import Comments from './components/CommentsSection/WrappedComments';
import Embed from './components/Embed/Embed';
import Footer from './components/Footer/Footer';
import Form from './components/Form/Form';
import GaDimensions from './components/GoogleAnalytics/GaDimensions';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics';
import Grid from './components/Grid/Grid';
import GridItem from './components/Grid/GridItem';
import H from './components/AutoLevels/H';
import HeadlineElement from './components/HeadlineElement/HeadlineElement';
import HtmlElement from './components/Interactive/components/HtmlElement';
import Image from './components/Image/Image';
import Interactive from './components/Interactive/Interactive';
import DeviceTypeInjector from './components/DeviceTypeInjector/DeviceTypeInjector';
import LayoutContainer from './components/PageLayout/LayoutContainer';
import LayoutRow from './components/PageLayout/LayoutRow';
import HtzLink from './components/HtzLink/HtzLink';
import LinksBlock from './components/RelatedArticles/LinksBlock';
import List from './components/List/List';
import Masthead from './components/Masthead/Masthead';
import Media from './components/Media/Media';
import MobileQuickRegistration from './components/MobileQuickRegistration/MobileQuickRegistration';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import Newsletter from './components/Newsletter/Newsletter';
import Outbrain from './components/Outbrain/Outbrain';
import Osaka from './components/Osaka/OsakaController';
import Portal from './components/Portal/Portal';
import Paragraph from './components/Paragraph/Paragraph';
import Quote from './components/Quote/Quote';
import RelatedArticles from './components/RelatedArticles/RelatedArticles';
import RadioButton from './components/RadioButton/RadioButton';
import RadioGroup from './components/RadioButton/RadioGroup';
import ArticlePageLayout from './components/PageLayout/ArticlePageLayout';
import Scroll from './components/Scroll/Scroll';
import ScrollListener from './components/EventListeners/ScrollListener';
import Section from './components/AutoLevels/Section';
import Select from './components/Select/Select';
import SeriesArticles from './components/RelatedArticles/SeriesArticles';
import Tags from './components/Tags/Tags';
import TextInput from './components/TextInput/TextInput';
import Video from './components/Video/Video';

// Icons
import IconAccessibility from './components/Icon/icons/IconAccessibility';
import IconAlef from './components/Icon/icons/IconAlef';
import IconAlefLogo from './components/Icon/icons/IconAlefLogo';
import IconAlefLogoTransparent from './components/Icon/icons/IconAlefLogoTransparent';
import IconAlert from './components/Icon/icons/IconAlert';
import IconAndroid from './components/Icon/icons/IconAndroid';
import IconApple from './components/Icon/icons/IconApple';
import IconAvatar from './components/Icon/icons/IconAvatar';
import IconBack from './components/Icon/icons/IconBack';
import IconBold from './components/Icon/icons/IconBold';
import IconBundle from './components/Icon/icons/IconBundle';
import IconCamera from './components/Icon/icons/IconCamera';
import IconCheck from './components/Icon/icons/IconCheck';
import IconClose from './components/Icon/icons/IconClose';
import IconComment from './components/Icon/icons/IconComment';
import IconCredit from './components/Icon/icons/IconCredit';
import IconDislike from './components/Icon/icons/IconDislike';
import IconFacebook from './components/Icon/icons/IconFacebook';
import IconFacebookLogo from './components/Icon/icons/IconFacebookLogo';
import IconGPlus from './components/Icon/icons/IconGPlus';
import IconHaaretzLogo from './components/Icon/icons/IconHaaretzLogo';
import IconHaaretzFullLogo from './components/Icon/icons/IconHaaretzFullLogo';
import IconHalfStar from './components/Icon/icons/IconHalfStar';
import IconHtzLoader from './components/Icon/icons/IconHtzLoader';
import IconInfo from './components/Icon/icons/IconInfo';
import IconItalic from './components/Icon/icons/IconItalic';
import IconLike from './components/Icon/icons/IconLike';
import IconLock from './components/Icon/icons/IconLock';
import IconMail from './components/Icon/icons/IconMail';
import IconMailAlert from './components/Icon/icons/IconMailAlert';
import IconMarkerLogo from './components/Icon/icons/IconMarkerLogo';
import IconMarkerLogoTransparent from './components/Icon/icons/IconMarkerLogoTransparent';
import IconMenu from './components/Icon/icons/IconMenu';
import IconMessenger from './components/Icon/icons/IconMessenger';
import IconPaypal from './components/Icon/icons/IconPaypal';
import IconPlus from './components/Icon/icons/IconPlus';
import IconPrint from './components/Icon/icons/IconPrint';
import IconQuote from './components/Icon/icons/IconQuote';
import IconReading from './components/Icon/icons/IconReading';
import IconRss from './components/Icon/icons/IconRss';
import IconSafePayment from './components/Icon/icons/IconSafePayment';
import IconSave from './components/Icon/icons/IconSave';
import IconSearch from './components/Icon/icons/IconSearch';
import IconSettings from './components/Icon/icons/IconSettings';
import IconStar from './components/Icon/icons/IconStar';
import IconTablet from './components/Icon/icons/IconTablet';
import IconTheMarker from './components/Icon/icons/IconTheMarker';
import IconTmLoader from './components/Icon/icons/IconTmLoader';
import IconTwitter from './components/Icon/icons/IconTwitter';
import IconWhatsapp from './components/Icon/icons/IconWhatsapp';
import IconZen from './components/Icon/icons/IconZen';
import IconZoomIn from './components/Icon/icons/IconZoomIn';
import IconZoomOut from './components/Icon/icons/IconZoomOut';

// User
import CheckEmailExists from './components/User/CheckEmailExists';
import Login from './components/User/Login';
import Logout from './components/User/Logout';
import Register from './components/User/Register';
import UserDispenser from './components/User/UserDispenser';
import UserInjector from './components/User/UserInjector';
import LoginExample from './components/User/LoginExample';
import RegisterExample from './components/User/RegisterExample';

// DFP
import DfpInjector from './components/Ads/DfpInjector';
import AdSlot from './components/Ads/AdSlot';

/** ************************************ *
 *       U  T  I  L  I  T  I  E  S       *
 * ************************************* */
import createApp from './createApp';
import createDocument from './createDocument';
import { appendScript, } from './utils/scriptTools';
import { stylesPropType, } from './propTypes/stylesPropType';
import extractParamFromUrl from './components/BI/extractParamFromUrl';

// BI
import BIAction from './components/BI/BIAction';
import BIRequest from './components/BI/BIRequest';

// Event tracker
import EventTracker from './utils/EventTracker';

export {
  A11yDialog,
  A11yError,
  ActionButtons,
  AriaLive,
  ArticleBody,
  Button,
  ButtonGroup,
  Caption,
  CheckBox,
  Comments,
  DeviceTypeInjector,
  Embed,
  Footer,
  Form,
  GaDimensions,
  GoogleAnalytics,
  Grid,
  GridItem,
  H,
  HeadlineElement,
  HtmlElement,
  Image,
  Interactive,
  LayoutContainer,
  LayoutRow,
  HtzLink,
  LinksBlock,
  List,
  Masthead,
  Media,
  MobileQuickRegistration,
  NavigationMenu,
  Outbrain,
  Osaka,
  Portal,
  Paragraph,
  Quote,
  RadioButton,
  RadioGroup,
  RelatedArticles,
  Scroll,
  ScrollListener,
  Section,
  Select,
  SeriesArticles,
  ArticlePageLayout,
  Tags,
  TextInput,
  Video,
  // Icons
  IconAccessibility,
  IconAlef,
  IconAlefLogo,
  IconAlefLogoTransparent,
  IconAlert,
  IconAndroid,
  IconApple,
  IconAvatar,
  IconBack,
  IconBold,
  IconBundle,
  IconCamera,
  IconCheck,
  IconClose,
  IconComment,
  IconCredit,
  IconDislike,
  IconFacebook,
  IconFacebookLogo,
  IconGPlus,
  IconHaaretzLogo,
  IconHaaretzFullLogo,
  IconHalfStar,
  IconHtzLoader,
  IconInfo,
  IconItalic,
  IconLike,
  IconLock,
  IconMail,
  IconMailAlert,
  IconMarkerLogo,
  IconMarkerLogoTransparent,
  IconMenu,
  IconMessenger,
  IconPaypal,
  IconPlus,
  IconPrint,
  IconQuote,
  IconReading,
  IconRss,
  IconSafePayment,
  IconSave,
  IconSearch,
  IconSettings,
  IconStar,
  IconTablet,
  IconTheMarker,
  IconTmLoader,
  IconTwitter,
  IconWhatsapp,
  IconZen,
  IconZoomIn,
  IconZoomOut,
  // User
  CheckEmailExists,
  Login,
  Logout,
  Newsletter,
  Register,
  UserDispenser,
  UserInjector,
  LoginExample,
  RegisterExample,
  DfpInjector,
  AdSlot,
  // Utils
  appendScript,
  createApp,
  createDocument,
  stylesPropType,
  extractParamFromUrl,
  // BI
  BIAction,
  BIRequest,
  // Event tracker
  EventTracker,
};

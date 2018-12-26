// @flow
/* eslint-disable import/no-named-as-default, import/no-unresolved */

/** *************************************** *
 *       C  O  M  P  O  N  E  N  T  S       *
 * **************************************** */

// Articles
import MagazineArticle from './components/ArticleTypes/MagazineArticle/MagazineArticle';
import LiveBlogArticle from './components/ArticleTypes/LiveBlogArticle/LiveBlogArticle';
import RecipeArticle from './components/ArticleTypes/RecipeArticle/RecipeArticle';
import ReviewArticle from './components/ArticleTypes/ReviewArticle/ReviewArticle';
import StandardArticle from './components/ArticleTypes/StandardArticle/StandardArticle';

// components
import A11yDialog from './components/A11yDialog/A11yDialog';
import A11yError from './components/A11yError/A11yError';
import AboveBlockLink from './components/BlockLink/AboveBlockLink';
import ActionButtons from './components/ActionButtons/ActionButtons';
import ApolloConsumer from './components/ApolloBoundary/ApolloConsumer';
import AriaDescription from './components/AriaDescription/AriaDescription';
import AriaLive from './components/AriaLive/AriaLive';
import ArticleBody from './components/ArticleBody/ArticleBody';
import BlockLink from './components/BlockLink/BlockLink';
import Button from './components/Button/Button';
import ButtonGroup from './components/Button/ButtonGroup';
import Caption from './components/Caption/Caption';
import Card from './components/Card/Card';
import CardContent from './components/CardContent/CardContent';
import CardFooter from './components/CardFooter/CardFooter';
import Carousel from './components/Carousel/Carousel';
import ChangeableElementGroup from './components/ChangeableElementGroup/ChangeableElementGroup';
import CheckBox from './components/CheckBox/CheckBox';
import Comments from './components/CommentsSection/CommentsInViewWrapper';
import Debug from './components/Debug/Debug';
import DeviceTypeInjector from './components/DeviceTypeInjector/DeviceTypeInjector';
import Embed from './components/Embed/Embed';
import Footer from './components/Footer/Footer';
import Form from './components/Form/Form';
import GaDimensions from './components/GoogleAnalytics/GaDimensions';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics';
import Grid from './components/Grid/Grid';
import GridItem from './components/Grid/GridItem';
import H from './components/AutoLevels/H';
import HeaderSlot from './components/PageLayout/slots/Header';
import HeadlineElement from './components/HeadlineElement/HeadlineElement';
import HtmlElement from './components/Interactive/components/HtmlElement';
import HtzLink from './components/HtzLink/HtzLink';
import Image from './components/Image/Image';
import ImageGallery from './components/ImageGallery/ImageGallery';
import InitPixel from './components/Scripts/InitPixel';
import Interactive from './components/Interactive/Interactive';
import LayoutContainer from './components/PageLayout/LayoutContainer';
import LayoutRow from './components/PageLayout/LayoutRow';
import LinksBlock from './components/RelatedArticles/LinksBlock';
import List from './components/List/List';
import Masthead from './components/Masthead/Masthead';
import Media from './components/Media/Media';
import MobileQuickRegistration from './components/MobileQuickRegistration/MobileQuickRegistration';
import Mutation from './components/ApolloBoundary/Mutation';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import Newsletter from './components/Newsletter/Newsletter';
import Osaka from './components/Osaka/OsakaController';
import Outbrain from './components/Outbrain/Outbrain';
import PageSchema from './components/PageSchema/PageSchema';
import Paragraph from './components/Paragraph/Paragraph';
import Portal from './components/Portal/Portal';
import PremiumContentMeta from './components/PremiumContentMeta/PremiumContentMeta';
import Query from './components/ApolloBoundary/Query';
import Quote from './components/Quote/Quote';
import RadioButton from './components/RadioButton/RadioButton';
import RadioGroup from './components/RadioButton/RadioGroup';
import RelatedArticles from './components/RelatedArticles/RelatedArticles';
import RouteChangeListener from './components/EventListeners/RouteChangeListener';
import Scroll from './components/Scroll/Scroll';
import ScrollListener from './components/EventListeners/ScrollListener';
import Section from './components/AutoLevels/Section';
import Select from './components/Select/Select';
import SeriesArticles from './components/RelatedArticles/SeriesArticles';
import Tags from './components/Tags/Tags';
import Teaser from './components/Teaser/Teaser';
import TeaserContent from './components/TeaserContent/TeaserContent';
import TeaserHeader from './components/TeaserHeader/TeaserHeader';
import TeaserMedia from './components/TeaserMedia/TeaserMedia';
import TeaserResponsiveText from './components/TeaserResponsiveText/TeaserResponsiveText';
import TeaserSubtitle from './components/TeaserSubtitle/TeaserSubtitle';
import TextInput from './components/TextInput/TextInput';
import TextLink from './components/TextLink/TextLink';
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
import IconBeerSheva from './components/Icon/icons/IconBeerSheva';
import IconBold from './components/Icon/icons/IconBold';
import IconBundle from './components/Icon/icons/IconBundle';
import IconCamera from './components/Icon/icons/IconCamera';
import IconCheck from './components/Icon/icons/IconCheck';
import IconClock from './components/Icon/icons/IconClock';
import IconClose from './components/Icon/icons/IconClose';
import IconComment from './components/Icon/icons/IconComment';
import IconCredit from './components/Icon/icons/IconCredit';
import IconDislike from './components/Icon/icons/IconDislike';
import IconDrive from './components/Icon/icons/IconDrive';
import IconFacebook from './components/Icon/icons/IconFacebook';
import IconFacebookLogo from './components/Icon/icons/IconFacebookLogo';
import IconGPlus from './components/Icon/icons/IconGPlus';
import IconGaniYoshua from './components/Icon/icons/IconGaniYoshua';
import IconHaaretzFullLogo from './components/Icon/icons/IconHaaretzFullLogo';
import IconHaaretzLogo from './components/Icon/icons/IconHaaretzLogo';
import IconHtzLoader from './components/Icon/icons/IconHtzLoader';
import IconInfo from './components/Icon/icons/IconInfo';
import IconItalic from './components/Icon/icons/IconItalic';
import IconJerusalem from './components/Icon/icons/IconJerusalem';
import IconLevels from './components/Icon/icons/IconLevels';
import IconLike from './components/Icon/icons/IconLike';
import IconLock from './components/Icon/icons/IconLock';
import IconMail from './components/Icon/icons/IconMail';
import IconMailAlert from './components/Icon/icons/IconMailAlert';
import IconMarkerLogo from './components/Icon/icons/IconMarkerLogo';
import IconMarkerLogoTransparent from './components/Icon/icons/IconMarkerLogoTransparent';
import IconMenu from './components/Icon/icons/IconMenu';
import IconMessenger from './components/Icon/icons/IconMessenger';
import IconPaypal from './components/Icon/icons/IconPaypal';
import IconPdf from './components/Icon/icons/IconPdf';
import IconPetachTikva from './components/Icon/icons/IconPetachTikva';
import IconPlus from './components/Icon/icons/IconPlus';
import IconPortions from './components/Icon/icons/IconPortions';
import IconPrint from './components/Icon/icons/IconPrint';
import IconQuote from './components/Icon/icons/IconQuote';
import IconRamatGan from './components/Icon/icons/IconRamatGan';
import IconReading from './components/Icon/icons/IconReading';
import IconRss from './components/Icon/icons/IconRss';
import IconSafePayment from './components/Icon/icons/IconSafePayment';
import IconSave from './components/Icon/icons/IconSave';
import IconSearch from './components/Icon/icons/IconSearch';
import IconSettings from './components/Icon/icons/IconSettings';
import IconStar from './components/IconStar/IconStar';
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

// DFP
import DfpInjector from './components/Ads/DfpInjector';
import GeneralAdSlot from './components/Ads/GeneralAdSlot';

/** ************************************ *
 *       U  T  I  L  I  T  I  E  S       *
 * ************************************* */
import { appendScript, } from './utils/scriptTools';
import createApp from './createApp';
import createDocument from './createDocument';
import extractParamFromUrl from './components/BI/extractParamFromUrl';
import setColor from './utils/setColor';
import { stylesPropType, } from './propTypes/stylesPropType';
import componentFromInputTemplate from './utils/componentFromInputTemplate';

// BI
import BIAction from './components/BI/BIAction';
import BIRequest from './components/BI/BIRequest';

// Event tracker
import EventTracker from './utils/EventTracker';
import pixelEvent from './utils/pixelEvent';

// temp for ssr lists because of this bug with nextjs: https://github.com/zeit/next.js/issues/5511

import ReadingHistoryProvider from './components/ReadingHistory/ReadingHistoryProvider';
import Bender from './components/List/views/Bender/Bender';
import Conrad from './components/List/views/Conrad/Conrad';
import Calculon from './components/List/views/Calculon/Calculon';
import Donatello from './components/List/views/Donatello/Donatello';
import Farnsworth from './components/List/views/Farnsworth/Farnsworth';
import Fry from './components/List/views/Fry/Fry';
import Gamal from './components/List/views/Gamal/Gamal';
import Hawking from './components/List/views/Hawking/Hawking';
import Leela from './components/List/views/Leela/Leela';
import Leonardo from './components/List/views/Leonardo/Leonardo';
import Michelangelo from './components/List/views/Michelangelo/Michelangelo';
import Mom from './components/List/views/Mom/Mom';
import Nibbler from './components/List/views/Nibbler/Nibbler';
import Panucci from './components/List/views/Panucci/Panucci';
import Pazuzu from './components/List/views/Pazuzu/Pazuzu';
// import Raphael from './components/List/views/Raphael/Raphael';
import Slim from './components/List/views/Slim/Slim';
import Slugs from './components/List/views/Slugs/Slugs';
import Vogel from './components/List/views/Vogel/Vogel';
import Wong from './components/List/views/Wong/Wong';
import Zapp from './components/List/views/Zapp/Zapp';
import Zoidberg from './components/List/views/Zoidberg/Zoidberg';
import Zombie from './components/List/views/Zombie/Zombie';

// FlowTypes
export type { ListDataType, } from './flowTypes/ListDataType';

export {
  // ArticleTypes
  MagazineArticle,
  LiveBlogArticle,
  RecipeArticle,
  ReviewArticle,
  StandardArticle,
  // Components
  A11yDialog,
  A11yError,
  AboveBlockLink,
  ActionButtons,
  ApolloConsumer,
  AriaDescription,
  AriaLive,
  ArticleBody,
  BlockLink,
  Button,
  ButtonGroup,
  Caption,
  Card,
  CardContent,
  CardFooter,
  Carousel,
  ChangeableElementGroup,
  CheckBox,
  Comments,
  Debug,
  DeviceTypeInjector,
  Embed,
  Footer,
  Form,
  GaDimensions,
  GoogleAnalytics,
  Grid,
  GridItem,
  H,
  HeaderSlot,
  HeadlineElement,
  HtmlElement,
  HtzLink,
  Image,
  ImageGallery,
  InitPixel,
  Interactive,
  LayoutContainer,
  LayoutRow,
  LinksBlock,
  List,
  Masthead,
  Media,
  MobileQuickRegistration,
  Mutation,
  NavigationMenu,
  Newsletter,
  Osaka,
  Outbrain,
  PageSchema,
  Paragraph,
  Portal,
  PremiumContentMeta,
  Query,
  Quote,
  RadioButton,
  RadioGroup,
  RelatedArticles,
  RouteChangeListener,
  Scroll,
  ScrollListener,
  Section,
  Select,
  SeriesArticles,
  Tags,
  Teaser,
  TeaserContent,
  TeaserHeader,
  TeaserMedia,
  TeaserResponsiveText,
  TeaserSubtitle,
  TextInput,
  TextLink,
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
  IconBeerSheva,
  IconBold,
  IconBundle,
  IconCamera,
  IconCheck,
  IconClock,
  IconClose,
  IconComment,
  IconCredit,
  IconDislike,
  IconDrive,
  IconFacebook,
  IconFacebookLogo,
  IconGPlus,
  IconGaniYoshua,
  IconHaaretzFullLogo,
  IconHaaretzLogo,
  IconHtzLoader,
  IconInfo,
  IconItalic,
  IconJerusalem,
  IconLevels,
  IconLike,
  IconLock,
  IconMail,
  IconMailAlert,
  IconMarkerLogo,
  IconMarkerLogoTransparent,
  IconMenu,
  IconMessenger,
  IconPaypal,
  IconPdf,
  IconPetachTikva,
  IconPlus,
  IconPortions,
  IconPrint,
  IconQuote,
  IconRamatGan,
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
  // DFP
  DfpInjector,
  GeneralAdSlot,
  // User
  CheckEmailExists,
  Login,
  Logout,
  Register,
  UserDispenser,
  UserInjector,
  // Utils
  appendScript,
  createApp,
  createDocument,
  extractParamFromUrl,
  componentFromInputTemplate,
  setColor,
  stylesPropType,
  // BI
  BIAction,
  BIRequest,
  // Event tracker
  EventTracker,
  pixelEvent,
  // temp for ssr lists because of this bug with nextjs: https://github.com/zeit/next.js/issues/5511
  ReadingHistoryProvider,
  Bender,
  Conrad,
  Calculon,
  Donatello,
  Farnsworth,
  Fry,
  Gamal,
  Hawking,
  Leela,
  Leonardo,
  Michelangelo,
  Mom,
  Nibbler,
  Panucci,
  Pazuzu,
  // Raphael,
  Slim,
  Slugs,
  Vogel,
  Wong,
  Zapp,
  Zoidberg,
  Zombie,
};

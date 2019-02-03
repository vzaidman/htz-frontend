// import React, { Fragment, } from 'react';
// import PropTypes from 'prop-types';
// import { FelaComponent, FelaTheme, } from 'react-fela';
// import ActionButtons from '../../ActionButtons/ActionButtons';

// MobileBarActionButtons.propTypes = {
//   elementUrl: PropTypes.string.isRequired,
//   isOpen: PropTypes.bool.isRequired,
// };
// export default function MobileBarActionButtons({ elementUrl, isOpen, }) {
//   const globalButtonStyles = {
//     borderRadius: '50%',
//     paddingTop: '1.5rem',
//     paddingBottom: '1.5rem',
//     paddingInlineStart: '1.5rem',
//     paddingInlineEnd: '1.5rem',
//     transitionProperty: 'all',
//     position: 'relative',
//     top: isOpen ? '0' : '45rem',
//     start: isOpen ? '0' : '9rem',
//   };

//   return (
//     <FelaTheme
//       render={theme => {
//         const transition = delay => ({
//           ...(delay ? theme.getDelay('transition', delay / 2) : {}),
//           ...theme.getDuration('transition', 1),
//           ...theme.getTimingFunction('transition', 'linear'),
//         });
//         return (
//           <Fragment>
//             <FelaComponent
//               style={{
//                 marginTop: '2rem',
//                 display: 'block',
//                 textAlign: 'center',
//                 color: theme.color('neutral', '-10'),
//                 fontWeight: '700',
//                 extend: [ theme.type(-1), ],
//               }}
//               render="span"
//             >
//               {theme.mobileAdditionalShare.text}
//             </FelaComponent>

//             <ActionButtons
//               miscStyles={{
//                 maxWidth: '23rem',
//                 marginInlineStart: 'auto',
//                 marginInlineEnd: 'auto',
//                 marginTop: '2rem',
//               }}
//               elementUrl={elementUrl}
//               size={4}
//               globalButtonsStyles={globalButtonStyles}
//               buttons={{
//                 start: {
//                   name: 'facebookround',
//                   iconStyles: {
//                     color: theme.color('facebook'),
//                   },
//                   buttonStyles: {
//                     ...transition(2),
//                   },
//                 },
//                 end: {
//                   name: 'twitter',
//                   buttonStyles: {
//                     ...transition(3),
//                   },
//                   iconStyles: {
//                     color: theme.color('twitter'),
//                   },
//                 },
//               }}
//             />
//             <ActionButtons
//               miscStyles={{
//                 maxWidth: '41rem',
//                 marginInlineStart: 'auto',
//                 marginInlineEnd: 'auto',
//                 marginTop: '9rem',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//               }}
//               elementUrl={elementUrl}
//               size={4}
//               globalButtonsStyles={globalButtonStyles}
//               buttons={[
//                 {
//                   name: 'whatsapp',
//                   buttonStyles: {
//                     ...transition(1),
//                   },
//                   iconStyles: {
//                     color: theme.color('whatsapp'),
//                   },
//                 },
//                 {
//                   name: 'save',
//                   buttonStyles: isArticleSaved => ({
//                     ...(isArticleSaved
//                       ? {
//                         color: theme.color('neutral', '-10'),
//                         backgroundColor: theme.color('secondary'),
//                       }
//                       : {}),
//                     ...transition(6),
//                   }),
//                 },
//                 {
//                   name: 'googleplus',
//                   buttonStyles: {
//                     ...transition(4),
//                   },
//                   iconStyles: {
//                     color: theme.color('gplus'),
//                   },
//                 },
//               ]}
//             />
//             <ActionButtons
//               miscStyles={{
//                 maxWidth: '23rem',
//                 marginInlineStart: 'auto',
//                 marginInlineEnd: 'auto',
//                 marginTop: '9rem',
//                 marginBottom: '4rem',
//               }}
//               elementUrl={elementUrl}
//               size={4}
//               globalButtonsStyles={globalButtonStyles}
//               buttons={{
//                 start: {
//                   name: 'messenger',
//                   buttonStyles: {
//                     ...transition(0),
//                   },
//                   iconStyles: {
//                     color: theme.color('facebook', 'messenger'),
//                   },
//                 },
//                 end: {
//                   name: 'mail',
//                   buttonStyles: {
//                     ...transition(5),
//                   },
//                   iconStyles: {
//                     color: theme.color('primary'),
//                   },
//                 },
//               }}
//             />
//           </Fragment>
//         );
//       }}
//     />
//   );
// }

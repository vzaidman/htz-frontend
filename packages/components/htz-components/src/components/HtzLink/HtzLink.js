import React from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';
// import { breakUrl, } from '@haaretz/app-utils';
// import isNextLink, {
//   isReactArticle,
//   getArticlePageTypeFromUrl,
// } from './isNextLink';
import { attrsPropType, } from '../../propTypes/attrsPropType';

const propTypes = {
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  /** Link's destination */
  href: PropTypes.oneOfType([ PropTypes.object, PropTypes.string, ]).isRequired,
  asPath: PropTypes.string,
  children: PropTypes.node,
  /**
   * Link's content (simple string or another component/element).
   * Overrides `children` when both are defined.
   */
  content: PropTypes.oneOfType([ PropTypes.node, PropTypes.string, ]),

  /** Basic HTML target (destination window) */
  target: PropTypes.string,
  /** Should prefetch */
  prefetch: PropTypes.bool,
  /**
   * A callback function to allow parent component to get ref of the link,
   * example use case: trigger a click.
   */
  refFunc: PropTypes.func,
  /** react-fela class names */
  className: PropTypes.string,
  /** Set the focus on this component */
  focus: PropTypes.bool,
  /** An onClick function */
  onClick: PropTypes.func,
  /** Force skip link type detection (still unstable) */
  forceNextLink: PropTypes.bool,
};

const defaultProps = {
  attrs: null,
  className: null,
  asPath: null,
  children: null,
  content: null,
  focus: false,
  prefetch: null,
  refFunc: null,
  target: null,
  onClick: null,
  forceNextLink: true,
};

/* eslint-disable react/prop-types */
// const LinkWrapper = React.forwardRef(
//   ({ attrs, children, className, href, onClick, passedOnClick, ref, }) => {
//     const wrappedOnclick = (...args) => {
//       if (passedOnClick) {
//         passedOnClick(...args);
//       }
//       // your own code here, this function can even be async

//       return onClick(...args);
//     };
//     /* eslint-disable jsx-a11y/no-static-element-interactions */
//     /* eslint-disable jsx-a11y/click-events-have-key-events */
//     return (
//       <a
//         href={href}
//         className={className}
//         onClick={wrappedOnclick}
//         ref={ref}
//         {...attrs}
//       >
//         {children}
//       </a>
//     );
//   }
// );

// If the href is an absolute path, instead we return only the path and not the whole href.
// const ensureRelativity = hrefObj => {
//   const { domain, path, } = breakUrl(hrefObj.pathname);
//   return domain ? { ...hrefObj, pathname: path, } : hrefObj;
// };

const HtzLink = React.forwardRef(
  (
    {
      attrs,
      children,
      className,
      content,
      focus,
      href,
      asPath,
      onClick: passedOnClick,
      prefetch,
      refFunc,
      target,
    },
    ref
  ) => {
    // eslint-disable-next-line eqeqeq
    const renderContent = content != undefined ? content : children;
    // eslint-disable-next-line eqeqeq
    // if (!target && isNextLink(href)) {
    //   /* eslint-disable no-unused-vars */
    //   let fullId;
    //   let premium;
    //   let prefix;
    //   let articleId;
    //   let params;
    //   let page;
    //   // TODO check this case
    //   const computedHref = ensureRelativity(
    //     typeof href === 'string' ? { pathname: href, } : href
    //   );
    //   // Enables client-side navigation for react-articles
    //   const computedPathname = isReactArticle(computedHref.pathname)
    //     ? `/${getArticlePageTypeFromUrl(computedHref.pathname)}`
    //     : computedHref.pathname;

    //   return (
    //     <Link
    //       prefetch={prefetch}
    //       passHref
    //       href={{
    //         pathname: computedPathname,
    //         query: { path: `${computedHref.pathname}`, },
    //       }}
    //       as={`${computedHref.pathname}`}
    //     >
    //       <LinkWrapper
    //         attrs={attrs}
    //         className={className}
    //         ref={linkRef => {
    //           focus && linkRef && linkRef.focus();
    //           refFunc && refFunc(linkRef);
    //         }}
    //         passedOnClick={passedOnClick}
    //       >
    //         {renderContent}
    //       </LinkWrapper>
    //     </Link>
    //   );
    // }
    return (
      <a
        {...attrs}
        href={href}
        {...(target ? { target, } : {})}
        className={className}
        ref={
          refFunc
            ? linkRef => {
                focus && linkRef && linkRef.focus();
                refFunc && refFunc(linkRef);
              }
            : ref
        }
        onClick={passedOnClick}
      >
        {renderContent}
      </a>
    );
  }
);

HtzLink.propTypes = propTypes;
HtzLink.defaultProps = defaultProps;

export default HtzLink;

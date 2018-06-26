import React from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, } from 'react-fela';
import M from 'react-media';

Media.propTypes = {
  /**
   * determines if media should be considered to
   * match when server rendering
   */
  matchOnServer: PropTypes.bool,
  // defaultMatches: PropTypes.bool.isRequired,
  /** An object describing the media query */
  query: PropTypes.shape({
    /**
     * When a `string`, a named breakpoint boundary
     * **from** which the query matches. `number`s
     * are considered as a value in pixels, and will
     * be converter to `em` units.
     *
     * Inclusive, as in, when the `m` breakpoint
     * is `600px`, `until: m` is `min-width: 600px`.
     */
    from: PropTypes.oneOfType([ PropTypes.number, PropTypes.string, ]),
    /**
     * When a `string`, a named breakpoint boundary
     * **until** which the query matches. `number`s
     * are considered as a value in pixels, and will
     * be converter to `em` units.
     *
     * Exclusive, as in, when the `m` breakpoint
     * is `600px`, `until: m` is `max-width: 599px`.
     */
    until: PropTypes.oneOfType([ PropTypes.number, PropTypes.string, ]),
    /**
     * Miscellaneous media feature queries.
     * Either a named breakpoint from the theme,
     * or a feature string, e.g., `(orientation: landscape)`.
     */
    misc: PropTypes.string,
    /** A media type, e.g., `only screen` , `print` , etc. */
    type: PropTypes.string,
  }).isRequired,
  /**
   * An argumentless callback called only if the
   * query matches. Can be used in the common case
   * of only needing to render something at a certain
   * condition, rather than toggle between two options
   * as with the `children` prop.
   *
   * @example
   * <Media
   *   query={{ from: 'm', }}
   *   render={() => <div>only renderes from `m` and up</div>}
   * />
   */
  render: PropTypes.func,
  /**
   * Children receives a callback taking a boolean,
   * which indicates if the query matches
   *
   * @param {boolean} matches
   * @return {Component|null}
   *   A react component to render, or null when nothing
   *   should be rendered
   *
   * @example
   * <Media query={{ from: 'm', }}>
   *   {
   *     matches => matches
   *       ? (<p>Yay, screen is larger than "m"</p>)
   *       : (<p>Misplaced hope... alas, screen is smaller than "s"</p>);
   *   }
   * </Media>
   */
  children: PropTypes.func,
  /**
   * The window object to evaluate the media query against.
   * This is useful when using `Portal` and the window the
   * component is being rendered to is different than the
   * one the code is running in, like an iframe or a popup
   * window.
   */
  targetWindow: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Media.defaultProps = {
  render: null,
  children: null,
  targetWindow: null,
  matchOnServer: false,
};

// eslint-disable-next-line react/prop-types
function MediaComponent({ query, matchOnServer, ...props }) {
  return (
    <FelaTheme
      render={theme => {
        const queryString = theme.getMqString(query, true);
        return (
          <M query={queryString} defaultMatches={matchOnServer} {...props} />
        );
      }}
    />
  );
}

export default function Media(props) {
  return <MediaComponent {...props} />;
}

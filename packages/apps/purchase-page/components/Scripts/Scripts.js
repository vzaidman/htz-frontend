import React from 'react';
// import PropTypes from 'prop-types';
import Head from 'next/head';

const propTypes = {};

const defaultProps = {};

class Scripts extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    // eslint-disable-next-line react/prop-types
    return (
      <div suppressHydrationWarning>
        {/* <!-- DFP Pixel for Marketing Campaign --> */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            const axel = Math.random() + '';
            const a = axel * 10000000000000;
            document.write('<img src="https://pubads.g.doubleclick.net/activity;dc_iu=/9401/DFPAudiencePixel;ord=' + a + ';dc_seg=398739298?" width=1 height=1 border=0/>');
          `,
          }}
        />
        <noscript
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              <img src="https://pubads.g.doubleclick.net/activity;dc_iu=/9401/DFPAudiencePixel;ord=1;dc_seg=398739298?" width=1 height=1 border=0/>
          `,
          }}
        />
        {/* <!-- end of DFP Pixel for Marketing Campaign --> */}

        {/* <!-- Crazyegg Tracking Script --> */}
        <script
          type="text/javascript"
          src="//script.crazyegg.com/pages/scripts/0011/5351.js"
          defer
        />
        {/* <!-- END of Crazyegg Tracking Script --> */}

        <Head>
          <script async src="https://static.hotjar.com/c/hotjar-872602.js?sv=6" />
        </Head>
      </div>
    );
  }
}

Scripts.propTypes = propTypes;
Scripts.defaultProps = defaultProps;

export default Scripts;

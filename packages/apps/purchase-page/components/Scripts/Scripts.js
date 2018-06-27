import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const propTypes = {
  thankYou: PropTypes.bool,
  userPaid: PropTypes.bool,
};

const defaultProps = {
  thankYou: false,
  userPaid: true,
  userType: null,
};
class StaticScripts extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { thankYou, userPaid, } = this.props;
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

        {thankYou ? (
          userPaid && (
            <div>
              {/* <!-- Facebook Pixel Code --> */}
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '1465233127023021');
                  fbq('track', 'Lead');
                `,
                }}
              />
              <noscript
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
                  <img height="1" width="1" style="display:none"
                    src="https://www.facebook.com/tr?id=1465233127023021&ev=Lead&noscript=1"
                  />
                `,
                }}
              />
              {/* <!-- End Facebook Pixel Code --> */}
            </div>
          )
        ) : (
          <div>
            {/* <!-- Facebook Pixel Code --> */}
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1465233127023021');
                fbq('track', 'PageView');
              `,
              }}
            />
            <noscript
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
                <img height="1" width="1" style="display:none"
                  src="https://www.facebook.com/tr?id=1465233127023021&ev=PageView&noscript=1"
                />
              `,
              }}
            />
            {/* <!-- End Facebook Pixel Code --> */}
          </div>
        )}

        <Head>
          <script
            async
            src="https://static.hotjar.com/c/hotjar-872602.js?sv=6"
          />
        </Head>
      </div>
    );
  }
}
function Scripts({ thankYou, userPaid, }) {
  return (
    // <!-- Google Analytics Script -->
    <div>
      <StaticScripts thankYou={thankYou} userPaid={userPaid} />
    </div>
  );
}

Scripts.propTypes = propTypes;
Scripts.defaultProps = defaultProps;

export default Scripts;

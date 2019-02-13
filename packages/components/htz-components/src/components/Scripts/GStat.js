/* global window localStorage fetch */
import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

function GstatFunc(user) {
  if (!user) return null;
  const paywallStatDomain = config.get('msServiceDomain');
  try {
    window.addEventListener('load', e => {
      const APP_NAME = '/ms-gstat-campaign';
      const GSTAT_SERVLET = '/json/getUserCampaign';
      let GstatCampaign = {};
      let lastModifiedDateTime;

      const ssoId = user.id || user.anonymousId;

      const d = new Date();
      const hh = d.getHours();
      const dd = d.getDate();
      const mm = d.getMonth();
      const yy = d.getFullYear();
      // schedule one request per a day begin on six o'clock
      const schedulerDate = new Date(yy, mm, dd, 6, 0, 0);
      const date = hh < 6 ? new Date(schedulerDate.getTime() - 1000 * 60 * 60 * 24) : schedulerDate;

      if (typeof ssoId !== 'undefined' && typeof Storage !== 'undefined') {
        if (localStorage.GstatCampaign) {
          GstatCampaign = JSON.parse(localStorage.GstatCampaign);
          lastModifiedDateTime = GstatCampaign.lastModifiedDateTime
            ? new Date(GstatCampaign.lastModifiedDateTime)
            : null;
        }

        if (!lastModifiedDateTime || lastModifiedDateTime < date) {
          const domain = /^[\w-]+(\.[\w.]+)/.exec(window.location.hostname);
          if (domain.length < 2) return;
          const url = `https://${paywallStatDomain
            + domain[1]
            + APP_NAME
            + GSTAT_SERVLET}?ssoId=${ssoId}`;

          fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', },
          })
            .then(response => response.json())
            .then(data => {
              localStorage.removeItem('GstatCampaign');
              localStorage.GstatCampaign = JSON.stringify({
                lastModifiedDateTime: date,
                CampaignNumber: data.campaignNumber,
              });
            })
            .catch(error => console.log('error from gstat script fetch: ', error));
        }
      }
    });
  }
  catch (e) {
    console.log(e);
  }
}
class GStat extends React.Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    const { user, } = this.props;
    GstatFunc(user);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

export default GStat;

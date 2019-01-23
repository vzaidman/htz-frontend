/* global window localStorage fetch */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import config from 'config';
import UserDispenser from '../User/UserDispenser';

function GstatFunc(user) {
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
      const date = schedulerDate.getTime();

      if (hh < 6) {
        date.setDate(schedulerDate.getDate() - 1);
      }
      if (typeof ssoId !== 'undefined' && typeof Storage !== 'undefined') {
        if (localStorage.GstatCampaign) {
          GstatCampaign = JSON.parse(localStorage.GstatCampaign);
          lastModifiedDateTime = GstatCampaign.lastModifiedDateTime;
        }

        if (!lastModifiedDateTime || lastModifiedDateTime < date) {
          const domain = /^[\w-]+(\.[\w.]+)/.exec(window.location.hostname);
          console.log('domain from gstat, !@!@!@ ', domain);
          if (domain.length < 2) return;
          const url = `https://${paywallStatDomain
            + domain[1]
            + APP_NAME
            + GSTAT_SERVLET}?ssoId=${ssoId}`;
          fetch(url)
            .then(response => response.json())
            .then(data => {
              GstatCampaign.lastModifiedDateTime = date;
              GstatCampaign.CampaignNumber = data.campaignNumber;
              localStorage.removeItem('GstatCampaign');
              localStorage.GstatCampaign = JSON.stringify({
                lastModifiedDateTime: GstatCampaign.lastModifiedDateTime,
                CampaignNumber: GstatCampaign.CampaignNumber,
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
class GStat extends Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    const { user, } = this.props;
    GstatFunc(user);
  }

  render() {
    return null;
  }
}

const WrappedGStat = () => <UserDispenser render={({ user, }) => <GStat user={user} />} />;
export default WrappedGStat;

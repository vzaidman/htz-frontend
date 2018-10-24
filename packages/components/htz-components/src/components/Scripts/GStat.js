/* eslint-disable */
import React, { Component } from 'react';
import { appendScript } from '../../utils/scriptTools';

class GStat extends Component {
  componentDidMount() {
    appendScript({
      id: 'GStat',
      innerHtml: this.getInnerHtml(),
      attributes: { type: 'text/javascript', 'data-cfasync': 'false' },
    });
  }

  getInnerHtml = () => `
   
(function() {
  try{
     window.addEventListener('load', function getGstatCampaignNumber(e) {
        var APP_NAME =       "/ms-gstat-campaign";
        var GSTAT_SERVLET =       "/getUserCampaign";
        var GstatCampaign = {};
        var lastModifiedDateTime;

           var ssoId = CookieUtil.getCookie('anonymousId'); // Default value for sso is equal to anonymousId
           if (typeof UserUtil.getLoginInfo()!= "undefined" && UserUtil.getLoginInfo().id!= null){
               var ssoId =   UserUtil.getLoginInfo().id;
           }



        var d = new Date();
        var hh = d.getHours();
        var dd = d.getDate();
        var mm = d.getMonth();
        var yy = d.getFullYear();
        var schedulerDate = new Date(yy, mm, dd, 06, 00, 00);    //schedule one request per a day begin on six o'clock
        var date = schedulerDate.getTime();

        if (hh < 6){
          date = schedulerDate.setDate(schedulerDate.getDate() - 1).getTime();
        }

        if( (typeof ssoId!= "undefined")  && (typeof(Storage) !== "undefined")){
          if (!!localStorage.GstatCampaign){
             GstatCampaign = JSON.parse(localStorage.GstatCampaign);
             lastModifiedDateTime = GstatCampaign.lastModifiedDateTime;
          }

               var domain = /^[\w-]+(\.[\w\.]+)/.exec(window.location.hostname);
               if (domain.length < 2) return;
               var callback = loginInfo.userType !== "paying" ? "&callback=PaywallLogger.showSubscriptionReminder" : null;
               url = paywallStatDomain + domain[1] + APP_NAME + LOG_SERVLET + "?userId=" + loginInfo.id + "&articleId=" + articleId + callback;
          if (!lastModifiedDateTime || lastModifiedDateTime < date ){
                 var url = paywallStatDomain + domain[1] + APP_NAME + GSTAT_SERVLET + "?ssoId="+ssoId;
                $.ajax({
                   url         : url,
                   cache       : false,
                   dataType    : 'script',
                   success : function(data){
                      GstatCampaign.lastModifiedDateTime = date;
                      GstatCampaign.CampaignNumber = CampaignNumber;
                      localStorage.removeItem('GstatCampaign');
                      localStorage.GstatCampaign = JSON.stringify({"lastModifiedDateTime":GstatCampaign.lastModifiedDateTime, "CampaignNumber":GstatCampaign.CampaignNumber });
                    },
                   timeout     : 8000 // time out
                });
          }

        }
     });
  }catch(e) {
      console.log(e); 
  }    
})();

    `;

  render() {
    return null;
  }
}

export default GStat;

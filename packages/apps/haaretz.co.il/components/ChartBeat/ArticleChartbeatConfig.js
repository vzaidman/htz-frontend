import React from 'react';

export default (section, author) => (
  <React.Fragment>
    <script
      type="text/javascript"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
            var _sf_async_config = _sf_async_config || {};
            /** ChartBeat CONFIGURATION START **/
            _sf_async_config.uid = 5952;
            _sf_async_config.domain = "haaretz.co.il";
            var _sf_startpt = (new Date()).getTime();
            /** ChartBeat CONFIGURATION END **/
        `,
      }}
    />
    <script async src="//static.chartbeat.com/js/chartbeat.js" />
    <script
      type="text/javascript"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
            var _sf_async_config={uid:5952,domain:"haaretz.co.il"};
            (function(){
              function loadChartbeat() {
                window._sf_endpt=(new Date()).getTime();
                var e = document.createElement('script');
                e.setAttribute('language', 'javascript');
                e.setAttribute('type', 'text/javascript');
                e.setAttribute('src',(("https:" == document.location.protocol) ? "https://s3.amazonaws.com/" : "http://") +
                "static.chartbeat.com/js/chartbeat.js");
                document.body.appendChild(e);
                _sf_async_config.sections = '${section}';
                _sf_async_config.authors = '${author}';
              }
              var oldonload = window.onload;
              window.onload = (typeof window.onload != 'function') ?
              loadChartbeat : function() { oldonload(); loadChartbeat(); };
            })();
        `,
      }}
    />
    <script
      type="text/javascript"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
            var _sf_async_config = _sf_async_config || {};
            /** CONFIGURATION START **/
            _sf_async_config.sections = '${section}'; //THIS CHANGED
            _sf_async_config.authors = '${author}'; //THIS CHANGED
            /** CONFIGURATION END **/
            (function() {
              function loadChartbeat() {
                var e = document.createElement('script');
                e.setAttribute('language', 'javascript');
                e.setAttribute('type', 'text/javascript');
                e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js');
                document.body.appendChild(e);
              }
                var oldonload = window.onload;
                window.onload = (typeof window.onload != 'function') ?
                loadChartbeat : function() {
                oldonload();
                loadChartbeat();
              };
              })();
        `,
      }}
    />
    {/* <script async src="//static.chartbeat.com/js/chartbeat_mab.js" /> */}
  </React.Fragment>
);

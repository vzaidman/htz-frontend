import React, { Component, } from 'react';
// import PropTypes from 'prop-types';
import Head from 'next/head';

class Permutive extends Component {
  shouldComponentUpdate() {
    return false;
  }

  permutive = () => {
    const PROJECT_ID = 'fe68d1f7-c9f4-45b3-8905-7cda73d3fd74';
    const PUBLIC_API_KEY = 'efd364e0-59cb-4b1c-98ac-37848277a8a4';

    return (
      <React.Fragment>
        <script async src="https://cdn.permutive.com/fe68d1f7-c9f4-45b3-8905-7cda73d3fd74-web.js" />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `  
            ! function(n, e, o, r, i) {
                if (!e) {
                    e = e || {}, window.permutive = e, e.q = [], e.config = i || {}, e.config.projectId = o, e.config.apiKey = r, e.config.environment = e.config.environment || "production";
                    for (var t = ["addon", "identify", "track", "trigger", "query", "segment", "segments", "ready", "on", "once", "user", "consent"], c = 0; c < t.length; c++) {
                        var f = t[c];
                        e[f] = function(n) {
                            return function() {
                                var o = Array.prototype.slice.call(arguments, 0);
                                e.q.push({
                                    functionName: n,
                                    arguments: o
                                })
                            }
                        }(f)
                    }
                }
            }(document, window.permutive, "${PROJECT_ID}", "${PUBLIC_API_KEY}", {});
                window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [], window.googletag.cmd.push(function() {
                    if (0 === window.googletag.pubads().getTargeting("permutive").length) {
                        var g = window.localStorage.getItem("_pdfps");
                        window.googletag.pubads().setTargeting("permutive", g ? JSON.parse(g) : [])
                    }
                });
            window.addEventListener("DOMContentLoaded", function() {
            permutive.addon("web", {})
            });
            `,
          }}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Head>{this.permutive()}</Head>
    );
  }
}

export default Permutive;

// @flow
import React from 'react';
import gql from 'graphql-tag';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import Query from '../ApolloBoundary/Query';

const UserAgentQuery: DocumentNode = gql`
  query GetUserAgent {
    userAgent @client {
      os
      version
      platform
      isMobile
      isDesktop
      isTablet
    }
  }
`;

type Props = {
  children: Object => Node,
  rules: Object,
}

function checkRuleCondition(
  condition: {
    os?: string,
    fromVer?: number | string,
    untilVer?: number | string,
    platform?: string,
  },
  agent: {
    os: string,
    version: string,
    platform: string,
    isMobile: boolean,
    isDesktop: boolean,
    isTablet: boolean,
  }
): boolean {
  const { os, platform, version, } = agent;
  const { fromVer, untilVer, } = condition;

  // console.log(`
  //   CHECK USER AGENT !!
  //   ${global.window ? `At: ${global.window.location.href}` : ''}
  //   --------------------
  //   Got from server:
  //   OS: ${os}
  //   Platform: ${platform}
  //   Version: ${version}
  // `);

  if (condition.os) {
    if (os !== condition.os) return false;
    if (!fromVer && !untilVer && !condition.platform) return true;
  }

  if (condition.platform) {
    if (platform !== condition.platform) return false;
    if (!fromVer && !untilVer) return true;
  }

  if (!fromVer && !untilVer) return false;

  if (fromVer && Number(fromVer) > Number(version)) return false;
  if (untilVer && Number(untilVer) <= Number(version)) return false;
  if (fromVer && untilVer
    && Number(fromVer) >= Number(version) && Number(untilVer) < Number(version)) return true;
  if (fromVer && Number(fromVer) <= Number(version)) return true;
  if (untilVer && Number(untilVer) > Number(version)) return true;

  return false;
}

/**
 * This components gets an object of rules, and return to it's children
 * an object of results according to the userAgent saved in the store.
 * e.g:
 *
 * rules = {
 *   isOs: { os: 'OS X', },
 *   isIPad: { platform: 'iPad', },
 *   isIPhone: { platform: 'iPhone', },
 *   isOsFrom8: { os: 'OS X', fromVer: 8, },
 *   isOsUntil12: { os: 'OS X', untilVer: 12, },
 *   isOsFrom9Until11iPad: { os: 'OS X', fromVer: 9, untilVer: 11, platform: 'iPad', },
 *   isOsFrom9Until11iPhone: { os: 'OS X', fromVer: 9, untilVer: 11, platform: 'iPhone', },
 * }
 *
 * userAgent:  {
 *    os: 'OS X',
 *    version: '10.0',
 *    platform: 'iPad',
 * }
 *
 * results: {
 *   isOs: true,
 *   isIPad: true,
 *   isIPhone: false,
 *   isOsFrom8: true,
 *   isOsUntil12: true,
 *   isOsFrom9Until11iPad: true,
 *   isOsFrom9Until11iPhone: false,
 * }
 */

function UserAgent({ rules, children, }: Props): Node {
  const results = {};
  Object.keys(rules).forEach(ruleName => { results[ruleName] = false; });
  return (
    <Query query={UserAgentQuery}>
      {({ loading, error, data, }) => {
        if (loading || error) {
          return children(results);
        }
        const { userAgent, } = data;
        Object.keys(rules).forEach(ruleName => {
          results[ruleName] = checkRuleCondition(rules[ruleName], userAgent);
        });
        return children(results);
      }}
    </Query>
  );
}

export default UserAgent;

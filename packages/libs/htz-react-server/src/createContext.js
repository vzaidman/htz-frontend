/* global fetch */
import DataLoader from 'dataloader';
import querystring from 'querystring';
import config from 'config';

const host = (config.has('hostname') && config.get('hostname')) || 'www';

export function createLoaders() {
  // TODO: By default, `DataLoader` just caches the results forever,
  // but we should eventually expunge them from the cache.
  const pageLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(path =>
        fetch(`http://${host}.haaretz.co.il/papi${path}`).then(response =>
          response.json()
        )
      )
    )
  );
  const cmlinkLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(path =>
        fetch(
          `http://${host}.haaretz.co.il/papi/cmlink/${path}?vm=whtzResponsive&exploded=true`
        ).then(response => response.json())
      )
    )
  );
  return { pageLoader, cmlinkLoader, };
}

export function createPosters(cookies) {
  const cmlinkCommentPoster = newComment =>
    fetch(
      `http://${host}.haaretz.co.il/cmlink/${newComment.commentElementId}`,
      {
        method: 'post',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: querystring.stringify({
          commentsId: newComment.commentElementId,
          comment_author: newComment.commentAuthor,
          comment_title: newComment.commentTitle,
          comment_text: newComment.commentText,
          articleId: newComment.articleId,
          parentCommentId: newComment.parentCommentId,
          formId: 'comments-form',
          action: 'CREATE_COMMENT',
          ajax: true,
        }),
      }
    )
      .then(response => response.json())
      .then(data => data);

  const cmlinkCommentAbuseReport = newAbuseReport =>
    fetch(
      `http://${host}.haaretz.co.il/cmlink/${newAbuseReport.commentElementId}`,
      {
        method: 'post',
        credentials: 'include',
        headers: {
          Accept: 'application/json, text/javascript, */*; q=0.01',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          origin: `http://${host}.haaretz.co.il`,
        },
        body: querystring.stringify({
          commentId: newAbuseReport.commentId,
          action: 'REPORT_COMMENT_ABUSE',
          invisible: true,
          'g-recaptcha-response': newAbuseReport.captchaKey,
          ajax: true,
        }),
      }
    )
      .then(response => response.status)
      .then(data => data);

  const loggerVotePoster = newVote =>
    fetch(
      // Todo: Change Mador (2.285) from hardcoded to dynamic
      `http://${host}.haaretz.co.il/logger/p.gif?type=COMMENTS_RATINGS&a=%2F2.285%2F${
        newVote.articleId
      }&comment=${newVote.commentId}&group=${
        newVote.group
      }&_=${new Date().getTime()}`,
      {
        method: 'get',
        credentials: 'include',
        headers: {
          Accept: '*/*',
        },
      }
    )
      .then(response => response.status)
      .then(data => data);

  const notificationSignUpPoster = newSignUpData =>
    fetch(`http://${host}.haaretz.co.il/comments/acceptreject`, {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: querystring.stringify({
        userEmail: newSignUpData.userEmail,
        c: newSignUpData.commentId,
        h: newSignUpData.hash,
        a: '2',
        // todo: cheack what needs to be here allowMarketing true /false ?
        m: '',
        // todo: check what needs to be here paying/anonymous check from cookie?
        ut: 'anonymous',
      }),
    })
      .then(response => response.status)
      .then(data => data);

  return {
    cmlinkCommentPoster,
    cmlinkCommentAbuseReport,
    loggerVotePoster,
    notificationSignUpPoster,
  };
}

export default function createContext(cookies) {
  const loaders = createLoaders();
  const posters = createPosters(cookies);
  return {
    cookies,
    ...loaders,
    ...posters,
  };
}

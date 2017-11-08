import DataLoader from 'dataloader';
import querystring from 'querystring';
// eslint-disable-next-line import/no-extraneous-dependencies
import config from 'config';

const Host = (config.has('HostName') && config.get('HostName')) || 'www';

export function createLoaders() {
  // By default, `DataLoader` just caches the results forever, but we should
  // TODO: eventually expunge them from the cache.
  const pageLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(path =>
        fetch(`http://${Host}.haaretz.co.il/papi${path}`).then(response => response.json())
      )
    )
  );
  const cmlinkLoader = new DataLoader(keys =>
    Promise.all(
      keys.map(contentId =>
        fetch(
          `http://${Host}.haaretz.co.il/json/cmlink/${contentId}?composite=true`
        ).then(response => response.json())
      )
    )
  );
  return { pageLoader, cmlinkLoader, };
}

export function createPosters(cookies) {
  const cmlinkCommentPoster = newComment => {
    return fetch(`http://${Host}.haaretz.co.il/cmlink/${newComment.commentElementId}`, {
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
    })
      .then(response => response.json())
      .then(data => data);
  };

  return { cmlinkCommentPoster, };
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

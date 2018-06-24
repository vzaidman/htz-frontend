export function extractAuthorsFromArticle(article) {
  const ArticleAuthors = article.reduce(
    (authors, articleItem) =>
      // pluck the authors object
      (articleItem.inputTemplate === 'com.htz.ArticleHeaderElement'
        ? [
          ...authors,
          // extract the author names
          ...articleItem.data.authors.map(
            authorData => authorData.contentName || authorData.name
          ),
        ]
        : authors),
    []
  );

  return `[${ArticleAuthors}]`;
}

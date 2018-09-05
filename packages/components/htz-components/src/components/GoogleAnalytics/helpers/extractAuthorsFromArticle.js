export function extractAuthorsFromArticle(article) {
  const authors = article.reduce((result, slot) => {
    if (slot.authors) {
      result.push(slot.authors.map(author => author.name || author.contentName).join());
    }
    return result;
  }, []);
  return authors.join();
}

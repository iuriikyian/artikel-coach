// Articles a set uses. Sets saved before articles were stored derive them from their words.
export function articlesOf(set) {
  return set.articles ?? [...new Set(set.words.map((w) => w.article))];
}

// Color class for an article, by its position in the set's article list.
export function articleColor(articles, article) {
  const index = articles.indexOf(article);
  return index < 0 ? '' : `c${index % 4}`;
}

const inputTemplates = new Map([
  [ 'HtzStandardArticle', 'com.htz.StandardArticle', ],
  [ 'TmStandardArticle', 'com.tm.StandardArticle', ],
  [ 'ChangeableElementGroup', 'com.tm.element.group', ],
]);

export default name => inputTemplates.get(name);

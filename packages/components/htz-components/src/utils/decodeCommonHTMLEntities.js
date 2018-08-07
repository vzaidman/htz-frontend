export default function decodeHTMLEntities(text) {
  let decodedText = text;
  const entities = [
    [ 'amp', '&', ],
    [ 'apos', "'", ],
    [ '#x27', "'", ],
    [ '#x2F', '/', ],
    [ '#39', "'", ],
    [ '#47', '/', ],
    [ 'lt', '<', ],
    [ 'gt', '>', ],
    [ 'nbsp', ' ', ],
    [ 'quot', '"', ],
    [ 'hellip', '...', ],
  ];

  entities.forEach(entity => {
    decodedText = decodedText.replace(
      new RegExp(`&${entity[0]};`, 'g'),
      entity[1]
    );
  });
  return decodedText;
}

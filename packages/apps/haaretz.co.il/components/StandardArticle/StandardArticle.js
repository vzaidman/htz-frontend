import React from 'react';

export default function StandardArticle(props) {
  return (
    <article>
      <h1>
        {props.title}
      </h1>
      <h2>
        {props.subtitle}
      </h2>
      {props.body.map(
        (graf, i) =>
          (typeof graf === 'string'
            ? <div dangerouslySetInnerHTML={{ __html: graf, }} key={i} />
            : <div key={i}>(image)</div>)
      )}
    </article>
  );
}

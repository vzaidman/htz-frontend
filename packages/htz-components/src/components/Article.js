import React from 'react'

export default ({ title, author }) => {
  return (
    <main>
      <article>
        <h1>{title}</h1>
        <p>{author}</p>
      </article>
    </main>
  )
}

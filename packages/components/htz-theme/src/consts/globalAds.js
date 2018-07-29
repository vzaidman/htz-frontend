const styles = `
.ad--d {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-align: center;
}
.h-tar {
  text-align: right;
}
.ad--d,
.h-mb {
  margin-bottom: 24px;
  margin-bottom: 1.5rem;
}
.t-heavy {
  font-weight: 700;
}
.t-txt-link {
  color: #0895c3;
}
.t-txt-link:hover, .t-txt-link:focus, .t-txt-link:active {
  border-bottom: 1px solid;
  padding-bottom: .06em;
}
`
  .replace(/\n/g, '')
  .replace(/\s\s+/g, ' '); // minifies the css above

export default styles;

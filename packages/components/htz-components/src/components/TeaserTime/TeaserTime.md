Renders date/time for teasers according to the the following logic:
* `lastUpdate` will be rendered if it exists, otherwise `publishDate` will be used.
* If in the range of the last 24 hours -> show only time (HH:mm)
* Otherwise (not in the last 24 hours) -> show only date (DD.MM.YYYY)

**without lastUpdate:**
```jsx
  <code>shows date (of publishDate)</code> <TeaserTime publishDate={new Date('2012-01-09 15:01')} />
```

**lastUpdate is in the range of the last 24 hours:** (before an hour)
```jsx
  <code>shows time (of lastUpdate)</code> <TeaserTime publishDate={new Date('2012-01-09 15:01')} lastUpdate={new Date(Date.now() - 1000*60*60*1)} />
```

**lastUpdate isn't in the range of the last 24 hours:** (before 25 hours)
```jsx
  <code>shows date (of lastUpdate)</code> <TeaserTime publishDate={new Date('2012-01-09 15:01')} lastUpdate={new Date(Date.now() - 1000*60*60*25)} />
```

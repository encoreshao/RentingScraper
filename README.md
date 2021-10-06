# Renting Scraper

### Core code for scrape

- src/sraper.ts     (scrape single room page data)
- src/discover.ts   (scrape all rooms from list)

### Build typescript to javascript

```
yarn build
```

### Command to scrape all rooms from list page, and write the results into tmp/rooms.csv

```
yarn discover https://sh.zu.anjuke.com/fangyuan/pudong-q-jinqiao/fx2-l2-x1-zj107/
```
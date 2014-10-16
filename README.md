# hubot-google-places

A Hubot script that search google places

## Installation

    $ npm install git://github.com/bouzuya/hubot-google-places.git

or

    $ # TAG is the package version you need.
    $ npm install 'git://github.com/bouzuya/hubot-google-places.git#TAG'

## Example

    bouzuya> hubot help google-places
      hubot> hubot google-places <keyword> - search google places

    bouzuya> hubot google-places ヒマラヤンジャバ
      hubot> google-places!
      Hubot> ヒマラヤンジャバ 34.694549,135.200855
             -----
             名前: ヒマラヤンジャバ
             住所: 兵庫県神戸市中央区御幸通3-2-4 1F
             電話番号: 078-231-2037
             URL: https://plus.google.com/115422011079349011759/about?hl=ja

## Configuration

See [`src/scripts/google-places.coffee`](src/scripts/google-places.coffee).

## Development

`npm run`

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][mail]&gt; ([http://bouzuya.net][url])

## Badges

[![Build Status][travis-badge]][travis]
[![Dependencies status][david-dm-badge]][david-dm]
[![Coverage Status][coveralls-badge]][coveralls]

[travis]: https://travis-ci.org/bouzuya/hubot-google-places
[travis-badge]: https://travis-ci.org/bouzuya/hubot-google-places.svg?branch=master
[david-dm]: https://david-dm.org/bouzuya/hubot-google-places
[david-dm-badge]: https://david-dm.org/bouzuya/hubot-google-places.png
[coveralls]: https://coveralls.io/r/bouzuya/hubot-google-places
[coveralls-badge]: https://img.shields.io/coveralls/bouzuya/hubot-google-places.svg
[user]: https://github.com/bouzuya
[mail]: mailto:m@bouzuya.net
[url]: http://bouzuya.net

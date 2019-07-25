# News

An app that shows the latest news compiled frm multiple sources. Powered by https://newsapi.org/

Build using React Native

## Screenshots

![home](./screenshots/ios_home.png?raw=true 'home')
![search](./screenshots/android_search.png?raw=true 'search')
![articles](./screenshots/ios_ati.png?raw=true 'articles')

## Features

- :white_check_mark: Beautiful minimal UI
- :white_check_mark: Search articles
- :white_check_mark: Brief overview of the article
- :white_check_mark: Selectable country source
- :white_check_mark: State fully managed with Redux
- :white_check_mark: Api calls handled with Redux-sage middleware

## Getting Started

### Prerequisites

Setup react native using the official documentation. [facebook.github.io](https://facebook.github.io/react-native/docs/getting-started)

### Installing

1.  clone the repository
2.  run `npm install` in the repository directory

### API key

1. get an api key from https://newsapi.org/docs/get-started
2. create a file called `key.js` in `/src/api`
3. export the key as `NEWS_API_KEY`
   eg: `export const NEWS_API_KEY = 'YOUR_KEY_HERE';`

### Build and Run

`react-native run-ios`

or

`react-native run-android`

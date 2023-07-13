# Most Important Resource

1. [Next.js 13 Full Course 2023 | Build and Deploy a Full Stack App Using the Official React Framework](<[https://](https://youtu.be/wm5gMKuwSYk)>)
2. [nextjs.org](<[https://](https://nextjs.org/)>)
3. [When to use Server and Client Components?](<[https://](https://nextjs.org/docs/getting-started/react-essentials#when-to-use-server-and-client-components)>)
4. [Next Auth Documentation](<[https://](https://next-auth.js.org/getting-started/example)>)
5. [Next auth generate NEXTAUTH_SECRET for local](<[https://](https://www.cryptool.org/en/cto/openssl)>)
6. [apiauthcallbackprovider](<[https://](https://next-auth.js.org/getting-started/rest-api#getpost-apiauthcallbackprovider)>), [1:43:55](<[https://](https://youtu.be/wm5gMKuwSYk?t=6235)>)

## checkpoint

[02:14:41](<[https://](https://youtu.be/wm5gMKuwSYk?t=8081)>)

## Steps

1. Install (see in readme.md for setup installation)
2. install bcrypt, mongodb, mongoose, next-auth `npm install bcrypt mongodb mongoose next-auth`
3. Delete app folder and recreate it (we're going to start from scratch)
4. Create component folder (for our reusable components)
5. Create models (is going to be for mongodb mongoose database models)
6. Delete public folder and recreate it (we're going to start from scratch)
7. Create styles folder
8. Create utils folder (for utility functions)
9. Create .env files which we can store secure keys

## Create Home Heading text

## Components: part 1

- Feed.jsx
- Form.jsx
- Nav.jsx
- Profile.jsx
- PromptCard.jsx
- Provider.jsx

## Desktop navigation

## Sign In and Sign Out button setup

## Mobile Navigation

## Setup Auth Providers (FE)

## Setup google cloud for Authentication

1. go to [google console](<[https://](https://console.cloud.google.com/)>)
2. Create New Project
3. Select Project
4. Open Navigation Menu -> API & Services -> OAuth consent screen
5. create
6. fill app name & email
7. add authorized domain -> `http://localhost:3000` -> currently is not supported maybe
8. create
9. go to credentials -> create credentials -> OAuth client ID
10. Application type -> web application
11. Authorised JavaScript origins -> add 1 : `http://localhost:3000`
12. Authorised redirect URIs -> add 1 : `http://localhost:3000`
13. Create
14. Got client id & client secret

## Setup MongoDB atlas for database

1. go to console mongodb atlas
2. create cluster
3. go to database access -> edit 1 -> password authentication
4. Copy password access
5. go to network access -> add current ip address
6. add ip address anywhere
7. go to database -> connect -> drivers -> copy mongoDB URI
8. add to .env

## Setup code to connect google console & mongodb

1. app\api\auth\[...nextauth]\route.js
2. utils\database.js
3. .env
4. models\user.js

## .env configuration for local (not production)

```javascript
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=<random string>
```

Next auth secret : read secret part in option at [secret sectiion](<[https://](https://next-auth.js.org/configuration/options#secret)>).

later on in production we'll be able to change those and make authentication works

## Setup code for authentication process

## Feature: Create Prompt

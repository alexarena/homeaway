## About

`node-homeaway` is an unofficial HomeAway API client for Node. It is in no way affiliated with either HomeAway, Inc. or Expedia, Inc.

It is very much a work-in-progress and API methods are being added on an as-needed basis.

## Getting Started

1. Get access to the [HomeAway API](https://www.homeaway.com/platform/lead-form). They ask you a few questions about what you want to build, but I was given access immediately after filling out the form.
2. Create a [client](https://www.homeaway.com/platform/myClients).
3. Install this module with `npm install homeaway`

## Using `node-homeaway`

Here's a simple example, where the `client` and `secret` are provided upon creating your client on the HomeAway website.
```js
const ha = new HomeAway({
  client:'your-client-id-here',
  secret: 'your-secret-here'
})

async function myFunc(){
  try{
    // connect() and all other methods on ha could throw.
    // You should catch these errors somewhere within your app.
    await ha.connect()
    const listing = await ha.getListing('6592159',['LOCATION','RATES'])
    console.log(listing)
  }
  catch(e){
    console.log(e)
  }
}

myFunc()
```
As you can see, `node-homeaway` makes use of some more cutting-edge JS features, like `async/await`. As such, it **requires Node 8 or above**.

For more examples, check out the `examples` photo in this repo.

## Supported Methods:

Methods are being added on an as-needed basis. Feel free to submit a PR if you want to implement a missing one yourself.

### Getting a Listing

Method signature: `async getListing(id,attributes)`

- `id` is a string corresponding to the id of the listing.
- `attributes` is an array of additional details to return with the listing, for example `PHOTOS` or `AVAILABILITY`.

It corresponds to the [`GET /public/listing`](https://www.homeaway.com/platform/developer-api#public/listingGET) API method.

### Getting a User Token

User tokens are required for methods that access user account information. If you don't need to access user account information, its much easier to not bother with this at all. Getting these tokens is a three step process.

1. Redirect the user to a page on HomeAway's website on which they grant your app access to their account.
2. Handle a request which includes an authorization code to your client redirect URL.
3. Use that authorization code to get the final access token. This token will be used to make all subsequent requests for that user.

Step 1 should be handled by your app exclusively. Per the [HomeAway API Docs](https://www.homeaway.com/platform/developer-api), the URL you need to redirect users to is: `https://ws.homeaway.com/oauth/authorize?client_id=<YOUR CLIENT ID>`

Steps 2 and 3 are handled by `node-homeaway`. Depending on your needs, you can use one of two methods:

1. If you're only using HomeAway as a login provider, you can get a thumbs-up/thumbs-down on whether a user is logged in (as well as their email) by calling the `node-homeaway` authenticate method. All other requests to the HomeAway API can be made with a call to an existing `node-homeaway` client.

2. If you need to make calls to user-specific methods (eg. `GET /public/me`), you'll need to include the user access token with every method call (as the first argument).

The user access token should be stored with your client-side application (eg. in [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)) and sent with every request to your Node backend.

You can generate a user access token by calling the `node-homeaway` getUserToken method. This should be called when the user is sent to the redirect URL you specified in your HomeAway client configuration.

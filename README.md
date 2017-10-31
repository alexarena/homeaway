## About

`homeaway` is an unofficial HomeAway API client for Node. It is in no way affiliated with either HomeAway, Inc. or Expedia, Inc.

It is very much a work-in-progress and API methods are being added on an as-needed basis.

## Getting Started

1. Get access to the [HomeAway API](https://www.homeaway.com/platform/lead-form). They ask you a few questions about what you want to build, but I was given access immediately after filling out the form.
2. Create a [client](https://www.homeaway.com/platform/myClients).
3. Install this client with `npm install homeaway`

## Using `homeaway`

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
As you can see, `homeaway` makes use of some more cutting-edge JS features, like `async/await`. As such, it **requires Node 8 or above**.

For more examples, check out the `examples` photo in this repo.

## Supported Methods:

Methods are being added on an as-needed basis. Feel free to submit a PR if you want to implement a missing one yourself.

### Getting a Listing

Method signature: `async getListing(id,attributes)`

- `id` is a string corresponding to the id of the listing.
- `attributes` is an array of additional details to return with the listing, for example `PHOTOS` or `AVAILABILITY`.

It corresponds to the [`GET /public/listing`](https://www.homeaway.com/platform/developer-api#public/listingGET) API method.

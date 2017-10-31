const HomeAway = require('homeaway')

// A simple request, assuming you already have an access token.
// ====

// This should never throw an error, so it can be called outside of a try/catch.
const ha = new HomeAway({access_token:'your-access-token-here'})

//The above is equivalent to
//const ha = new HomeAway()
//ha.setToken('your-access-token-here')

async function myFunc(){
  try{
    // getListing() and all other methods on ha could throw.
    // You should catch these errors somewhere within your app.
    const listing = await ha.getListing('6592159',['LOCATION','RATES'])
    console.log(listing)
  }
  catch(e){
    console.log(e)
  }
}

myFunc()

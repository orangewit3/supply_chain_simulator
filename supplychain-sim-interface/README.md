# UI for supply chain simulator
The front-end interface for the supply chain simulator, built using Next.js (which comes packaged with React.js and Node.js for API routes (always under `pages/api/`))

**Note:**
> This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## To-Do's
> _Put all to-do's here_. We will use this to manage tasks per feature, bug,, et cetera.

### Assigned
> Tasks assigned to you

1. Truffle now comes packaged with pre-packaged with [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/), a popular combo of testing and development libraries for JS. 

To run tests using `truffle`, you'll run:
```bash
truffle test ./path/to/file
```

Using the repo I gave you as an example, try to make some tests for the `cocoaBeanFarmer.json` contract ABI using the `ganache-cli`.

The proper import command for Ganache is already in the `cocoaBeanFarmer.test.js` file for you.

Lastly, for quick reference, here is the previous repo's test `Campaign.test.js` file (note how the use of the compiled JSON ABIs).
```js
// Create one test file for both contracts
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// Making an instance of Web3
const web3 = new Web3(ganache.provider());

// Require in the two compiled versions of our contracts
// To walk from the test folder and to our target file, we use '../' to
// get out of the current directory and into the '/kickstart' directory, then
// we walk back down to the 'CampaignFactory.json' file
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
// Same as above but for 'Campaign.json'
const compiledCampaign = require('../ethereum/build/Campaign.json');

// Put together 'beforeEach' statement, and inside there, we will use our
// account to deploy a new instance of our factory and then we can manipulate
// that factory and start creating campaigns and writing tests around it

// A listing of all accounts in the local ganache network
let accounts;
// Reference to the deployed factory that we will make
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // Deploy an instance of our factory contract by using 'compiledFactory'
  // Use the 'Contract()' constructor that is apart of the 'web3.eth' library
  // then pass in our compiled factories ABI, or it's interface.
  // Then deploy it and send the transaction out to the network.
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  // 'getDeployedCampaigns()' function is used to access a campaign's data that
  // was just made, we couldn't access the campaign data otherwise
  await factory.methods.createCampaign('100').send({
     from: accounts[0],
    gas: '1000000'
   });

   // This line below wil return an array of addresses
   // Taking out the first element of the array and assigning it to this
   // new array '[camapaignAddress]'
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  // assign the result of 'campaign' to a new variable
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
   );
});

// A test to make sure that both the campaign and factory were deployed
// successfully
describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  // Make sure that the manager of the campaign is at accounts[0]
  it('marks caller as the campaign manager', async () => {
    // how to do an assertion to make sure that the manager is correctly set
    // Because we marked the manager variable as public, we have access to the
    // 'manager()' function
    const manager = await campaign.methods.manager().call();
    // writing out what we hope the the retrieved manager's address is and what
    // what it actually is
    assert.equal(accounts[0], manager);
  });

  // Check to see if a contributor gets their account gets marked as an approver
  it('allows people to contribute money and marks them as approvers', async() => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1], // Recall accounts[0] is manager
    });
    // because we added a 'mapping' to keep track of who is an 'approver'
    // we get constant time lookup to verify an 'approver' and because we
    // marked the variable as public, we get access to a method for to get
    // access to this 'mapping' variable
    // We can look up a single value in the 'mapping', if we look up a
    // specific address, the method will return a 'boolean'

    // '.approvers' is the function that allows us to access that 'mapping' we
    // We cannot retrieve an entire mapping, can only retrieve a specific value
    // that corresponds to that key.
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor); // if 'isContributor' is true, then the test will pass
  });

  // Writing a new test through an 'it()' block to test that the minimum
  // contribution is met
  it('requires a minimum contribution', async () => {
    // Calling in the campaigns contribute function and checking to see if the
    // minimum contribution is greater than '100' wei
    try {
      // placing the actual function call
      await campaign.methods.contribute().send({
        // Specify the value that we want to send with this transaction...
        value: '5',
        from: accounts[1],
      })
      // if the code below is ever executed, then the test will automatically
      // fail inside the catch block
      assert(false);
    } catch (err) {
      // 'assert(err)' makes sure that we do in fact have an error object here
      assert(err);
    }
  });

  // A test to check that a manager makes a payment request
  it('allows a manager to make a payment request', async () => {
    // call the 'createRequest' function and pass the required arguments of
    // description, value, and address
    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      // Don't forget to add the '.send()' method because this is a function
      // that is going to modify some data
      .send({
        from: accounts[0],
        gas: '1000000'
      });
      // Every time we send a transaction, we get no return value back.
      // Must reach into our contract and pull out the request that was just made
      // to make sure the request was made

      // Since we marked our Requests function as 'public', we get the
      // '.requests()' for free

      // Since we haven't made any requests previously, we should try to get
      // the request at index 0, 'requests[0]', from our requests array
      const request = await campaign.methods.requests(0).call();

      // Making sure that the 'description' property of requests[0] from our
      // requests[] array was set properly.
      assert.equal('Buy batteries', request.description);
  });

  // A test that captures everything our contract does from start to finish:
  // 1) take the campaign, contribute to it
  // 2) Create a request
  // 3) Approve the request
  // 4) Finalize the request
  // 5) Then assert that some other party receives money from the request
  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({ from: accounts[0], gas: '1000000'} );

    // call the request method
    // We only approved one request, and that request must be at index 0
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    // pass in the index of the request that we want to finalize, index 0
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    // Retreive the balance at accounts at index 1, and verify that it does
    // have some balance inside of it

    // 'balance' is a string that represents the balance that accounts[1] has
    // in Wei
    let balance = await web3.eth.getBalance(accounts[1]);
    // Take that Wei balance and convert it to 'ether', by specifying that we
    // want to have 'ether'
    balance = web3.utils.fromWei(balance, 'ether');
    // Using built-in helper 'parseFloat()' to take the string 'balance' and
    // turn it into a decimal number -- thus, we are changing balance into
    // a fully qualified number that we can do a comparison on
    balance = parseFloat(balance);

    // Now we assert that the 'balance' should be greater than some minimum
    // amount of 'ether' that this account should have at this point
    assert(balance > 104);
  });
});
```

>Let me know if you guys have any questions.

2. Do the same as 1), but now for the remaining 3 contract test files.

>Let me know if you guys have any questions.


### Other
> All other tasks
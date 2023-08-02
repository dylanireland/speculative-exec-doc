# Speculative Execution

## Overview

Speculative Execution is a new feature in Casper node version 1.5. This new endpoint allows users the ability to submit deploys to the network to test the execution results and calculate total gas cost. This feature is available on all Casper networks given that the node is running version 1.5 or higher. The speculative execution engine will consider the global state of the network it is running on, so deploys submitted on different networks may return different results and gas costs.

## Testing Execution

The first of the two principal features of the speculative execution endpoint is the testing of deploys before commitment to the blockchain. Once a deploy has been signed, submitted, and executed, a JSON response containing the execution results is returned to the client, identical to that of calling the */put_deploy* endpoint (writing to the blockchain). This JSON response can be parsed to determine the success of the execution, as well as the [transforms]() that would be applied had it been deployed to the network. This is very useful for testing, and allows a user to test their deploys against the global state to check if it will succeed.

## Calculating Gas Cost

The other useful feature of the speculative execution endpoint is the ability to calculate the gas cost, which was previously not accurately possible as the gas requirement relies on current global state data. As long as the relevant state doesn't change between the invocation of the speculative execution endpoint and the submission of the deploy to */put_deploy*, the gas cost should be identical. This way, no funds are wasted, considering excess gas on Casper networks is not refunded.

## Using the Endpoint

Using the speculative execution endpoint is as simple as using the traditional */put_deploy* endpoint. Simply craft and sign a deploy, and submit it to the JSON RPC endpoint */speculative_exec*.

TODO: Demonstrate with casper-client
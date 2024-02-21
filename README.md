## Prerequisites

- Node v16.x
- Docker
- [Squid CLI](https://docs.subsquid.io/squid-cli/)

## Running 

Navigate to the example folder.

```bash
npm ci
sqd build
# start the database
sqd up
# starts a long-running ETL and blocks the terminal
sqd process

# starts the GraphQL API server at localhost:4350/graphql
sqd serve
```

## Final data

All the final data can be found in the [data](https://github.com/kinsyudev/entangle-seed-deposits/tree/main/data) folder.


## Verify the data

In order to verify the data, simply run the squid, and once it's done processing. In the GraphQL explorer, use the following query:
```gql
query Deposits {
  accounts(orderBy: totalDeposits_DESC) {
    id
    totalDeposits
    deposits {
      amount
      id
      txHash
    }
  }
}
```

It'll match exactly with `data/all-deposits.json`

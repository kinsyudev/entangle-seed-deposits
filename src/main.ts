import { In } from 'typeorm'
import { assertNotNull } from '@subsquid/evm-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import * as erc20 from './abi/erc20'
import * as ledgerAbi from './abi/ledger'
import { Account, Deposit } from './model'
import { Block, LEDGER_CONTRACT, Context, Log, Transaction, processor } from './processor'

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
    let deposits: DepositEvent[] = []

    for (let block of ctx.blocks) {
        for (let log of block.logs) {
            if (log.address === LEDGER_CONTRACT && log.topics[0] === ledgerAbi.events.DepositAdded.topic) {
                deposits.push(getDeposit(ctx, log))
            }
        }
    }

    await processDeposits(ctx, deposits)
})

interface DepositEvent {
    from: string
    amount: bigint
    oldAmount: bigint
    newAmount: bigint
    txHash: string
}

function getDeposit(ctx: Context, log: Log): DepositEvent {
    const event = ledgerAbi.events.DepositAdded.decode(log)

    let transaction = assertNotNull(log.transaction, `Missing transaction`)

    ctx.log.info({ block: log.block, txHash: transaction.hash }, `Deposit from ${event.account} amount ${event.amount}, old balance${event.oldDeposit}, new balance ${event.newDeposit}`)

    return {
        from: event.account,
        amount: event.amount,
        oldAmount: event.oldDeposit,
        newAmount: event.newDeposit,
        txHash: transaction.hash
    }
}

async function processDeposits(ctx: Context, depositsData: DepositEvent[]) {
    let accountIds = new Set<string>()
    for (let t of depositsData) {
        accountIds.add(t.from)
    }

    let accounts = await ctx.store
        .findBy(Account, { id: In([...accountIds]) })
        .then((q) => new Map(q.map((i) => [i.id, i])))

    const deposits: Deposit[] = []

    for (let i = 0; i < depositsData.length; i++) {
        const deposit = depositsData[i]
        const { amount, from: eventFrom, newAmount, oldAmount, txHash } = deposit

        const from = getAccount(accounts, deposit.from, newAmount)

        deposits.push(
            new Deposit({
                id: `${eventFrom}-${new Date().getTime()}-${i}`,
                account: from,
                amount: amount,
                txHash
            })
        )
    }

    ctx.log.info(`Upserting ${accounts.size} accounts.`)
    await ctx.store.upsert(Array.from(accounts.values()))
    ctx.log.info(`Upserted ${accounts.size} accounts.`)
    ctx.log.info(`Inserting ${deposits.length} deposits.`)
    await ctx.store.insert(deposits)
    ctx.log.info(`Inserted ${deposits.length} deposits.`)
}

function getAccount(m: Map<string, Account>, id: string, newAmount: bigint): Account {
    let acc = m.get(id)
    if (acc == null) {
        acc = new Account()
        acc.id = id
    }
    acc.totalDeposits = newAmount
    m.set(id, acc)
    return acc
}

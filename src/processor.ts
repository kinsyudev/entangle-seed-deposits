import { lookupArchive } from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import { Store } from '@subsquid/typeorm-store'
import * as ledgerAbi from './abi/ledger'

// contract https://ftmscan.com/address/0x8c74924756db54b2879fb61be6b0519f89f97dc2
export const LEDGER_CONTRACT = '0x8C74924756Db54b2879FB61Be6b0519F89f97dc2'.toLowerCase()

export const processor = new EvmBatchProcessor()
    .setGateway(lookupArchive('fantom'))
    .setBlockRange({
        from: 38473000,// deployment tx https://ftmscan.com/tx/0x4aa880373be624f5ad749fe317d7b58173fec232372cdd24c5c196709386240f
        to: 38725000, // last interaction https://ftmscan.com/tx/0xfd74f638ffa7cd579923e03461b228269afa111a0ef0e83d93cd48a2fd8ad145
    })
    .setFinalityConfirmation(10)
    .setFields({
        log: {
            topics: true,
            data: true,
        },
        transaction: {
            hash: true,
        },
    })
    .addLog({
        address: [LEDGER_CONTRACT],
        topic0: [ledgerAbi.events.DepositAdded.topic],
        transaction: true,
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>

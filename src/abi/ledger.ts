import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './ledger.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    DepositAdded: new LogEvent<([account: string, amount: bigint, oldDeposit: bigint, newDeposit: bigint] & {account: string, amount: bigint, oldDeposit: bigint, newDeposit: bigint})>(
        abi, '0xb37ee076389d0e0226e28f5eb753578001087ab4722dc31f831f024efb41da6f'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Paused: new LogEvent<([account: string] & {account: string})>(
        abi, '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258'
    ),
    Unpaused: new LogEvent<([account: string] & {account: string})>(
        abi, '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'
    ),
    WhitelistEntryAdded: new LogEvent<([account: string] & {account: string})>(
        abi, '0x6db68545df3fa6f10eff09d9d6ea9ea14493da12701c071decd880b4cd695cb2'
    ),
    WhitelistEntryRemoved: new LogEvent<([account: string] & {account: string})>(
        abi, '0xf5a17fc6cae0f780fd428d880fbc80162c6bc3fa0973463efcd4ee95067b382c'
    ),
    Withdrawn: new LogEvent<([account: string] & {account: string})>(
        abi, '0xf45a04d08a70caa7eb4b747571305559ad9fdf4a093afd41506b35c8a306fa94'
    ),
}

export const functions = {
    accounts: new Func<[_: bigint], {}, string>(
        abi, '0xf2a40db8'
    ),
    addToWhitelist: new Func<[accounts_: Array<string>], {accounts_: Array<string>}, []>(
        abi, '0x7f649783'
    ),
    deposit: new Func<[depositAmount: bigint], {depositAmount: bigint}, []>(
        abi, '0xb6b55f25'
    ),
    depositMax: new Func<[], {}, bigint>(
        abi, '0x3ea61cc0'
    ),
    depositUserMax: new Func<[], {}, bigint>(
        abi, '0xf6b65d04'
    ),
    depositUserMin: new Func<[], {}, bigint>(
        abi, '0x254d8e3b'
    ),
    deposits: new Func<[_: string], {}, bigint>(
        abi, '0xfc7e286d'
    ),
    getAccountDeposit: new Func<[account: string], {account: string}, bigint>(
        abi, '0xb6aa680c'
    ),
    getAccountShare: new Func<[account: string], {account: string}, bigint>(
        abi, '0x50bf440b'
    ),
    isWhitelisted: new Func<[account: string], {account: string}, boolean>(
        abi, '0x3af32abf'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    pause: new Func<[], {}, []>(
        abi, '0x8456cb59'
    ),
    paused: new Func<[], {}, boolean>(
        abi, '0x5c975abb'
    ),
    removeFromWhitelist: new Func<[accounts_: Array<string>], {accounts_: Array<string>}, []>(
        abi, '0x548db174'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    setLimits: new Func<[depositMax_: bigint, depositUserMax_: bigint, depositUserMin_: bigint], {depositMax_: bigint, depositUserMax_: bigint, depositUserMin_: bigint}, []>(
        abi, '0x189ae5f2'
    ),
    token: new Func<[], {}, string>(
        abi, '0xfc0c546a'
    ),
    totalDeposits: new Func<[], {}, bigint>(
        abi, '0x7d882097'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    unpause: new Func<[], {}, []>(
        abi, '0x3f4ba83a'
    ),
    whitelist: new Func<[_: string], {}, boolean>(
        abi, '0x9b19251a'
    ),
    whitelistLength: new Func<[], {}, bigint>(
        abi, '0x78bb5164'
    ),
    withdraw: new Func<[amount: bigint, pause_: boolean], {amount: bigint, pause_: boolean}, []>(
        abi, '0x38d07436'
    ),
}

export class Contract extends ContractBase {

    accounts(arg0: bigint): Promise<string> {
        return this.eth_call(functions.accounts, [arg0])
    }

    depositMax(): Promise<bigint> {
        return this.eth_call(functions.depositMax, [])
    }

    depositUserMax(): Promise<bigint> {
        return this.eth_call(functions.depositUserMax, [])
    }

    depositUserMin(): Promise<bigint> {
        return this.eth_call(functions.depositUserMin, [])
    }

    deposits(arg0: string): Promise<bigint> {
        return this.eth_call(functions.deposits, [arg0])
    }

    getAccountDeposit(account: string): Promise<bigint> {
        return this.eth_call(functions.getAccountDeposit, [account])
    }

    getAccountShare(account: string): Promise<bigint> {
        return this.eth_call(functions.getAccountShare, [account])
    }

    isWhitelisted(account: string): Promise<boolean> {
        return this.eth_call(functions.isWhitelisted, [account])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    paused(): Promise<boolean> {
        return this.eth_call(functions.paused, [])
    }

    token(): Promise<string> {
        return this.eth_call(functions.token, [])
    }

    totalDeposits(): Promise<bigint> {
        return this.eth_call(functions.totalDeposits, [])
    }

    whitelist(arg0: string): Promise<boolean> {
        return this.eth_call(functions.whitelist, [arg0])
    }

    whitelistLength(): Promise<bigint> {
        return this.eth_call(functions.whitelistLength, [])
    }
}

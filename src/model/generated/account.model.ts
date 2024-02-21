import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Deposit} from "./deposit.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    /**
     * Account address
     */
    @PrimaryColumn_()
    id!: string

    @OneToMany_(() => Deposit, e => e.account)
    deposits!: Deposit[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalDeposits!: bigint
}

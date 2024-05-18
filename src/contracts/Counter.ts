import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';


export class Counter implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Counter(address);
    }

    static createForDeploy(code: Cell, initialCounterValue: number): Counter {
        const data = beginCell()
          .storeUint(initialCounterValue, 64)
          .endCell();
        const workchainId = 0;
        const address = contractAddress(workchainId, {code, data});
        return new Counter(address, {code, data});
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            bounce: false,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async getCounter(provider: ContractProvider): Promise<bigint> {
        const { stack } = await provider.get("counter", []);
        return stack.readBigNumber();
    }

    async sendIncrement(provider: ContractProvider, via: Sender) {
        const bodyMsg = beginCell()
          .storeUint(1, 32)
          .storeUint(0, 64)
          .endCell()
        await provider.internal(via,{value: "0.02", body: bodyMsg});
    }

}

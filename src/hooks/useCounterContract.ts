import { useEffect, useState } from "react";
import { Counter } from "../contracts/Counter.ts";
import { useTonClient } from "./useTonClient.ts";
import { useAsyncInitialize } from "./useAsyncInitialize.ts";
import { Address, OpenedContract } from "@ton/core";
import { useTonConnect } from "./useTonConnect.ts";


export function useCounterContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | number>();
  const {sender} = useTonConnect();

  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
      Address.parse('EQAcWWaC1KPIt-6LM5ey_KJSk2-qiYO_esVYxB1I7ax7SIpp')
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      setVal(null);
      const val = await counterContract.getCounter();
      setVal(Number(val));
      await sleep(5000);
      getValue();
    }
    getValue();
  }, [counterContract]);

  return {
    value: val,
    address: counterContract?.address.toString(),
    sendIncrement: () => counterContract?.sendIncrement(sender)
  };
}
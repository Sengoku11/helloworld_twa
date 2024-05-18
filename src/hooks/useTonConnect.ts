import { Sender, SenderArguments } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";


export function useTonConnect(): {sender: Sender, connected: boolean} {
  const [tonConnectUI] = useTonConnectUI();

  const sendFn = async (args: SenderArguments) => {
    tonConnectUI.sendTransaction({
      messages: [{
        address: args.to.toString(),
        amount: args.value.toString(),
        payload: args.body?.toBoc().toString('base64')
      }],
      validUntil: Date.now() + 5 * 60 * 1000  // 5 minutes to approve
    })
  }

  return {
    sender: {send: sendFn},
    connected: tonConnectUI.connected
  }
}

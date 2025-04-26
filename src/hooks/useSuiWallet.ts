
import { useWalletKit } from "@mysten/wallet-kit";
import { type ConnectOptions } from "@mysten/wallet-kit";

export const useSuiWallet = () => {
  const { currentAccount, isConnected, connect, disconnect } = useWalletKit();

  return {
    isConnected,
    address: currentAccount?.address,
    connect,
    disconnect
  };
};


import { useWalletKit } from "@mysten/wallet-kit";
import { type WalletAccount } from "@mysten/wallet-standard";

export const useSuiWallet = () => {
  const { currentAccount, isConnected, connect, disconnect } = useWalletKit();

  const connectWallet = async () => {
    await connect();
  };

  return {
    isConnected,
    address: currentAccount?.address,
    connect: connectWallet,
    disconnect,
    currentAccount
  };
};


import { useWalletKit } from "@mysten/wallet-kit";

export const useSuiWallet = () => {
  const { currentAccount, isConnected, connect, disconnect } = useWalletKit();

  const connectWallet = async () => {
    try {
      // Connect with required parameter (null is valid for default options)
      await connect(null);
      return true;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return false;
    }
  };

  return {
    isConnected,
    address: currentAccount?.address,
    connect: connectWallet,
    disconnect,
    currentAccount
  };
};

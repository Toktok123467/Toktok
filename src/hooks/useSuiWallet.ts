
import { useWalletKit } from "@mysten/wallet-kit";
import { useState } from "react";

export const useSuiWallet = () => {
  const { currentAccount, isConnected, connect, disconnect } = useWalletKit();
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // The connect function requires a parameter even if it's null
      await connect(null);
      setIsConnecting(false);
      return true;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setIsConnecting(false);
      return false;
    }
  };

  return {
    isConnected,
    address: currentAccount?.address,
    connect: connectWallet,
    disconnect,
    currentAccount,
    isConnecting
  };
};

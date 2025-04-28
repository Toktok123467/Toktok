
import { WalletKitProvider } from "@mysten/wallet-kit";
import { ReactNode } from "react";

export const SuiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WalletKitProvider 
      features={["sui:signTransactionBlock"]} 
      enableUnsafeBurner={false}
      preferredWallets={["Sui Wallet", "Ethos Wallet", "Suiet"]}
      // Explicitly disable autoConnect to ensure manual connection only
      autoConnect={false}
    >
      {children}
    </WalletKitProvider>
  );
};

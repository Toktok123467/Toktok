
import { WalletKitProvider } from "@mysten/wallet-kit";
import { ReactNode } from "react";

export const SuiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WalletKitProvider 
      features={["sui:signTransactionBlock"]} 
      enableUnsafeBurner={false}
    >
      {children}
    </WalletKitProvider>
  );
};

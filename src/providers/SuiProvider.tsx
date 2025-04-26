
import { WalletKitProvider } from "@mysten/wallet-kit";
import { ReactNode } from "react";

export const SuiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WalletKitProvider>
      {children}
    </WalletKitProvider>
  );
};

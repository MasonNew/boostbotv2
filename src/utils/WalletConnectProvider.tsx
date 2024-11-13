import { useMemo } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider} from '@solana/wallet-adapter-react-ui'
// import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
// import {
//     LedgerWalletAdapter,
//     PhantomWalletAdapter,
//     SolflareWalletAdapter,
//     TorusWalletAdapter,
//   } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js'

export const WalletConnectProvider = ({ children } : {children : any}) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    // const network = WalletAdapterNetwork.Devnet;

    // // You can also provide a custom RPC endpoint.
    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // const wallets = useMemo(
    //     () => [
    //         /**
    //          * Wallets that implement either of these standards will be available automatically.
    //          *
    //          *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
    //          *     (https://github.com/solana-mobile/mobile-wallet-adapter)
    //          *   - Solana Wallet Standard
    //          *     (https://github.com/anza-xyz/wallet-standard)
    //          *
    //          * If you wish to support a wallet that supports neither of those standards,
    //          * instantiate its legacy wallet adapter here. Common legacy adapters can be found
    //          * in the npm package `@solana/wallet-adapter-wallets`.
    //          */
    //         new UnsafeBurnerWalletAdapter(),
    //     ],
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     [network]
    // );
    

    return (
        <>
        {children}
        </>
        // <ConnectionProvider endpoint={endpoint}>
        //     <WalletProvider wallets={wallets} autoConnect>
        //         <WalletModalProvider>
        //             {children}
        //         </WalletModalProvider>
        //     </WalletProvider>
        // </ConnectionProvider>
    )
}
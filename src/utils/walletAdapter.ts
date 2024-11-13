// import { web3 } from "@project-serum/anchor";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

// export interface CustomWalletAdapter extends PhantomWalletAdapter {
//     signAndSendTransaction(transaction: web3.Transaction): Promise<web3.Transaction>
// }

// export function getPhantomAdapter(): CustomWalletAdapter | undefined {
//     if ("solana" in window) {
//         const provider = (window as any).solana;
//         if (provider?.isPhantom) {
//             return provider;
//         }
//     }
//     window.open("https://phantom.app/", "_blank");
// };

export default async function connectWalletHandler() {
    // let adapter = getPhantomAdapter();
    // if(!adapter) {
    //     console.log('debug no adapter')
    //     return;
    // }
    // await adapter.connect();
}

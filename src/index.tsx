import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
// import { WalletProvider } from "./context/WalletContext";
import { WalletConnectProvider } from "./utils/WalletConnectProvider";
import { SocialProvider } from "./context/SocialContext";
import { ContactProvider } from "./context/ContactContext";

import "./main.css";
import { CustomerProvider } from "./context/CustomerContext";
import { MetaProvider } from "./context/MetaContext";
import { Toaster } from "react-hot-toast";
// import { getPhantomAdapter } from "./utils/walletAdapter";

// const adapter = getPhantomAdapter();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <CustomerProvider>
          <ProductProvider>
            <OrderProvider>
              {/* <WalletProvider> */}
              <ContactProvider>
                <SocialProvider>
                  <WalletConnectProvider>
                    <MetaProvider>
                      <div>
                        <Toaster position="top-center" reverseOrder={false} />
                      </div>
                      <App />
                    </MetaProvider>
                  </WalletConnectProvider>
                </SocialProvider>
              </ContactProvider>
              {/* </WalletProvider> */}
            </OrderProvider>
          </ProductProvider>
        </CustomerProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);

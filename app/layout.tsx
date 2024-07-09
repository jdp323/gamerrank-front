"use client";
// app/layout.tsx
import { Toaster } from "react-hot-toast";
import { Provider } from "../components/ChakraProvider";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "@/contexts/UserContext";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "rgb(246, 246, 239)",
        }}
      >
        <Toaster position="top-right" />
        <Provider>
          <QueryClientProvider client={queryClient}>
            <UserContextProvider>{children}</UserContextProvider>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}

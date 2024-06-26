// app/layout.tsx
import { Provider } from "../components/ChakraProvider";
import "./global.css";
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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

// pages/_document.tsx or app/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload Razorpay script */}
        <link 
          rel="preload" 
          href="https://checkout.razorpay.com/v1/checkout.js" 
          as="script"
        />
        {/* Other head elements */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
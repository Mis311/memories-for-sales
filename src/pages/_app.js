import '../styles/globals.css'
import React from 'react';
import '../component/FloatingBoxes.modules.css'
import Layout from '@/component/layout';
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();


  const isLandingPage = router.pathname === '/';

  if (isLandingPage) {

    return <Component {...pageProps} />
  } else {

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

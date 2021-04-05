import Head from 'next/head'
import Link from 'next/link'
import SignUp from '../components/SignUp.js'
export default function createAccount() {
  return (
    <div>
      <SignUp />
    </div>
  );
}
/*
export default function FirstPost() {
  return (
      <div>
      <Head>
        <title>Create Account</title>
      </Head>
      <h1>Create Account Page</h1>
      </div>
  )
}
*/
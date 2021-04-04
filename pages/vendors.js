import Head from 'next/head'
import Layout from '../components/layout'
import { getSortedVendorsData } from '../lib/vendors'

export async function getStaticProps() {
  const allVendorsData = getSortedVendorsData()
  return {
    props: {
      allVendorsData
    }
  }
}

export default function Vendors({allVendorsData}) {
  return (
    <Layout>
      {/*<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>*/}
      <section>
        <h2>Blog</h2>
        <ul>
          {allVendorsData.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
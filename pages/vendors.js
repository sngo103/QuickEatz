import { getSortedVendorsData } from "../lib/vendors";

export async function getStaticProps() {
  const allVendorsData = getSortedVendorsData();
  return {
    props: {
      allVendorsData,
    },
  };
}

export default function Vendors({ allVendorsData }) {
  return (
    <div>
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
    </div>
  );
}

import clientPromise from "../lib/mongodb";

export default function Home({ items }) {
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>MongoDB + Next.js Demo</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("General");

    // Fetch data from the collection
    const items = await db.collection("Users").find({}).toArray();

    return {
      props: {
        items: JSON.parse(JSON.stringify(items)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { items: [] },
    };
  }
}
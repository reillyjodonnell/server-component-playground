import { db } from '../../prisma/prisma';

async function getData() {
  console.log('FETCHING');
  const res = await db.post.findMany({
    where: {
      authorId: 1,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res;
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      {data.map(({ title, id }) => {
        return <span key={id}>{title}</span>;
      })}
    </main>
  );
}

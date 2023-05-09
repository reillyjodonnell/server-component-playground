const Prisma = require('@prisma/client');
const prisma = new Prisma.PrismaClient();

async function main() {
  const users = [
    { name: 'User 1', email: 'user1@example.com' },
    { name: 'User 2', email: 'user2@example.com' },
    { name: 'User 3', email: 'user3@example.com' },
    { name: 'User 4', email: 'user4@example.com' },
  ];

  for (const userData of users) {
    const user = await prisma.user.create({ data: userData });

    for (let i = 1; i <= 12; i++) {
      await prisma.post.create({
        data: {
          title: `Post ${i} by ${user.name}`,
          content: `This is the content of Post ${i} written by ${user.name}.`,
          published: i % 2 === 0,
          authorId: user.id,
        },
      });
    }
  }
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exit(1);
} finally {
  prisma.$disconnect();
}

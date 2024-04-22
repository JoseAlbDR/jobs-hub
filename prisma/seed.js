const { PrismaClient } = require('@prisma/client');
const data = require('./mock-data.json');
const prisma = new PrismaClient();

async function main() {
  const userId = 'user_2fRsJtvJax4Q9vUoyfZSwoOBHJN';
  const jobs = data.map(job => {
    return {
      ...job,
      userId
    };
  });

  await prisma.job.createMany({ data: jobs });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import "dotenv/config"
import { prisma } from "../src/lib/prisma"

async function main() {
  console.log("Cleaning old records...")
  await prisma.college.deleteMany({})

  console.log("Seeding colleges...")

  await prisma.college.createMany({
    data: [
      {
        name: "IIT Delhi",
        location: "New Delhi, DL",
        fees: 250000,
        rating: 4.8,
        placementPercentage: 92,
        description:
          "Premier public engineering institute in India with strong research and industry placements.",
        image: "https://images.unsplash.com/photo-1562774053-701939374585",
        courses: ["Computer Science", "ECE", "Mechanical"],
      },
      {
        name: "DTU",
        location: "Delhi, DL",
        fees: 180000,
        rating: 4.5,
        placementPercentage: 85,
        description:
          "Delhi Technological University offering diverse engineering programs in the capital.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
        courses: ["IT", "Civil", "Electrical"],
      },
      {
        name: "Netaji Subhas University of Technology",
        location: "Delhi, DL",
        fees: 220000,
        rating: 4.6,
        placementPercentage: 88,
        description:
          "Leading tier-1 state engineering university located in New Delhi.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
        courses: ["ECE", "AI", "IT"],
      },
      {
        name: "IIT Bombay",
        location: "Mumbai, MH",
        fees: 260000,
        rating: 4.9,
        placementPercentage: 94,
        description:
          "Top-ranked IIT with exceptional faculty, startups, and global recruiter presence.",
        image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a",
        courses: ["CSE", "Chemical", "Aerospace"],
      },
      {
        name: "BITS Pilani",
        location: "Pilani, RJ",
        fees: 500000,
        rating: 4.7,
        placementPercentage: 90,
        description:
          "Elite private engineering university known for flexible curriculum and strong startup culture.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
        courses: ["Computer Science", "Biotech", "Electrical"],
      },
      {
        name: "VIT Vellore",
        location: "Vellore, TN",
        fees: 350000,
        rating: 4.2,
        placementPercentage: 78,
        description:
          "Large private university with broad program choices and a sizable student community.",
        image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d",
        courses: ["AI", "Data Science", "Cybersecurity"],
      },
    ],
  })

  console.log("Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

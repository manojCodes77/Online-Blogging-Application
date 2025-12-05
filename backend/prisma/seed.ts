/// <reference types="node" />
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// For seeding, we need to use the direct database URL
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL environment variable is not set");
  process.exit(1);
}

// Create a PostgreSQL connection pool
const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

// Simple hash function for demo purposes (passwords are: "password123")
const hashPassword = (password: string): string => {
  // Using a simple base64 encoding for demo - in production use bcrypt
  return Buffer.from(password).toString("base64");
};

const users = [
  {
    email: "arjun.sharma@gmail.com",
    name: "Arjun Sharma",
    password: "password123",
  },
  {
    email: "priya.patel@gmail.com",
    name: "Priya Patel",
    password: "password123",
  },
  {
    email: "rahul.verma@gmail.com",
    name: "Rahul Verma",
    password: "password123",
  },
  {
    email: "ananya.gupta@gmail.com",
    name: "Ananya Gupta",
    password: "password123",
  },
  {
    email: "vikram.singh@gmail.com",
    name: "Vikram Singh",
    password: "password123",
  },
];

const posts = [
  {
    title: "The Rise of Indian Startups: A New Era of Innovation",
    content: `India's startup ecosystem has witnessed an unprecedented boom in recent years. From Bangalore's tech corridor to Mumbai's financial hub, young entrepreneurs are building companies that compete on the global stage.

The government's Startup India initiative, launched in 2016, has provided crucial support through tax benefits, funding, and regulatory ease. Today, India boasts over 100 unicorns - startups valued at over $1 billion.

Companies like Flipkart, Zomato, Paytm, and Ola have transformed how Indians shop, eat, pay, and travel. The next wave of startups is tackling deeper problems - from rural healthcare to agricultural technology.

What makes Indian startups unique is their ability to innovate for the masses. Building products for a billion people with diverse needs and limited budgets requires a special kind of creativity. This "jugaad" innovation is now being recognized worldwide.

The future looks bright for Indian entrepreneurship. With a young population, increasing internet penetration, and growing investor confidence, we're just getting started.`,
    published: true,
  },
  {
    title: "Exploring the Spiritual Heritage of Varanasi",
    content: `Varanasi, also known as Kashi or Banaras, is one of the oldest continuously inhabited cities in the world. Situated on the banks of the holy Ganga, this ancient city has been the spiritual capital of India for millennia.

Walking through the narrow galis (lanes) of Varanasi is like traveling back in time. The smell of incense mixes with temple bells, as pilgrims make their way to the numerous ghats for their morning rituals.

The Ganga Aarti at Dashashwamedh Ghat is a spectacle that touches the soul. Every evening, priests perform synchronized rituals with brass lamps, accompanied by chanting and the sound of conch shells. Thousands gather to witness this ancient ceremony.

Beyond spirituality, Varanasi is known for its silk weaving tradition. The famous Banarasi sarees, with their intricate zari work, are treasured across India and passed down through generations.

The city has also been a center of learning and music. The Banaras gharana of classical music has produced legendary artists, and BHU (Banaras Hindu University) remains one of Asia's largest residential universities.

Varanasi teaches us that in India, the ancient and modern coexist beautifully. It's a city that must be experienced to be understood.`,
    published: true,
  },
  {
    title: "Understanding the Indian Monsoon: A Farmer's Lifeline",
    content: `The Indian monsoon is not just a weather phenomenon - it's a cultural, economic, and emotional event that shapes the lives of 1.4 billion people. For farmers across the subcontinent, the arrival of monsoon rains means the difference between prosperity and hardship.

The southwest monsoon typically arrives at Kerala's coast around June 1st, bringing relief from the scorching summer heat. Over the next six weeks, it progresses northward, covering the entire country by mid-July.

Indian agriculture depends heavily on monsoon rains, with over 50% of farmland being rain-fed. A good monsoon means bumper harvests of rice, wheat, sugarcane, and pulses. A failed monsoon can trigger food inflation and rural distress.

Climate change is making monsoons increasingly unpredictable. We're seeing more extreme events - both droughts and floods. States like Maharashtra, Karnataka, and Rajasthan have experienced consecutive drought years, while Assam and Bihar face annual flooding.

The government has invested in irrigation infrastructure and weather forecasting to reduce monsoon dependency. The IMD (India Meteorological Department) now provides accurate forecasts that help farmers plan their sowing.

For Indians, the first rain of the season is celebrated with pakoras (fritters) and chai. Children play in the rain, and the earthy smell of wet soil - called 'mitti ki khushboo' - evokes deep nostalgia. The monsoon is truly India's heartbeat.`,
    published: true,
  },
  {
    title: "The Art of South Indian Filter Coffee",
    content: `In South India, coffee is not just a beverage - it's a ritual, a tradition, and an identity. The distinctive filter kaapi, served in a steel tumbler and davara, is as iconic to Chennai and Bangalore as chai is to the North.

The story begins in the 17th century when Baba Budan, a Sufi saint, smuggled seven coffee beans from Yemen and planted them in the hills of Chikmagalur, Karnataka. Today, India is among the world's top coffee producers.

Making authentic filter coffee is an art. Freshly ground coffee and chicory are packed into a traditional brass or stainless steel filter. Hot water is added and allowed to drip slowly for several hours. This decoction is then mixed with boiling milk and sugar.

The ritual of serving is equally important. The coffee is poured between the tumbler and davara from a height, creating froth and cooling it to the perfect drinking temperature. This aerating technique also enhances the flavor.

Every household has its preferences - the ratio of coffee to chicory, the strength of decoction, the amount of sugar. Some add a pinch of jaggery for a traditional touch.

Coffee houses like Indian Coffee House, started during the independence movement, became hubs for intellectuals and activists. Even today, discussions over filter coffee fuel ideas and friendships across South India.`,
    published: true,
  },
  {
    title: "The Digital Transformation of Rural India",
    content: `India's digital revolution is reaching its villages. With over 65% of Indians living in rural areas, the transformation of Bharat (as rural India is often called) is crucial for the nation's progress.

The Jan Dhan-Aadhaar-Mobile (JAM) trinity has been revolutionary. Over 500 million bank accounts were opened for the previously unbanked. Aadhaar provides a unique identity to every resident, and mobile phones have become the gateway to the digital economy.

UPI (Unified Payments Interface) has democratized digital payments. A small kirana store owner in a Bihar village can now accept payments through a simple QR code. The same technology that powers urban fintech is empowering rural entrepreneurs.

Digital education is bridging the urban-rural divide. During the pandemic, platforms like DIKSHA and various state government apps brought lessons to students in remote areas. While challenges remain, the foundation has been laid.

AgriTech startups are connecting farmers directly to markets. Apps provide real-time mandi prices, weather forecasts, and expert advice. Drones survey crops, and AI predicts yields.

Telemedicine is bringing healthcare to the doorstep. Village health workers, armed with tablets and basic diagnostic tools, can now consult with specialist doctors in city hospitals.

The digital infrastructure being built today - fiber optic cables reaching gram panchayats, public WiFi at village squares - will define India's future. The next billion internet users will come from rural India.`,
    published: true,
  },
  {
    title: "Celebrating Diwali: The Festival of Lights",
    content: `Diwali, the festival of lights, is India's most celebrated festival. Observed by Hindus, Sikhs, Jains, and many others, it symbolizes the victory of light over darkness and good over evil.

The five-day festival begins with Dhanteras, when people buy gold and utensils for prosperity. Choti Diwali follows, and then the main Diwali day when homes are illuminated with diyas (oil lamps) and decorated with rangoli.

The mythology varies across regions. In North India, Diwali celebrates Lord Rama's return to Ayodhya after 14 years of exile. In South India, it commemorates Lord Krishna's victory over Narakasura. For Jains, it marks Lord Mahavira's attainment of moksha.

The preparations start weeks in advance. Homes are cleaned and painted, representing a fresh start. Markets buzz with shoppers buying clothes, sweets, and gifts. The aroma of homemade snacks - chakli, murukku, karanji - fills kitchens.

On Diwali night, families gather for Lakshmi Puja, seeking blessings for prosperity. Fireworks light up the sky (though eco-friendly celebrations are now encouraged). Neighbors exchange sweets and good wishes.

The next day, Govardhan Puja is observed, followed by Bhai Dooj, celebrating the bond between brothers and sisters.

Diwali reminds us of the importance of family, the triumph of righteousness, and the hope that light always prevails. It's a time when India shines, literally and metaphorically.`,
    published: true,
  },
  {
    title: "The Evolution of Indian Cinema: From Bollywood to Pan-India",
    content: `Indian cinema has come a long way since Raja Harishchandra, the first full-length feature film, was released in 1913. Today, India produces over 1,500 films annually in multiple languages, making it the world's largest film industry by volume.

Bollywood, based in Mumbai, dominated Indian cinema for decades with its masala formula of song, dance, romance, and drama. Legends like Raj Kapoor, Amitabh Bachchan, and Shah Rukh Khan became cultural icons not just in India but across the world.

The 21st century brought a shift. Regional cinemas - Tamil, Telugu, Malayalam, Kannada - began producing content that rivaled and often surpassed Bollywood in quality and scale. The Bahubali franchise proved that regional films could achieve pan-India success.

The OTT revolution accelerated this change. Platforms like Netflix, Amazon Prime, and Disney+ Hotstar gave audiences access to content from all languages. A Malayalam thriller could now find viewers in Punjab, and a Tamil drama could trend in Gujarat.

Films like RRR, KGF, and Pushpa transcended language barriers through dubbed releases and universal themes. The traditional Bollywood vs. Regional divide has given way to a unified "Indian cinema" identity.

Content has also matured. Films now tackle social issues, experiment with genres, and tell stories that resonate globally. Indian films are winning at international festivals, and filmmakers like Mani Ratnam, Rajamouli, and Anurag Kashyap are recognized worldwide.

The future of Indian cinema is exciting - diverse, bold, and truly representative of our billion-plus stories.`,
    published: true,
  },
  {
    title: "Building a Career in Tech: Lessons from IIT and Beyond",
    content: `The Indian Institutes of Technology (IITs) have produced some of the world's most successful tech leaders. From Google's Sundar Pichai to Adobe's Shantanu Narayen, IIT alumni lead global companies. But what lessons can we learn from this success?

The IIT journey begins with JEE, one of the world's most competitive exams. Lakhs of students compete for a few thousand seats. This rigorous selection creates a peer group of exceptional talent, and the competition continues throughout college.

But IIT success is not just about intelligence - it's about work ethic. Students learn to perform under pressure, manage time effectively, and solve problems creatively. The famous "IIT culture" emphasizes both technical excellence and all-round development.

Beyond academics, IITs foster entrepreneurship. The halls of IIT dorms have birthed companies like Flipkart, Ola, and Zomato. The network of alumni provides mentorship, funding, and opportunities.

However, the tech landscape is changing. Companies now value skills over degrees. Online learning, coding bootcamps, and open source contributions are creating new pathways into tech. You don't need an IIT degree to build a successful tech career.

What matters is continuous learning. Technology evolves rapidly - the hot skill of today may be obsolete tomorrow. The ability to adapt, learn, and reinvent yourself is more important than any degree.

Whether you're from IIT or a tier-3 college, success in tech comes from building real projects, contributing to communities, and never stopping learning. India's tech talent is its greatest asset.`,
    published: true,
  },
  {
    title: "Draft: Understanding GST - A Comprehensive Guide",
    content: `The Goods and Services Tax (GST), implemented on July 1, 2017, was India's most significant tax reform since independence. It replaced a complex web of central and state taxes with a unified indirect tax system.

Before GST, businesses dealt with multiple taxes - excise duty, service tax, VAT, entry tax, and more. Each state had different rules, creating compliance nightmares and tax cascading. A product crossing state borders might be taxed multiple times.

GST simplified this with the "One Nation, One Tax" principle. There are now four tax slabs - 5%, 12%, 18%, and 28% - based on the nature of goods and services. Essential items are taxed lower, while luxury goods attract higher rates.

The system has three components: CGST (Central), SGST (State), and IGST (for inter-state transactions). This ensures both central and state governments receive their share of revenue.

The GST portal (gst.gov.in) enables online registration, filing, and payment. While initial implementation faced challenges, the system has stabilized and become more user-friendly.

[Draft - need to add more sections on:
- Input Tax Credit mechanism
- Composition scheme for small businesses
- Recent amendments and rate changes
- Tips for compliance]`,
    published: false,
  },
  {
    title: "The Street Food Trail: From Delhi's Chandni Chowk to Mumbai's Khau Galli",
    content: `Indian street food is a universe unto itself - chaotic, colorful, and absolutely delicious. Every city has its specialty, every galli (lane) has its legend, and every bite tells a story.

Delhi's Chandni Chowk is street food heaven. The narrow lanes, dating back to the Mughal era, are lined with shops serving the same recipes for generations. Parathe Wali Gali offers over 30 varieties of stuffed parathas. Natraj's chaat has been serving dahi bhalla since 1940. And the jalebi at Old Famous Jalebi Wala is crispy perfection.

Mumbai's street food reflects its fast-paced life. Vada pav - the humble potato patty in bread - is the city's fuel. You'll find stalls at every corner, from VT station to Juhu beach. Pav bhaji at Sardar's in Tardeo is legendary, and the bhel puri at Chowpatty is unmissable.

Kolkata brings its own magic with phuchka (the Bengali version of gol gappa), kathi rolls from Nizam's, and the iconic mishti doi. The city's street food reflects both Bengali and Mughal influences.

Lucknow is the kebab capital. Tunday Kababi's melt-in-mouth galouti kebabs are made from a secret recipe. The seekh kebabs and biryani at Raheem's have drawn food lovers for over a century.

South India offers dosas in countless varieties - masala, ghee roast, rava, set dosa. Chennai's filter coffee and Hyderabad's haleem during Ramadan are cultural experiences.

Street food is democratic - it feeds the laborer and the businessman with equal warmth. It's where India's diversity is most delicious.`,
    published: true,
  },
];

async function main() {
  console.log("🌱 Starting seed...\n");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.otp.deleteMany();
  console.log("✅ Cleared existing data\n");

  // Create users
  console.log("👥 Creating users...");
  const createdUsers = [];
  for (const user of users) {
    const hashedPassword = hashPassword(user.password);
    const createdUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
      },
    });
    createdUsers.push(createdUser);
    console.log(`   ✅ Created user: ${user.name} (${user.email})`);
  }
  console.log(`\n✅ Created ${createdUsers.length} users\n`);

  // Create posts (distribute among users)
  console.log("📝 Creating posts...");
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const author = createdUsers[i % createdUsers.length]; // Distribute posts among users
    
    await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        authorId: author.id,
      },
    });
    console.log(`   ✅ Created post: "${post.title.substring(0, 50)}..." by ${author.name}`);
  }
  console.log(`\n✅ Created ${posts.length} posts\n`);

  console.log("🎉 Seed completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   - Users: ${createdUsers.length}`);
  console.log(`   - Posts: ${posts.length} (${posts.filter(p => p.published).length} published, ${posts.filter(p => !p.published).length} draft)`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

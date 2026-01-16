import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'public', 'db.json');

const blogData = {
  blogs: [
    {
      id: 1,
      title: "The Future of Fintech in 2024",
      category: "FINANCE",
      description: "Exploring how AI and blockchain are reshaping financial services and what it means for future...",
      content: `The intersection of finance and technology has never been more vibrant. As we look towards 2024, the role of the Chartered Accountant is evolving from mere bookkeeping to strategic financial analysis powered by AI.

## The Rise of Automated Accounting

Automation is no longer a buzzword, it's a reality. Routine tasks like data entry, reconciliation, and payroll processing are being automated at an unprecedented pace. This shift allows finance professionals to focus on high-value activities such as:

- Strategic financial planning and analysis (FP&A).
- Risk management and compliance auditing.
- Advisory services for business growth and sustainability.

## Blockchain: Beyond Cryptocurrency

While Bitcoin grabs the headlines, the underlying technology—blockchain—is quietly revolutionizing auditing. The immutable ledger provides a "single source of truth" that could potentially eliminate the need for sampling in audits, allowing for 100% verification of transactions.

## Preparing for the Shift

To stay relevant, CAs must upskill. Understanding Python for data analysis, mastering visualization tools like PowerBI, and getting comfortable with AI-driven ERP systems are now essential skills. The traditional syllabus provides the foundation, but continuous learning builds the career.`,
      readTime: "5 min read",
      date: "Oct 24, 2023",
      author: "Arjun Mehta",
      authorRole: "Senior Financial Analyst",
      image: "/placeholder.svg?height=400&width=600"
    },
    {
      id: 2,
      title: "Ace Your CA Finals",
      category: "CAREER",
      description: "Strategies and study plans to help you clear your exams in the first attempt without burning out...",
      content: `Preparing for CA Finals is one of the most challenging phases in your accounting career. But with the right strategy, you can ace it without burning out.

## Smart Study Planning

Create a structured study plan that covers all subjects systematically. Break down complex topics into smaller chunks and dedicate specific time slots for each.

## Study Tips

- Use active recall techniques instead of passive reading
- Practice previous year question papers regularly
- Join study groups to discuss difficult concepts
- Take care of your health during preparation`,
      readTime: "4 min read",
      date: "Oct 20, 2023",
      author: "Priya Sharma",
      authorRole: "CA & Educational Consultant",
      image: "/placeholder.svg?height=400&width=600"
    },
    {
      id: 3,
      title: "Understanding Tax Reforms",
      category: "REGULATIONS",
      description: "A comprehensive breakdown of the new tax laws introduced this fiscal year and their impact on...",
      content: `Tax regulations are constantly evolving, and staying updated is crucial for both practitioners and taxpayers.

## Key Changes in FY 2024

The recent tax reforms have introduced several significant changes that impact how businesses and individuals file their taxes.

## Impact on Businesses

Small businesses will see some relief through new deduction provisions, while large enterprises need to be aware of increased compliance requirements.`,
      readTime: "6 min read",
      date: "Oct 18, 2023",
      author: "Rajesh Kumar",
      authorRole: "Tax Specialist",
      image: "/placeholder.svg?height=400&width=600"
    },
    {
      id: 4,
      title: "Soft Skills for Auditors",
      category: "SKILLS",
      description: "Why technical knowledge isn't enough. Learn why communication and negotiation are critical in audits...",
      content: `In the modern audit environment, technical expertise alone isn't sufficient. Soft skills have become just as important as technical knowledge.

## Essential Soft Skills

1. Communication - Clear and concise reporting
2. Negotiation - Handling conflicts professionally
3. Emotional Intelligence - Understanding client needs
4. Leadership - Managing audit teams effectively`,
      readTime: "5 min read",
      date: "Oct 15, 2023",
      author: "Meera Patel",
      authorRole: "Audit Director",
      image: "/placeholder.svg?height=400&width=600"
    },
    {
      id: 5,
      title: "Audit Automation Tools",
      category: "TECHNOLOGY",
      description: "Exploring the latest automation tools that are transforming the audit landscape and increasing efficiency...",
      content: `Automation is revolutionizing the audit profession. Modern tools are enabling auditors to work smarter, not just harder.

## Popular Automation Tools

- AI-powered data analytics platforms
- Robotic Process Automation (RPA)
- Cloud-based collaboration tools
- Advanced visualization software

These tools help auditors focus on higher-value work like risk assessment and strategic recommendations.`,
      readTime: "7 min read",
      date: "Oct 12, 2023",
      author: "Vikram Singh",
      authorRole: "Technology Lead",
      image: "/placeholder.svg?height=400&width=600"
    }
  ]
};

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write the database file
fs.writeFileSync(dbPath, JSON.stringify(blogData, null, 2));
console.log('Database created at:', dbPath);

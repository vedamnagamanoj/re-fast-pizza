# 🍕 Re-Fast Pizza

A modern, full-stack pizza ordering application built with Next.js 15, React 18, Prisma ORM, and PostgreSQL. This project features a beautiful UI, real-time cart management, and a complete order workflow.

## ✨ Features

- **Browse Menu**: View available pizzas with images, ingredients, and prices
- **Cart Management**: Add/remove items, update quantities with real-time price calculations
- **User Management**: Create user profiles to personalize the ordering experience
- **Order Placement**: Complete checkout with address and priority delivery options
- **Order Tracking**: Track order status and estimated delivery time
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Database Integration**: PostgreSQL database with Prisma ORM for data persistence

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Icons**: Lucide React
- **Package Manager**: pnpm (or npm/yarn)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL** database (local or remote)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/re-fast-pizza.git
cd re-fast-pizza
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then update the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/fast_pizza?schema=public"
```

Replace `username`, `password`, and `localhost:5432` with your PostgreSQL credentials.

### 4. Set Up the Database

Generate Prisma Client:

```bash
pnpm prisma:generate
```

Run database migrations:

```bash
pnpm prisma:migrate
```

Seed the database with initial menu items:

```bash
pnpm prisma:seed
```

### 5. Run the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📂 Project Structure

```
re-fast-pizza/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── cart/              # Cart page
│   ├── menu/              # Menu page
│   ├── order/             # Order pages (new, tracking)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── cart/             # Cart-related components
│   ├── menu/             # Menu-related components
│   ├── order/            # Order-related components
│   ├── ui/               # Reusable UI components
│   └── user/             # User-related components
├── context/              # React Context providers
│   ├── CartContext.tsx   # Cart state management
│   └── UserContext.tsx   # User state management
├── actions/              # Server actions
├── lib/                  # Utility libraries and Prisma client
├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding script
├── services/             # Business logic services
├── types.ts              # TypeScript type definitions
└── utils/                # Utility functions
```

## 🗄️ Database Schema

The application uses three main models:

- **Item**: Pizza menu items with name, price, image, ingredients
- **Order**: Customer orders with status, delivery info, and pricing
- **CartItem**: Individual items in an order with quantity and pricing

## 📜 Available Scripts

### Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Database (Prisma)

- `pnpm prisma:generate` - Generate Prisma Client after schema changes
- `pnpm prisma:migrate` - Create and apply new database migrations
- `pnpm prisma:studio` - Open Prisma Studio (visual database browser)
- `pnpm prisma:seed` - Seed database with initial menu data
- `pnpm prisma:reset` - Reset database, re-run migrations, and seed

## 🎨 Key Features Explained

### Cart Management

The cart uses React Context (`CartContext`) to manage state across the application. Cart data persists in localStorage and syncs with the database during order placement.

### Order Workflow

1. User enters their name on the home page
2. Browses menu and adds items to cart
3. Reviews cart and proceeds to checkout
4. Enters delivery address and priority option
5. Order is created in the database
6. User can track order status with order ID

### Database Integration

Prisma ORM provides type-safe database access. The schema includes:
- Menu items with sold-out status
- Orders with status tracking
- Cart items linked to orders

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `prisma/schema.prisma` - Database schema
- `.prettierrc` - Code formatting rules

## 🌐 Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your `DATABASE_URL` environment variable
4. Deploy!

Make sure to run migrations on your production database:

```bash
npx prisma migrate deploy
```

### Other Platforms

For other platforms (Railway, Render, etc.):

1. Set up a PostgreSQL database
2. Add `DATABASE_URL` environment variable
3. Run build command: `pnpm build`
4. Run migrations: `pnpm prisma:migrate`
5. Seed database: `pnpm prisma:seed`
6. Start server: `pnpm start`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Prisma](https://www.prisma.io/)
- Icons from [Lucide React](https://lucide.dev/)

---

> [!NOTE]
> This project was built with the assistance of [Google Antigravity](https://deepmind.google/technologies/gemini/), an advanced AI coding assistant by Google DeepMind. 😉

**Happy Pizza Ordering! 🍕**

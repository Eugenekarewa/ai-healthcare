import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold text-center sm:text-left">
          Welcome to Your AI-Powered Healthcare Marketplace
        </h1>
        <p className="text-lg text-center sm:text-left mb-8">
          Access personalized health advice and manage your medical records securely on the blockchain.
        </p>

        <div className="feature-section text-center sm:text-left mb-8">
          <h2 className="text-xl font-semibold">AI-Powered Health Advice</h2>
          <p>
            Get personalized health advice powered by OpenAI, backed by secure decentralized data storage. 
            The AI assistant helps guide you through health-related questions and concerns.
          </p>
        </div>

        <div className="feature-section text-center sm:text-left mb-8">
          <h2 className="text-xl font-semibold">Decentralized Health Record Management</h2>
          <p>
            Your medical records are stored securely and privately using blockchain technology, ensuring full ownership and control over your health data.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://github.com/your-username/healthcare-marketplace"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/github.svg"
              alt="GitHub logo"
              width={20}
              height={20}
            />
            View Code
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/contact-icon.svg"
            alt="Contact icon"
            width={16}
            height={16}
          />
          Contact Us
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/terms-icon.svg"
            alt="Terms icon"
            width={16}
            height={16}
          />
          Terms and Conditions
        </a>
      </footer>
    </div>
  );
}

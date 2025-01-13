import Hero from '@/components/hero';
import { TwitterIcon, GithubIcon } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tingrader',
  description: `Tingrader is a modern grading and task management application with a user-friendly, minimalist design that facilitates seamless task submission, grading, and performance tracking. It is built with a mobile-first approach and designed for scalability.`,
};

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h1 className="font-medium text-xl mb-4">
          Welcome to our landing page!
        </h1>

        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-xl mb-4">Next steps</h2>
          <p>Here are some next steps to get you started:</p>
          <ul className="list-disc list-inside">
            <li>Create an account</li>
            <li>Invite some members</li>
            <li>Make some people mentors and graders</li>
            <li>Create some tasks</li>
            <li>Share the tasks with the inters</li>
            <li>Grade the tasks</li>
            <li>View the leaderboard</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-xl mb-4">features</h2>
          <p>Here are some features we have in store for you:</p>
          <ul className="list-disc list-inside">
            <li>Create and manage tasks</li>
            <li>Assign tasks to mentors and graders</li>
            <li>View the leaderboard</li>
            <li> Different and simple grading methods</li>
          </ul>
        </div>
      </main>
      <footer className="flex items-center justify-center gap-4 p-4">
        <div className="flex gap-2">
          <a
            href="https://twitter.com/bitsaac"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon size={24} />
          </a>
          <a href="https://github.com/bitsaac" target="_blank" rel="noreferrer">
            <GithubIcon size={24} />
          </a>
          <a href="https://discord.gg/bitsaac" target="_blank" rel="noreferrer">
            <GithubIcon size={24} />
          </a>
        </div>
        <div className="flex flex-col gap-2 items-center justify-between p-4">
          <p>Copyright © 2024 Bitsaac. All rights reserved.</p>
          <p>Made with ❤️ by Bitsaac</p>
        </div>
      </footer>
    </>
  );
}

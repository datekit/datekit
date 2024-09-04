"use client"

import { Calendar } from '@datekit/react';

export default function Home() {
  return (
    <main className="p-12 w-full h-full min-h-screen md:max-h-screen flex flex-col" suppressHydrationWarning>
      <Calendar defaultView="day" />
    </main>
  );
}

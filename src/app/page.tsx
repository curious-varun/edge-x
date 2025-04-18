"use client";

import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <main>
      <h1>Home Page</h1>
      {session ? (
        <p>✅ Logged in as {session.user?.email}</p>
      ) : (
        <p>❌ Not logged in</p>
      )}
    </main>
  );
}


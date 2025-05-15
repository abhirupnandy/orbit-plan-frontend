// src/components/LogoutButton.tsx
"use client";

export function LogoutButton() {
  return (
    <form action="/api/logout" method="POST">
      <button
        type="submit"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Logout
      </button>
    </form>
  );
}

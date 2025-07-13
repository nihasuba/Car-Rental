"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CarDetailsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to cars page since this should be a dynamic route
    router.push('/cars');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we redirect you to the cars page.</p>
      </div>
    </div>
  );
}
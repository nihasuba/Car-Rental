import { Suspense } from "react";
import CarsPage from "./CarsPage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading cars...</p>}>
      <CarsPage />
    </Suspense>
  );
}

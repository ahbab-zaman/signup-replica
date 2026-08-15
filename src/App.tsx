import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { Skeleton } from "@/components/ui/Skeleton";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const SuccessPage = lazy(() => import("@/pages/SuccessPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<RouteFallback />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<RouteFallback />}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "/terms",
    element: (
      <Suspense fallback={<RouteFallback />}>
        <TermsPage />
      </Suspense>
    ),
  },
  {
    path: "/success",
    element: (
      <Suspense fallback={<RouteFallback />}>
        <SuccessPage />
      </Suspense>
    ),
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<RouteFallback />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<RouteFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

function RouteFallback() {
  return (
    <div className="min-h-screen bg-background px-4 py-6 text-text-primary md:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[40vh] max-w-screen-xl items-center justify-center">
        <Skeleton className="h-64 w-full max-w-[30rem] rounded-xl" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

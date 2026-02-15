import Link from "next/link";

export const metadata = {
  title: "Not Found | Care.xyz",
};

const NotFound = () => {
  return (
    <div className="mx-auto max-w-4xl py-20 text-center">
      <div className="card p-10 space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-black/50">404</p>
        <h1 className="section-title text-4xl font-semibold">Page not found</h1>
        <p className="text-sm text-black/60">
          The page you are looking for does not exist. Try a service or head back home.
        </p>
        <Link href="/" className="btn btn-primary">
          Return home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  let errorStatus: number = 0;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
  }

  if (errorStatus === 404) {
    return (
      <section className="flex w-full h-screen flex-col items-center justify-center gap-2 px-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          404! Page not Found!
        </h1>
        <a
          href="/"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 z-10 mt-6"
        >
          Go Back
        </a>
      </section>
    );
  }

  return (
    <section className="flex w-full h-screen flex-col items-center justify-center gap-2 px-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Something's Wrong!
      </h1>
      <a
        href="/"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 z-10 mt-6"
      >
        Go Back
      </a>
    </section>
  );
};

export default Error;

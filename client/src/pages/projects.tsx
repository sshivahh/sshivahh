import Transition from "@/components/layouts/Transition";
import Head from "next/head";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects Page</title>
        <meta
          name="description"
          content="Explore our projects and initiatives."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-800 text-white">
          <h1 className="text-4xl font-bold mb-4">Projects Page</h1>
          <p className="text-lg text-gray-700">
            This is the projects page content.
          </p>
        </div>
    </>
  );
}

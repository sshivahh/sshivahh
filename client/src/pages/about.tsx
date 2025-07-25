import StickySection from "@/sections/about/sticky";
import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Page</title>
        <meta name="description" content="This is the about page of the application." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-[200vh] bg-neutral-800 text-white">
        <section className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">About Page</h1>
          <p className="text-lg text-gray-400">
            Scroll down to see the sticky element.
          </p>
        </section>

        <StickySection />
      </div>
    </>
  );
}

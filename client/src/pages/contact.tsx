import Transition from "@/components/layouts/Transition";
import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Page</title>
        <meta
          name="description"
          content="This is the contact page of the application."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Transition>
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-800 text-white">
          <h1 className="text-4xl font-bold mb-4">Contact Page</h1>
          <p className="text-lg text-gray-700">
            This is the contact page content.
          </p>
        </div>
      </Transition>
    </>
  );
}

export default function StickySection() {
  return (
    <div className="relative z-10 bg-neutral-600 text-white p-4 h-[400vh]">
      <h2 className="text-2xl font-bold mb-8">Sticky Section</h2>

      <div className="w-[80vw] relative mx-auto border-b-8 bg-blue-400 h-screen pt-96">
        <div className="sticky top-12 left-1/2 mt-[100px] bg-red-400 p-4 rounded-md">
          <p>I stick to the top when you scroll.</p>
        </div>

        <div className="mt-[200vh]"> {/* adds space to scroll */}
          <p>Keep scrolling...</p>
        </div>
      </div>
    </div>
  );
}

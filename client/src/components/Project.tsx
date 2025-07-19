type ProjectProps = {
  index: number;
  title: string;
  desc: string;
  setModal: (modal: { active: boolean; index: number }) => void;
};

export default function Project({
  index,
  title,
  desc,
  setModal,
}: ProjectProps) {
  return (
    <div
      className="w-full h-[180px] flex items-center justify-between cursor-pointer px-24 border-t-[1px] hover:opacity-40 transition-all duration-300 group"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <h2 className="text-5xl font-light group-hover:translate-x-[-40px] transition-all duration-300">
        {title}
      </h2>
      <p className="text-xl font-extralight group-hover:translate-x-[40px] transition-all duration-300 w-96 text-end">
        {desc}
      </p>
    </div>
  );
}

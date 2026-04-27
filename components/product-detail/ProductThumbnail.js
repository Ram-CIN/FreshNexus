export default function ProductThumbnail({ active, children }) {
  return (
    <div
      className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-md border bg-white p-2 ${
        active ? "border-lime-500 ring-1 ring-lime-500" : "border-slate-200"
      }`}
    >
      {children}
    </div>
  );
}

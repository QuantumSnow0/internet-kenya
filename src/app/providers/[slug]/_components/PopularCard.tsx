type PopularCardProps = {
  imageSrc: string;
  imageAlt: string;
};

export function PopularCard({ imageSrc, imageAlt }: PopularCardProps) {
  return (
    <div className="relative inline-block w-fit shrink-0 overflow-hidden rounded-2xl bg-transparent">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={imageAlt}
        width={260}
        height={180}
        className="block h-[250px] w-[180px] rounded-2xl object-stretch shadow-lg transition-shadow hover:shadow-xl"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl bg-linear-to-t from-black/50 to-transparent backdrop-blur-[2px]"
        aria-hidden
      />
    </div>
  );
}

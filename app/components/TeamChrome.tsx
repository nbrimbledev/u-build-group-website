import Image from "next/image";

export function TeamBanner() {
  return (
    <figure className="team-banner-frame">
      <Image
        src="/team/group.jpg"
        alt="The U Build Group team standing together in the Stony Mountain office"
        width={7205}
        height={2087}
        quality={90}
        priority
        sizes="(max-width: 700px) 94vw, 1180px"
      />
    </figure>
  );
}

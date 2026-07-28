import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={light ? "logo logo-light" : "logo"} href="/" aria-label="Waschbar Startseite">
      <Image
        className="logo-image"
        src={light ? "/images/waschbar-logo-dark-bg-v3.png" : "/images/waschbar-logo-light-bg-v2.png"}
        alt="Waschbar SB Waschsalon"
        width={light ? 1111 : 1173}
        height={light ? 408 : 378}
        priority={!light}
      />
    </Link>
  );
}

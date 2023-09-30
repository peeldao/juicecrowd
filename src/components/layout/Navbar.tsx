import { ConnectKitButton } from "@/components/ConnectKitButton";
import Link from "next/link";

export function Navbar() {
  return (
    <nav>
      <div className="flex justify-between items-center container py-3">
        <Link href="/" className="italic">
          Juicecrowd
        </Link>

        <ConnectKitButton />
      </div>
    </nav>
  );
}

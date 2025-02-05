"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  GamepadIcon,
  FilmIcon,
  MusicIcon,
  VideoIcon,
  Gamepad2Icon,
  DoorOpenIcon,
} from "lucide-react";

const navigation = [
  { name: "Movie Quiz", href: "/movie-quiz", icon: FilmIcon },
  { name: "Decipher Blitz", href: "/decipher-blitz", icon: GamepadIcon },
  { name: "Hack a Note", href: "/hack-a-note", icon: MusicIcon },
  { name: "Reelity Show", href: "/reelity-show", icon: VideoIcon },
  { name: "BGMI Battle", href: "/bgmi-battle", icon: Gamepad2Icon },
  { name: "Escape Room", href: "/escape-room", icon: DoorOpenIcon },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b-4 border-black dark:border-white bg-white dark:bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Glitchcraft
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-black text-white dark:bg-white dark:text-black transform -translate-y-1"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

import { Card } from "@/components/ui/card";
import {
  GamepadIcon,
  FilmIcon,
  MusicIcon,
  VideoIcon,
  Gamepad2Icon,
  DoorOpenIcon,
} from "lucide-react";
import Link from "next/link";

const events = [
  {
    name: "Movie Quiz",
    description: "Test your movie knowledge",
    href: "/movie-quiz",
    icon: FilmIcon,
    color: "bg-pink-500",
  },
  {
    name: "Decipher Blitz",
    description: "Crack the code",
    href: "/decipher-blitz",
    icon: GamepadIcon,
    color: "bg-blue-500",
  },
  {
    name: "Hack a Note",
    description: "Musical performance registration",
    href: "/hack-a-note",
    icon: MusicIcon,
    color: "bg-purple-500",
  },
  {
    name: "Reelity Show",
    description: "Show your content creation skills",
    href: "/reelity-show",
    icon: VideoIcon,
    color: "bg-green-500",
  },
  {
    name: "BGMI Battle",
    description: "Join the ultimate gaming showdown",
    href: "/bgmi-battle",
    icon: Gamepad2Icon,
    color: "bg-yellow-500",
  },
  {
    name: "Escape Room",
    description: "Can you escape in time?",
    href: "/escape-room",
    icon: DoorOpenIcon,
    color: "bg-red-500",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          Glitchcraft Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore and manage registrations for all events
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <Link key={event.name} href={event.href}>
              <Card className="p-6 cursor-pointer transform transition-all duration-200 hover:-translate-y-1 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255)]">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${event.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{event.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

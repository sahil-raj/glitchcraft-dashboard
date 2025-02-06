"use client";

import { useEffect, useState } from "react";
import {
  VideoIcon,
  UsersIcon,
  BuildingIcon,
  GraduationCapIcon,
  Share2Icon,
} from "lucide-react";
import { DataTable } from "@/components/data-table";
import { StatsCard } from "@/components/stats-card";
import { supabase } from "@/lib/supabase";

const columns = [
  { key: "Full_Name", label: "Full Name" },
  { key: "Email_ID", label: "Email" },
  { key: "Phone_Number", label: "Phone" },
  { key: "Department", label: "Department" },
  { key: "USN", label: "USN" },
  { key: "Year_of_Study", label: "Year" },
  { key: "Social_Media_Handle", label: "Social Media" },
];

export default function ReelityShowPage() {
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalParticipants: 0,
    uniqueDepartments: 0,
    averageYear: 0,
    socialPlatforms: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const { data: registrations, error } = await supabase
        .from("REELITY_SHOW")
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setData(registrations);

      const departments = new Set(registrations.map((r) => r.Department));
      const years = registrations.map((r) => Number(r.Year_of_Study));
      const avgYear = years.reduce((a, b) => a + b, 0) / years.length;
      const platforms = new Set(
        registrations.map((r) => {
          const handle = r.Social_Media_Handle || "";
          return handle.includes("@") ? handle.split("@")[1].split("/")[0] : "";
        })
      );

      setStats({
        totalParticipants: registrations.length,
        uniqueDepartments: departments.size,
        averageYear: Math.round(avgYear * 10) / 10,
        socialPlatforms: platforms.size,
      });
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black mb-4">Reelity Show Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage content creator registrations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Participants"
          value={stats.totalParticipants}
          icon={UsersIcon}
          color="bg-green-500"
        />
        <StatsCard
          title="Departments"
          value={stats.uniqueDepartments}
          icon={BuildingIcon}
          color="bg-blue-500"
        />
        <StatsCard
          title="Average Year"
          value={stats.averageYear}
          icon={GraduationCapIcon}
          color="bg-purple-500"
        />
        <StatsCard
          title="Social Platforms"
          value={stats.socialPlatforms}
          icon={Share2Icon}
          color="bg-pink-500"
        />
      </div>

      <DataTable data={data} columns={columns} />
    </div>
  );
}

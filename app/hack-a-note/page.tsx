"use client";

import { useEffect, useState } from "react";
import {
  MusicIcon,
  UsersIcon,
  BuildingIcon,
  GraduationCapIcon,
  ClockIcon,
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
  { key: "Type_of_Performance", label: "Performance Type" },
  { key: "Instrument_Name", label: "Instrument" },
  { key: "Genre_of_Music", label: "Genre" },
  { key: "Performance_Duration", label: "Duration (mins)" },
];

export default function HackANotePage() {
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalParticipants: 0,
    uniqueDepartments: 0,
    averageYear: 0,
    totalDuration: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const { data: registrations, error } = await supabase
        .from("HACK_A_NOTE")
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setData(registrations);

      const departments = new Set(registrations.map((r) => r.department));
      const years = registrations.map((r) => Number(r.year_of_study));
      const avgYear = years.reduce((a, b) => a + b, 0) / years.length;
      const totalDuration = registrations.reduce(
        (sum, r) => sum + (r.performance_duration || 0),
        0
      );

      setStats({
        totalParticipants: registrations.length,
        uniqueDepartments: departments.size,
        averageYear: Math.round(avgYear * 10) / 10,
        totalDuration,
      });
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black mb-4">Hack a Note Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage musical performance registrations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Participants"
          value={stats.totalParticipants}
          icon={UsersIcon}
          color="bg-purple-500"
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
          color="bg-green-500"
        />
        <StatsCard
          title="Total Duration"
          value={`${stats.totalDuration} mins`}
          icon={ClockIcon}
          color="bg-red-500"
        />
      </div>

      <DataTable data={data} columns={columns} />
    </div>
  );
}

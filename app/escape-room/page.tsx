"use client";

import { useEffect, useState } from "react";
import {
  DoorOpenIcon,
  UsersIcon,
  BuildingIcon,
  GraduationCapIcon,
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
  { key: "Team_Name", label: "Team Name" },
];

export default function EscapeRoomPage() {
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalParticipants: 0,
    uniqueDepartments: 0,
    averageYear: 0,
    totalTeams: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const { data: registrations, error } = await supabase
        .from("ESCAPE_ROOM")
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setData(registrations);

      const departments = new Set(registrations.map((r) => r.Department));
      const years = registrations.map((r) => Number(r.Year_of_Study));
      const avgYear = years.reduce((a, b) => a + b, 0) / years.length;
      const teams = new Set(registrations.map((r) => r.Team_Name));

      setStats({
        totalParticipants: registrations.length,
        uniqueDepartments: departments.size,
        averageYear: Math.round(avgYear * 10) / 10,
        totalTeams: teams.size,
      });
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black mb-4">Escape Room Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage Escape Room registrations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Participants"
          value={stats.totalParticipants}
          icon={UsersIcon}
          color="bg-red-500"
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
          title="Total Teams"
          value={stats.totalTeams}
          icon={DoorOpenIcon}
          color="bg-green-500"
        />
      </div>

      <DataTable data={data} columns={columns} />
    </div>
  );
}

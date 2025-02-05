"use client";

import { useEffect, useState } from "react";
import {
  Gamepad2Icon,
  UsersIcon,
  BuildingIcon,
  GraduationCapIcon,
  UsersIcon as TeamIcon,
} from "lucide-react";
import { DataTable } from "@/components/data-table";
import { StatsCard } from "@/components/stats-card";
import { supabase } from "@/lib/supabase";

const columns = [
  { key: "full_name", label: "Full Name" },
  { key: "email_id", label: "Email" },
  { key: "phone_number", label: "Phone" },
  { key: "department", label: "Department" },
  { key: "usn", label: "USN" },
  { key: "year_of_study", label: "Year" },
  { key: "entry_type", label: "Entry Type" },
  { key: "player_ign", label: "Player IGN" },
  { key: "bgmi_player_id", label: "BGMI ID" },
  { key: "team_name", label: "Team Name" },
  { key: "team_leader_ign", label: "Team Leader IGN" },
];

export default function BGMIBattlePage() {
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
        .from("bgmi_battle")
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setData(registrations);

      const departments = new Set(registrations.map((r) => r.department));
      const years = registrations.map((r) => Number(r.year_of_study));
      const avgYear = years.reduce((a, b) => a + b, 0) / years.length;
      const teams = new Set(registrations.map((r) => r.team_name));

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
        <h1 className="text-4xl font-black mb-4">BGMI Battle Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage BGMI tournament registrations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Participants"
          value={stats.totalParticipants}
          icon={UsersIcon}
          color="bg-yellow-500"
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
          icon={TeamIcon}
          color="bg-green-500"
        />
      </div>

      <DataTable data={data} columns={columns} />
    </div>
  );
}

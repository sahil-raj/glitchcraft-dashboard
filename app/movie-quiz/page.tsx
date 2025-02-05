'use client';

import { useEffect, useState } from 'react';
import { FilmIcon, UsersIcon, BuildingIcon, GraduationCapIcon } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { StatsCard } from '@/components/stats-card';
import { supabase } from '@/lib/supabase';

const columns = [
  { key: 'full_name', label: 'Full Name' },
  { key: 'email_id', label: 'Email' },
  { key: 'phone_number', label: 'Phone' },
  { key: 'department', label: 'Department' },
  { key: 'usn', label: 'USN' },
  { key: 'year_of_study', label: 'Year' },
  { key: 'team_name', label: 'Team Name' },
];

export default function MovieQuizPage() {
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
        .from('movie_quiz')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      setData(registrations);

      // Calculate stats
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
        <h1 className="text-4xl font-black mb-4">Movie Quiz Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage Movie Quiz registrations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Participants"
          value={stats.totalParticipants}
          icon={UsersIcon}
          color="bg-pink-500"
        />
        <StatsCard
          title="Departments"
          value={stats.uniqueDepartments}
          icon={BuildingIcon}
          color="bg-purple-500"
        />
        <StatsCard
          title="Average Year"
          value={stats.averageYear}
          icon={GraduationCapIcon}
          color="bg-blue-500"
        />
        <StatsCard
          title="Total Teams"
          value={stats.totalTeams}
          icon={FilmIcon}
          color="bg-green-500"
        />
      </div>

      <DataTable data={data} columns={columns} />
    </div>
  );
}
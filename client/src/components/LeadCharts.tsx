import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import type { Lead } from "../types/Lead";

type Props = {
  leads: Lead[];
};

function LeadCharts({
  leads,
}: Props) {

  // STATUS DATA
  const statusData = [

    {
      name: "New",
      value: leads.filter(
        (lead) =>
          lead.status === "New"
      ).length,
    },

    {
      name: "Contacted",
      value: leads.filter(
        (lead) =>
          lead.status ===
          "Contacted"
      ).length,
    },

    {
      name: "Qualified",
      value: leads.filter(
        (lead) =>
          lead.status ===
          "Qualified"
      ).length,
    },

    {
      name: "Lost",
      value: leads.filter(
        (lead) =>
          lead.status === "Lost"
      ).length,
    },

  ];

  // SOURCE DATA
  const sourceData = [

    {
      source: "Website",
      leads: leads.filter(
        (lead) =>
          lead.source ===
          "Website"
      ).length,
    },

    {
      source: "Instagram",
      leads: leads.filter(
        (lead) =>
          lead.source ===
          "Instagram"
      ).length,
    },

    {
      source: "Referral",
      leads: leads.filter(
        (lead) =>
          lead.source ===
          "Referral"
      ).length,
    },

  ];

  // PIE COLORS
  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
  ];

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

      {/* PIE CHART */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-white mb-6">
          Lead Status Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >

              {statusData.map(
                (_, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index %
                        COLORS.length]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* BAR CHART */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-white mb-6">
          Lead Sources
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={sourceData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="source"
            />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="leads"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default LeadCharts;
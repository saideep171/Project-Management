import { useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]; 
const teams = ["IVN", "CYS", "ECS", "H/W"]; 

const sampleOIL = [
  { id: 1, team: "IVN", month: "Jan", status: "Open" },
  { id: 2, team: "IVN", month: "Jan", status: "Closed" },
  { id: 3, team: "CYS", month: "Feb", status: "Open" },
  { id: 4, team: "ECS", month: "Mar", status: "Closed" },
];

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [selectedTeam, setSelectedTeam] = useState("IVN");

  const filteredOIL = sampleOIL.filter(
    (x) => x.month === selectedMonth && x.team === selectedTeam
  );

  const chartData = [
    { name: "Open", value: filteredOIL.filter((x) => x.status === "Open").length },
    { name: "Closed", value: filteredOIL.filter((x) => x.status === "Closed").length },
  ];

  return (
    <div className="p-6 grid grid-cols-3 gap-4 min-h-screen bg-gray-100">
      <div className="col-span-2 space-y-6">
        <h1 className="text-3xl font-bold">Project: VICTORIS Program</h1>

        <div className="flex gap-2">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={\`px-4 py-2 rounded-xl text-white \${selectedMonth === m ? "bg-blue-600" : "bg-blue-400"}\`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold">Project Timeline</h2>
          <p className="text-gray-500">(Integrate Gantt Chart here)</p>
        </div>

        <div className="flex gap-3">
          {teams.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTeam(t)}
              className={\`px-5 py-2 rounded-xl text-white \${selectedTeam === t ? "bg-green-600" : "bg-green-400"}\`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-white p-4 rounded-2xl shadow space-y-4">
          <h2 className="text-xl font-bold">{selectedTeam} Team Details</h2>
          <p className="text-gray-500">(Add specs, requirements, released, OIL, testing here)</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">OIL Status</h2>
        <PieChart width={350} height={350}>
          <Pie dataKey="value" data={chartData} cx="50%" cy="50%" outerRadius={120} label>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={index === 0 ? "#ff4d4d" : "#4caf50"} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

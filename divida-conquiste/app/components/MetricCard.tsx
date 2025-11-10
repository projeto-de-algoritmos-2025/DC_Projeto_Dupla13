export default function MetricCard({ title, value}: { title: string; value: string}) {
  return (
    <div className="rounded-xl p-6 bg-white shadow flex flex-col">
      <span className="text-sm text-gray-500">{title}</span>
      <strong className="text-3xl">{value}</strong>
    </div>
  );
}


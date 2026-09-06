export default function ProgressBar({ step }) {
  const percent = (step / 3) * 100;

  return (
    <div className="w-full bg-gray-200 h-2 rounded">
      <div
        className="bg-blue-600 h-2 rounded transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
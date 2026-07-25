import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { Booking } from '@/types/database.types';

interface Bucket {
  duration: string;
  value: number;
  color: string;
}

const STARTING_BUCKETS: Bucket[] = [
  { duration: '1 night', value: 0, color: '#e2bb6b' },
  { duration: '2 nights', value: 0, color: '#d9a648' },
  { duration: '3 nights', value: 0, color: '#3fb89e' },
  { duration: '4–5 nights', value: 0, color: '#249c85' },
  { duration: '6–7 nights', value: 0, color: '#56b0e6' },
  { duration: '8–14 nights', value: 0, color: '#8a7ff0' },
  { duration: '15–21 nights', value: 0, color: '#c084fc' },
  { duration: '21+ nights', value: 0, color: '#e879a6' },
];

function bucketFor(nights: number): string {
  if (nights === 1) return '1 night';
  if (nights === 2) return '2 nights';
  if (nights === 3) return '3 nights';
  if (nights <= 5) return '4–5 nights';
  if (nights <= 7) return '6–7 nights';
  if (nights <= 14) return '8–14 nights';
  if (nights <= 21) return '15–21 nights';
  return '21+ nights';
}

function prepareData(stays: Booking[]): Bucket[] {
  return STARTING_BUCKETS.map((b) => ({
    ...b,
    value: stays.filter((s) => bucketFor(s.num_nights) === b.duration).length,
  })).filter((b) => b.value > 0);
}

export function DurationChart({ confirmedStays }: { confirmedStays: Booking[] }) {
  const data = prepareData(confirmedStays);
  const total = data.reduce((acc, b) => acc + b.value, 0);

  return (
    <div className="glass flex flex-col p-5 sm:p-6">
      <h2 className="mb-1 text-lg font-semibold text-content">Stay duration</h2>
      <p className="mb-4 text-sm text-content-muted">How long guests linger</p>

      {total === 0 ? (
        <div className="flex flex-1 items-center justify-center py-10 text-sm text-content-muted">
          No confirmed stays in this range yet.
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center gap-4 sm:flex-row">
          <div className="relative h-[200px] w-[200px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="duration"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={2}
                  stroke="none"
                >
                  {data.map((entry) => (
                    <Cell key={entry.duration} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgb(30 34 43 / 0.92)',
                    border: '1px solid rgb(148 163 184 / 0.15)',
                    borderRadius: '12px',
                    color: '#eef0f5',
                    fontSize: '13px',
                  }}
                  formatter={(value: number, name) => [`${value} stays`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-semibold text-content">{total}</span>
              <span className="text-[11px] uppercase tracking-wider text-content-muted">stays</span>
            </div>
          </div>

          <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
            {data.map((b) => (
              <li key={b.duration} className="flex items-center gap-2.5 text-sm">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: b.color }} />
                <span className="text-content-soft">{b.duration}</span>
                <span className="ml-auto font-medium text-content-muted">{b.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { eachDayOfInterval, format, isSameDay, parseISO, subDays } from 'date-fns';
import { formatCompactCurrency, formatCurrency } from '@/utils/helpers';

interface SalesChartProps {
  bookings: { created_at: string; total_price: number; extras_price: number }[];
  numDays: number;
}

export function SalesChart({ bookings, numDays }: SalesChartProps) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    const dayBookings = bookings.filter((b) => isSameDay(parseISO(b.created_at), date));
    return {
      label: format(date, 'MMM d'),
      revenue: dayBookings.reduce((acc, b) => acc + b.total_price, 0),
      extras: dayBookings.reduce((acc, b) => acc + b.extras_price, 0),
    };
  });

  const tickInterval = numDays <= 7 ? 0 : numDays <= 30 ? 3 : 9;

  return (
    <div className="glass p-5 sm:p-6">
      <div className="mb-5 flex items-baseline justify-between">
        <div>
          <h2 className="text-lg font-semibold text-content">Revenue</h2>
          <p className="text-sm text-content-muted">
            {format(allDates.at(0)!, 'MMM d')} — {format(allDates.at(-1)!, 'MMM d, yyyy')}
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 6, right: 6, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d9a648" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#d9a648" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillExtras" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3fb89e" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3fb89e" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.12)" vertical={false} />
          <XAxis
            dataKey="label"
            interval={tickInterval}
            tick={{ fill: '#9aa6b5', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis
            tick={{ fill: '#9aa6b5', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={64}
            tickFormatter={(v) => formatCompactCurrency(Number(v))}
          />
          <Tooltip
            cursor={{ stroke: 'rgb(148 163 184 / 0.25)' }}
            contentStyle={{
              background: 'rgb(30 34 43 / 0.92)',
              border: '1px solid rgb(148 163 184 / 0.15)',
              borderRadius: '12px',
              backdropFilter: 'blur(8px)',
              color: '#eef0f5',
              fontSize: '13px',
            }}
            labelStyle={{ color: '#9aa6b5', marginBottom: 4 }}
            formatter={(value: number, name) => [
              formatCurrency(value),
              name === 'revenue' ? 'Total revenue' : 'Breakfast extras',
            ]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#e2bb6b"
            strokeWidth={2}
            fill="url(#fillRevenue)"
          />
          <Area
            type="monotone"
            dataKey="extras"
            stroke="#3fb89e"
            strokeWidth={2}
            fill="url(#fillExtras)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

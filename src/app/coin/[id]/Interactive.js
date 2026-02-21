'use client';

import { useStore } from '../../store';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Interactive({ id, chartData }) {
  // Memanggil ingatan Zustand
  const { favorites, toggleFavorite } = useStore();
  const isFav = favorites.includes(id);

  return (
    <div className="mt-8 w-full">
      <button 
        onClick={() => toggleFavorite(id)}
        className={`mb-6 px-4 py-2 rounded font-bold transition flex items-center gap-2 ${isFav ? 'bg-yellow-500 text-yellow-950' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
      >
        {isFav ? '⭐ Hapus dari Favorit' : '☆ Tambah ke Favorit'}
      </button>

      <div className="h-64 w-full bg-slate-950 p-4 rounded-lg border border-slate-800">
        <h3 className="text-gray-400 mb-4 text-sm font-bold">Grafik Harga 7 Hari Terakhir</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="time" hide />
            <YAxis domain={['auto', 'auto']} hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '8px' }}
              formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, 'Harga']}
              labelFormatter={() => ''}
            />
            <Line type="monotone" dataKey="harga" stroke="#3b82f6" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
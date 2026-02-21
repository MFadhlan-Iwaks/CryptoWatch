'use client'; 

import { useState } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const handleSearch = async (e) => {
    e.preventDefault(); 
    if (!query) return;

    setLoading(true);
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
      const data = await res.json();
      setResult(data.coins || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-white mb-8 inline-block transition">
          &larr; Kembali ke Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-6 text-blue-500">Pencarian Koin</h1>
        
        <form onSubmit={handleSearch} className="flex gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Ketik nama koin (contoh: bitcoin)..." 
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white placeholder-gray-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Mencari...' : 'Cari'}
          </button>
        </form>

        {loading && <p className="text-center text-yellow-400 animate-pulse">Sedang mencari data...</p>}

        <div className="space-y-4">
          {result.length === 0 && !loading && (
            <div className="text-center py-10 border border-dashed border-slate-800 rounded-lg text-gray-600">
              Belum ada hasil pencarian.
            </div>
          )}

          {result.map((coin) => (
            <Link key={coin.id} href={`/coin/${coin.id}`} className="block">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center gap-4 hover:border-blue-500 hover:bg-slate-800 transition cursor-pointer">
                  <img src={coin.thumb} alt={coin.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="font-bold text-white">{coin.name}</h3>
                    <span className="text-xs bg-slate-700 px-2 py-0.5 rounded text-gray-300">Rank #{coin.market_cap_rank}</span>
                  </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
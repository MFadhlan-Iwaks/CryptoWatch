import Link from 'next/link';
import Interactive from './Interactive'; 

async function getCoinDetail(id) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function getCoinChart(id) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=idr&days=7`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function CoinDetail({ params }) {
  const resolvedParams = await params;
  
  const [coin, chartRaw] = await Promise.all([
    getCoinDetail(resolvedParams.id),
    getCoinChart(resolvedParams.id)
  ]);

  if (!coin) return <div className="text-white text-center mt-20">Data tidak ditemukan</div>;

  const formattedChart = chartRaw?.prices?.map(item => ({
    time: new Date(item[0]).toLocaleDateString('id-ID'),
    harga: item[1]
  })) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        <Link href="/" className="text-gray-400 hover:text-white mb-6 inline-block transition">
          &larr; Kembali ke Home
        </Link>

        <div className="flex items-center gap-6 mb-8">
          <img src={coin.image.large} alt={coin.name} className="w-24 h-24" />
          <div>
            <h1 className="text-4xl font-bold">{coin.name}</h1>
            <span className="bg-slate-800 text-gray-300 px-3 py-1 rounded text-sm font-mono mt-2 inline-block">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <p className="text-gray-500 text-sm">Harga Saat Ini</p>
            <p className="text-2xl font-bold text-green-400 font-mono">
              Rp {coin.market_data.current_price.idr.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
             <p className="text-gray-500 text-sm">Rank Pasar</p>
             <p className="text-2xl font-bold text-white">#{coin.market_cap_rank}</p>
          </div>
        </div>

        <Interactive id={coin.id} chartData={formattedChart} />

      </div>
    </div>
  );
}
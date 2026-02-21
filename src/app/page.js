import Link from 'next/link';

async function getCoins() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&order=market_cap_desc&per_page=10&page=1&sparkline=false'
  );
  if (!res.ok) {
    throw new Error('Gagal mengambil data');
  }
  return res.json();
}

export default async function Home() {
  const coins = await getCoins();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-2">CryptoWatch</h1>
        <p className="text-gray-400">Monitoring Harga Kripto</p>
        <div className="mt-6">
           <Link href="/search" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition inline-block">
             🔍 Cari Koin
           </Link>
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {coins.map((coin) => (
          <Link href={`/coin/${coin.id}`} key={coin.id} className="block group">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-green-500 transition shadow-lg cursor-pointer">
              <img src={coin.image} alt={coin.name} className="w-12 h-12" />
              <div className="flex-1">
                <h2 className="text-lg font-bold group-hover:text-green-400">{coin.name}</h2>
                <p className="text-sm text-gray-500">{coin.symbol.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-green-400">Rp {coin.current_price.toLocaleString('id-ID')}</p>
                <span className={`text-xs ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.price_change_percentage_24h?.toFixed(2) || "0.00"}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <footer className="text-center text-gray-600 mt-10 text-sm">
        <p>CyptoWatch <b>@2026</b>.</p>
      </footer>
    </main>
  );
}
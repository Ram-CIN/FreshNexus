import { regionalDemand } from "@/components/market/marketData";

export default function RegionalTable() {
  return (
    <section
      aria-labelledby="regional-demand-title"
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 id="regional-demand-title" className="text-lg font-bold text-slate-950">
        Regional demand
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[460px] text-left text-sm">
          <caption className="sr-only">
            Grocery demand by region with order volume and demand share.
          </caption>
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="py-3 pr-4 font-semibold">Region</th>
              <th scope="col" className="py-3 pr-4 font-semibold">Orders</th>
              <th scope="col" className="py-3 font-semibold">Demand share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {regionalDemand.map((item) => (
              <tr key={item.region}>
                <th scope="row" className="py-4 pr-4 font-semibold text-slate-800">
                  {item.region}
                </th>
                <td className="py-4 pr-4 text-slate-600">{item.orders}</td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-slate-700"
                        style={{ width: `${item.share}%` }}
                      />
                    </div>
                    <span className="w-10 text-right font-semibold text-slate-700">
                      {item.share}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

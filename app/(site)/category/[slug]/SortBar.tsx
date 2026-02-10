"use client";

interface Props {
  sort: string;
  onSortChange: (value: string) => void;
}

export default function SortBar({ sort, onSortChange }: Props) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-gray-600 font-medium">Sắp xếp theo:</span>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className={`
          bg-white border border-gray-200 
          px-4 py-2 rounded-lg text-gray-700
          focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-gray-400
          hover:border-gray-400 transition-all cursor-pointer
          appearance-none pr-10
          bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>')] 
          bg-no-repeat bg-[right_0.75rem_center]
        `}
      >
        <option value="best-selling">Bán chạy nhất</option>
        <option value="price-asc">Giá thấp → cao</option>
        <option value="price-desc">Giá cao → thấp</option>
        <option value="newest">Mới nhất</option>
      </select>
    </div>
  );
}

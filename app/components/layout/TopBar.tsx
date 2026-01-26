export default function TopBar() {
  return (
    <div className="bg-[#d4af37] text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between">
        <span>Thương hiệu nước hoa được feedback nhiều nhất Việt Nam</span>
        <span className="flex items-center gap-2">
          Theo dõi đơn hàng
          <span className="bg-white text-[#d4af37] text-xs font-bold px-2 py-0.5 rounded-full">
            5
          </span>
        </span>
      </div>
    </div>
  );
}

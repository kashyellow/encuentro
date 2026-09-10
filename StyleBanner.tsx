'use client'
export default function StyleBanner({ count, onOpen }: { count: number, onOpen: () => void }) {
  // EASY TO EDIT: Change this text for the black pill
  const brandName = "~Mamasota~"
  return (
    <div className="mx-4 mb-3">
      <button
        onClick={onOpen}
        className="w-full bg-[#0f172a] text-white rounded-full px-5 py-3.5 flex items-center justify-between shadow-lg hover:bg-black transition"
      >
        <div className="text-left">
          <div className="text-[15px] font-semibold flex items-center gap-2">
            <span>✨</span> Style & Essentials by: <span className="font-serif italic font-normal">{brandName}</span>
          </div>
          <div className="text-[11px] tracking-[0.15em] opacity-70 mt-0.5">
            TAP TO SHOP TOP PICKS • {count} ESSENTIALS
          </div>
        </div>
        <div className="bg-white text-black w-9 h-9 rounded-full flex items-center justify-center text-lg">↗</div>
      </button>
    </div>
  )
}

interface SeatSelectorProps {
  totalSeats: number
  bookedSeats: number[]
  selectedSeats: number[]
  onToggleSeat: (seat: number) => void
  fare: number
}

const SeatSelector = ({
  totalSeats,
  bookedSeats,
  selectedSeats,
  onToggleSeat,
  fare,
}: SeatSelectorProps) => {
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1)

  const getSeatState = (seat: number) => {
    if (bookedSeats.includes(seat)) return "booked"
    if (selectedSeats.includes(seat)) return "selected"
    return "available"
  }

  const seatStyles: Record<string, string> = {
    booked:
      "bg-red-100 border-red-200 text-red-400 cursor-not-allowed opacity-60",
    selected:
      "bg-green-600 border-green-700 text-white shadow-lg scale-105",
    available:
      "bg-white/80 border-green-100 text-green-900 hover:bg-green-50 hover:border-green-300 cursor-pointer hover:scale-105",
  }

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-5 mb-5 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-white/80 border border-green-100" />
          <span className="text-gray-500">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-green-600" />
          <span className="text-gray-500">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-red-100 border border-red-200" />
          <span className="text-gray-500">Booked</span>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
        {seats.map((seat) => {
          const state = getSeatState(seat)
          return (
            <button
              key={seat}
              disabled={state === "booked"}
              onClick={() => onToggleSeat(seat)}
              className={`
                rounded-xl border p-2 text-xs font-bold transition-all duration-150
                ${seatStyles[state]}
              `}
            >
              {seat}
            </button>
          )
        })}
      </div>

      {/* Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-5 rounded-2xl bg-green-50 border border-green-100 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Seats: <span className="font-bold text-green-800">{selectedSeats.sort((a, b) => a - b).join(", ")}</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{selectedSeats.length} seat(s) × Rs {fare}</p>
          </div>
          <p className="text-2xl font-black text-green-700">
            Rs {selectedSeats.length * fare}
          </p>
        </div>
      )}
    </div>
  )
}

export default SeatSelector

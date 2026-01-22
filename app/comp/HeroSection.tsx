export default function Hero() {
  return (
    <section
      className="
        w-full
        h-[75vh] md:h-[80vh] lg:h-[85vh]
        bg-cover bg-center
        flex flex-col justify-center items-center text-center
        px-4
      "
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80)",
      }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-white">
        Rent a car in Los Angeles
      </h1>

      <p className="text-gray-200 mt-3 max-w-xl">
        Book directly from local suppliers. No commission. No mark-up.
      </p>

      <div className="mt-8 bg-white rounded-2xl shadow-xl p-4 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3">
        <input placeholder="Pickup location" className="border p-2 rounded" />
        <input placeholder="Pickup date" className="border p-2 rounded" />
        <input placeholder="Return date" className="border p-2 rounded" />
        <button className="bg-red-500 text-white rounded px-4 py-2">
          Search
        </button>
      </div>
    </section>
  );
}

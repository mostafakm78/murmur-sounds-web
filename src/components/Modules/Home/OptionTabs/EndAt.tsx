export default function EndAt() {
  return (
    <div className="xl:w-2/3 w-full flex justify-around items-center">
      <input type="number" id="hour" className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" />
      <label htmlFor="hour" className="md:text-lg font-medium">
        ساعت و
      </label>
      <input type="number" id="min" className="md:p-2 p-1 w-16 rounded bg-black/10 outline-none focus:outline-none text-foreground text-lg no-spinner" />
      <label htmlFor="min" className="md:text-lg font-medium">
        دقیقه
      </label>
    </div>
  );
}

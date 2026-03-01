export default function Booking() {
  return (
    <section id="booking" className="py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto text-center mb-4">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          Boka tid
        </h2>
      </div>

      <div className="max-w-5xl mx-auto">
        <iframe
          src="https://koalendar.com/e/66494-koa?embed=true"
          className="w-full h-[800px] rounded-2xl  border-0"
          loading="lazy"
          title="Boka tid"
        />
      </div>
    </section>
  );
}
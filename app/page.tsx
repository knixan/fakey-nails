import Navbar from './components/navbar';
import Hero from './components/hero';
import ServiceCards from './components/servicecards';
import PriceCards from './components/pricecards';
import Contact from './components/contact';
import Footer from './components/footer';
import Booking from './components/booking';

export default function Page() {
  return (
    <>
      <Navbar />

      {/* Navbar är fixed, så vi lägger padding-top */}
      <main className="pt-20">
        <Hero />
        <ServiceCards />
        <PriceCards />
        <Booking />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

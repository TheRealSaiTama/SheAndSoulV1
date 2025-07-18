import { useState, useEffect } from "react";
import { Instagram, Twitter, Linkedin } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Index() {
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 30,
    hours: 24,
    minutes: 60,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    // Handle email submission here
  };

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-she-soul-gradient flex flex-col items-center justify-center px-4 py-8">
      {/* Main Logo */}
      <div className="text-center mb-8">
        <h1 className="font-playfair text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-normal text-center leading-none">
          <span
            className="text-white"
            style={{ textShadow: "0px 4px 6.6px rgba(0, 0, 0, 0.25)" }}
          >
            She
          </span>
          <span
            className="text-black"
            style={{ textShadow: "0px 4px 6.6px rgba(0, 0, 0, 0.25)" }}
          >
            &
          </span>
          <span
            className="text-white"
            style={{ textShadow: "0px 4px 6.6px rgba(0, 0, 0, 0.25)" }}
          >
            Soul
          </span>
        </h1>
        <p className="font-playfair text-lg sm:text-xl lg:text-2xl text-black mt-2 sm:mt-4">
          Women's Health Platform
        </p>
      </div>

      {/* Tagline */}
      <div className="text-center mb-12">
        <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal">
          <span className="text-black">Your Wellness Journey </span>
          <span className="text-white">Begins Soon</span>
        </h2>
      </div>

      {/* Countdown Timer */}
      <div className="mb-16">
        {/* Labels */}
        <div className="flex gap-4 sm:gap-8 lg:gap-16 mb-4">
          <div className="w-20 sm:w-24 lg:w-28 text-center">
            <span className="font-playfair text-lg sm:text-xl lg:text-2xl font-semibold text-black">
              Days
            </span>
          </div>
          <div className="w-20 sm:w-24 lg:w-28 text-center">
            <span className="font-playfair text-lg sm:text-xl lg:text-2xl font-semibold text-black">
              Hours
            </span>
          </div>
          <div className="w-20 sm:w-24 lg:w-28 text-center">
            <span className="font-playfair text-lg sm:text-xl lg:text-2xl font-semibold text-black">
              Minutes
            </span>
          </div>
          <div className="w-20 sm:w-24 lg:w-28 text-center">
            <span className="font-playfair text-lg sm:text-xl lg:text-2xl font-semibold text-black">
              Seconds
            </span>
          </div>
        </div>

        {/* Timer Cards */}
        <div className="flex gap-4 sm:gap-8 lg:gap-16">
          {/* Days */}
          <div className="flex gap-1 sm:gap-2">
            <div className="w-10 sm:w-12 lg:w-16 h-16 sm:h-20 lg:h-24 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-6xl font-poppins font-medium bg-countdown-text bg-clip-text text-transparent">
                {Math.floor(timeLeft.days / 10)}
              </span>
            </div>
            <div className="w-10 sm:w-12 lg:w-16 h-16 sm:h-20 lg:h-24 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-6xl font-poppins font-medium bg-countdown-text bg-clip-text text-transparent">
                {timeLeft.days % 10}
              </span>
            </div>
          </div>

          {/* Hours */}
          <div className="flex gap-1 sm:gap-2">
            <div className="w-10 sm:w-12 lg:w-16 h-16 sm:h-20 lg:h-24 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-6xl font-poppins font-medium bg-countdown-text bg-clip-text text-transparent">
                {Math.floor(timeLeft.hours / 10)}
              </span>
            </div>
            <div className="w-10 sm:w-12 lg:w-16 h-16 sm:h-20 lg:h-24 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-6xl font-poppins font-medium bg-countdown-text bg-clip-text text-transparent">
                {timeLeft.hours % 10}
              </span>
            </div>
          </div>

          {/* Minutes */}
          <div className="flex gap-1 sm:gap-2">
            <div className="w-10 sm:w-12 lg:w-16 h-16 sm:h-20 lg:h-24 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-6xl font-poppins font-medium bg-countdown-text bg-clip-text text-transparent">
                {Math.floor(timeLeft.minutes / 10)}
              </span>
            </div>
            <div className="w-10 sm:w-12 lg:w-16 h-16 sm:h-20 lg:h-24 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-6xl font-poppins font-medium bg-countdown-text bg-clip-text text-transparent">
                {timeLeft.minutes % 10}
              </span>
            </div>
          </div>

          {/* Seconds */}
          <div className="flex gap-1 sm:gap-2">
            <div className="w-10 sm:w-12 lg:w-16 h-16 sm:h-20 lg:h-24 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-6xl font-poppins font-medium bg-countdown-text bg-clip-text text-transparent">
                {Math.floor(timeLeft.seconds / 10)}
              </span>
            </div>
            <div className="w-10 sm:w-12 lg:w-16 h-16 sm:h-20 lg:h-24 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-6xl font-poppins font-medium bg-countdown-text bg-clip-text text-transparent">
                {timeLeft.seconds % 10}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Section */}
      <div className="w-full max-w-4xl bg-white/40 backdrop-blur-md border-2 border-she-soul-purple-border rounded-2xl p-8 mb-8">
        <h3 className="font-poly text-2xl sm:text-3xl lg:text-4xl text-black text-center mb-4">
          Join Our Waitlist
        </h3>
        <p className="font-playfair text-sm sm:text-base text-black text-center mb-8 max-w-2xl mx-auto">
          Be the first to experience the She & Soul app — wellness, self-care,
          and empowerment in one space
        </p>

        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 rounded-lg border border-white bg-white shadow-lg font-poppins text-black placeholder-black/50"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-button-gradient text-white font-poppins rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Join Waitlist
          </button>
        </form>
      </div>

      {/* Refer a Friend Button */}
      <button className="bg-white border border-white rounded-lg px-8 py-3 mb-8 shadow-lg hover:shadow-xl transition-shadow">
        <span className="font-poppins text-xl font-bold bg-refer-gradient bg-clip-text text-transparent">
          Refer a Friend
        </span>
      </button>

      {/* Social Media Icons */}
      <div className="flex gap-4">
        <a
          href="#"
          className="text-white hover:text-she-soul-purple-light transition-colors"
        >
          <Instagram size={32} />
        </a>
        <a
          href="#"
          className="text-white hover:text-she-soul-purple-light transition-colors"
        >
          <Twitter size={32} />
        </a>
        <a
          href="#"
          className="text-white hover:text-she-soul-purple-light transition-colors"
        >
          <Linkedin size={32} />
        </a>
      </div>
    </div>
  );
}

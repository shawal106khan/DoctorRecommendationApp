import { Search, UserCheck, Calendar, Stethoscope } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search Doctor",
    desc: "Find doctors based on specialization.",
  },
  {
    icon: UserCheck,
    title: "Check Profile",
    desc: "View doctor details and experience.",
  },
  {
    icon: Calendar,
    title: "Book Appointment",
    desc: "Schedule appointment easily.",
  },
  {
    icon: Stethoscope,
    title: "Get Treatment",
    desc: "Consult and get solution.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 sm:py-16 bg-white font-serif px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          How It Works
        </h2>
        <p className="text-gray-500 mt-2">4 Steps to get your solution</p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mt-10 sm:mt-14">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="text-blue-600" />
                </div>

                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

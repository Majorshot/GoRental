import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
// eslint-disable-next-line
import { motion } from "motion/react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Arjun Nair",
      location: "Kochi, Kerala",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
      testimonial:
        "GoRental made my family trip to Munnar so comfortable. The car was spotless and the booking process was super easy!",
    },
    {
      name: "Meera Menon",
      location: "Thiruvananthapuram, Kerala",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      testimonial:
        "I booked a car for my wedding in Trivandrum. The service was prompt and the car was in excellent condition. Highly recommended!",
    },
    {
      name: "Rahul Krishnan",
      location: "Kozhikode, Kerala",
      image: "https://randomuser.me/api/portraits/men/43.jpg",
      testimonial:
        "Best car rental experience in Kerala! Affordable rates and friendly support. Will use GoRental again for sure.",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="star-icon" />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;

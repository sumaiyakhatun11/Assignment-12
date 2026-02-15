export const services = [
  {
    id: "baby-care",
    name: "Baby Care",
    tagline: "Certified sitters for joyful early years.",
    description:
      "Warm, attentive care for infants and toddlers with play-based routines, feeding support, and daily updates.",
    rate: { hour: 350, day: 2200 },
    coverage: "Newborn to 5 years",
    highlights: [
      "Background-checked caregivers",
      "Routine tracking and updates",
      "Emergency-ready care",
    ],
  },
  {
    id: "elderly-care",
    name: "Elderly Care",
    tagline: "Dignified support for aging loved ones.",
    description:
      "Compassionate assistance with medication reminders, mobility, meal prep, and companionship.",
    rate: { hour: 420, day: 2800 },
    coverage: "Senior care and companionship",
    highlights: [
      "Medication and safety checks",
      "Daily wellness routine",
      "Trusted caregiver matching",
    ],
  },
  {
    id: "special-care",
    name: "Special Care",
    tagline: "Skilled help for recovery and special needs.",
    description:
      "Support for post-surgery recovery and special care needs with calm, trained professionals.",
    rate: { hour: 500, day: 3300 },
    coverage: "Post-surgery and special care",
    highlights: [
      "Care plan alignment",
      "Comfort-focused routines",
      "Coordination with family",
    ],
  },
];

export const getServiceById = (id) => services.find((service) => service.id === id);

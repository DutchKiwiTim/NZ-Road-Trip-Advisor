const transportOptions = [
    {
      name: "Cafe Racer",
      type: "bike",
      thumb: 'img/transport/motorbike-on-road.jpg',
      images: ['img/transport/motorbike-on-road-full.jpg'],
      alt: 'Motorbike',
      price: 109, // per day
      minPeople: 1,
      maxPeople: 1,
      minDays: 1,
      maxDays: 7, // changed from the data in the brief for demo purposes
      fuelConsumption: 3.7, // Liter per 100Km
      fuelType: 'Petrol',
      fuelPrice: 2.35,
      insurance: 14, // per day
    },
    {
      name: "Trabant",
      type: "car",
      thumb: 'img/transport/car-in-snow.jpg',
      images: ['img/transport/car-in-snow-full.jpg'],
      alt: 'Car',
      price: 129, // per day
      minPeople: 1,
      maxPeople: 2,
      minDays: 1,
      maxDays: 10,
      fuelConsumption: 8.5,
      fuelType: 'Petrol',
      fuelPrice: 2.35,
      insurance: 22, // per day
    },
    {
      name: "Mercedes",
      type: "suv",
      thumb: 'img/transport/suv-merc.jpg',
      images: ['img/transport/suv-merc-full.jpg'],
      alt: 'SUV',
      price: 144, // per day
      minPeople: 1,
      maxPeople: 5,
      minDays: 3,
      maxDays: 10,
      fuelConsumption: 9.7, // Liter per 100Km
      fuelType: 'Diesel',
      fuelPrice: 1.55,
      insurance: 34, // per day
    },
    {
      name: "VW Camper",
      type: "motorhome",
      thumb: 'img/transport/vw-camper.jpg',
      images: ['img/transport/vw-camper-full.jpg'],
      alt: 'Campervan',
      price: 200, // per day
      minPeople: 2,
      maxPeople: 6,
      minDays: 2,
      maxDays: 32,
      fuelConsumption: 17, // Liter per 100Km
      fuelType: 'Diesel',
      fuelPrice: 1.55,
      insurance: 38, // per day
    }
  ];
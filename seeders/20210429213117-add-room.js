'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Rooms", [
      {
        name: "Discovery Kartika Plaza Hotel",
        rating: 3,
        total_occupancy: 2,
        total_bedrooms: 1,
        total_bathroom: 1,
        summary: "Terletak di taman tepi pantai selulas 8 hektar, hotel mewah ini berada di samping Discovery Shopping Mall dan berjarak 4 menit berjalan kaki dari taman rekreasi air Waterbom Bali.",
        address: "Jl. Kartika Plaza,",
        has_air_con: false,
        has_internet: true,
        price: 500000,
        location: JSON.stringify({
          "city": "Bali",
          "state": "Kuta Selatan",
          "country": "Indonesia",
          "latitude": -8.728917,
          "longitude": 115.165843,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Makan malam prasmanan",
          4: "Room service",
          5: "Sarapan",
          6: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
          3: "Penyewaan mobil di tempat"
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
          3: "Sauna"
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Grand Zuri Kuta",
        rating: 4,
        total_occupancy: 3,
        total_bedrooms: 2,
        total_bathroom: 2,
        summary: "Terletak di sebuah bangunan kontemporer menawan, hotel santai ini berjarak 1 km dari toko-toko di Jalan Legian, dan 3 km dari Pantai Legian yang ramai dan taman rekreasi air Waterbom Bali.",
        address: "Jl. Raya Kuta No.81, Kuta",
        has_air_con: true,
        has_internet: true,
        price: 600000,
        location: JSON.stringify({
          "city": "Bali",
          "state": "Kuta,",
          "country": "Indonesia",
          "latitude": -8.711672,
          "longitude": 115.181459,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: "Room service",
          3: "Sarapan",
          4: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
          3: "Sauna"
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mercure Bali Legian",
        rating: 5,
        total_occupancy: 4,
        total_bedrooms: 3,
        total_bathroom: 3,
        summary: "Di tengah pertokoan dan hiburan malam yang ramai di Jalan Legian, hotel kelas atas ini berjarak 15 menit berjalan kaki dari Pantai Legian yang ramai dan 6 km dari Bandara Internasional Ngurah Rai.",
        address: "Jl. Raya Legian No.328",
        has_air_con: false,
        has_internet: true,
        price: 700000,
        location: JSON.stringify({
          "city": "Bali",
          "state": "Kuta",
          "country": "Indonesia",
          "latitude": -8.708063,
          "longitude": 115.172366,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Room service",
          4: "Sarapan",
          5: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap",
          3: "Concierge",
          4: "Elevator",
          5: "Layanan membangunkan"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
          3: "Parkir valet",
          4: "Parkir mandiri"
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
          3: "Pijat"
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Alaya Resort Ubud",
        rating: 3,
        total_occupancy: 2,
        total_bedrooms: 1,
        total_bathroom: 1,
        summary: "Jl. Hanoman, Ubud",
        address: "Jl. Kartika Plaza,",
        has_air_con: true,
        has_internet: true,
        price: 600000,
        location: JSON.stringify({
          "city": "Bali",
          "state": "Ubud",
          "country": "Indonesia",
          "latitude": -8.518693,
          "longitude": 115.263535,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Room service",
          4: "Sarapan",
          5: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bali Bohemia",
        rating: 4,
        total_occupancy: 3,
        total_bedrooms: 2,
        total_bathroom: 2,
        summary: "Hotel unik dan berseni di sebelah Hutan Monyet Ubud ini berjarak 10 km dari Air Terjun Tegenungan dan 36 km dari Bandara Internasional Ngurah Rai.",
        address: "Nyuh Kuning, Jl. Nyuh Bojog",
        has_air_con: false,
        has_internet: true,
        price: 700000,
        location: JSON.stringify({
          "city": "Bali",
          "state": "Ubud",
          "country": "Indonesia",
          "latitude": -8.519532,
          "longitude": 115.257905,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Room service",
          4: "Sarapan",
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
        }),
        healthy: JSON.stringify({
          1: "Kolam renang"
        }),
        accessibility: false,
        pets_allowed: true,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Komaneka at Bisma",
        rating: 5,
        total_occupancy: 4,
        total_bedrooms: 3,
        total_bathroom: 3,
        summary: "Resor yang tenang ini terletak di hutan hujan tropis di lembah Sungai Campuhan, dan berjarak 15 menit berjalan kaki dari Mandala Wisata Wenara Wana.",
        address: "Jl. Bisma, Ubud,",
        has_air_con: true,
        has_internet: true,
        price: 800000,
        location: JSON.stringify({
          "city": "Bali",
          "state": "Ubud",
          "country": "Indonesia",
          "latitude": -8.512553,
          "longitude": 115.258296,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Room service",
          4: "Sarapan",
          5: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
          3: "Antar-jemput lokasi"
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
        }),
        accessibility: false,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Puri Mas Beach Resort",
        rating: 3,
        total_occupancy: 2,
        total_bedrooms: 1,
        total_bathroom: 1,
        summary: "Diterjemahkan dari bahasa Inggris - Dibangun menyerupai desa tradisional Indonesia, resor tepi pantai yang apik ini berjarak 2,4 km dari Senggigi dan 17 km dari Mataram.",
        address: "Jl. Raya Senggigi",
        has_air_con: false,
        has_internet: true,
        price: 700000,
        location: JSON.stringify({
          "city": "Nusa Tenggara Barat",
          "state": "Senggigi",
          "country": "Indonesia",
          "latitude": -8.481187,
          "longitude": 116.037971,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          4: "Room service",
          5: "Sarapan",
          6: "Pesan tempat makan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap",
          3: "Penyimpanan bagasi",
          4: "Concierge",
          5: "Kurs mata uang",
          6: "Layanan Membangunkan",
          7: "Tata graha",
          8: "Layanan turndown"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
          3: "Layanan mobil pribadi"
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Treadmill",
          3: "Mesin beban",
          4: "Angkat beban",
          5: "Pijat"
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kila Senggigi Beach Lombok",
        rating: 4,
        total_occupancy: 3,
        total_bedrooms: 2,
        total_bathroom: 2,
        summary: "Terletak di taman tropis seluas 12 hektar di samping pantai Sengigi, resor santai yang terdiri dari bungalo dan properti bertingkat 2 ini berjarak 2,1 km dari Pura Batu Bolong.",
        address: "Jalan Pantai Senggigi,",
        has_air_con: true,
        has_internet: true,
        price: 800000,
        location: JSON.stringify({
          "city": "Nusa Tenggara Barat",
          "state": "Senggigi",
          "country": "Indonesia",
          "latitude": -0.902399,
          "longitude": 119.871569,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Room service",
          4: "Sarapan",
          5: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
        }),
        healthy: JSON.stringify({
          1: "Spa",
        }),
        accessibility: false,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Golden Palace Hotel Lombok",
        rating: 5,
        total_occupancy: 4,
        total_bedrooms: 3,
        total_bathroom: 3,
        summary: "Hotel modern ini berjarak 2 km dari Pura Meru, tempat beribadah umat Hindu, 5 km dari pameran kebudayaan di Museum Negeri Nusa Tenggara Barat, dan 11 km dari Taman Narmada.",
        address: "Jl. Sriwijaya No.38",
        has_air_con: false,
        has_internet: true,
        price: 900000,
        location: JSON.stringify({
          "city": "Mataram",
          "state": "Sapta Marga",
          "country": "Indonesia",
          "latitude": -8.594573,
          "longitude": 116.122073,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          4: "Room service",
          5: "Sarapan",
          6: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pullman Jakarta Indonesia Thamrin CBD",
        rating: 3,
        total_occupancy: 2,
        total_bedrooms: 1,
        total_bathroom: 1,
        summary: "Hotel bisnis elegan di kawasan finansial Thamrin ini berjarak 13 menit berjalan kaki dari stasiun kereta Sudirman dan 2,3 km dari Monumen Nasional.",
        address: "Jl. M.H. Thamrin No.59",
        has_air_con: false,
        has_internet: true,
        price: 800000,
        location: JSON.stringify({
          "city": "Jakarta",
          "state": "Jakarta Pusat",
          "country": "Indonesia",
          "latitude": -6.19313,
          "longitude": 106.823758,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Room service",
          4: "Sarapan",
          5: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap",
          3: "Concierge",
          4: "Elevator",
          5: "Layanan membangunkan"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
          3: "Penyewaan mobil di tempat"
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
          3: "Sauna",
          4: "Pijat"
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hotel Mulia",
        rating: 4,
        total_occupancy: 3,
        total_bedrooms: 2,
        total_bathroom: 2,
        summary: "Hotel mewah bertingkat tinggi ini berjarak 5 menit berjalan kaki dari Lapangan Golf Senayan dan 1,4 km dari Jakarta Convention Center.",
        address: "Jl. Asia Afrika No.6, RT.1/RW.3",
        has_air_con: true,
        has_internet: true,
        price: 900000,
        location: JSON.stringify({
          "city": "Jakarta",
          "state": "Jakarta Pusat",
          "country": "Indonesia",
          "latitude": -6.222888,
          "longitude": 106.79829,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Makan malam prasmanan",
          4: "Room service",
          5: "Sarapan",
          6: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
          3: "Penyewaan mobil di tempat"
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hotel Borobudur Jakarta",
        rating: 5,
        total_occupancy: 4,
        total_bedrooms: 3,
        total_bathroom: 3,
        summary: "Jl. Lap. Banteng Selatan No.1, Ps. Baru",
        address: "Jl. Kartika Plaza,",
        has_air_con: false,
        has_internet: true,
        price: 1000000,
        location: JSON.stringify({
          "city": "Jakarta",
          "state": "Jakarta Pusat",
          "country": "Indonesia",
          "latitude": -6.172094,
          "longitude": 106.835183,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Makan malam prasmanan",
          4: "Room service",
          5: "Sarapan",
          6: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
          3: "Penyewaan mobil di tempat"
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
          3: "Salon Rambut"
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Grand Inna Malioboro",
        rating: 3,
        total_occupancy: 2,
        total_bedrooms: 1,
        total_bathroom: 1,
        summary: "Hotel megah ini berjarak 2 km dari istana Keraton Ngayogyakarta Hadiningrat abad ke-18, 5 km dari lokasi perbelanjaan di Ambarrukmo Plaza, dan 15 menit berjalan kaki dari Museum Benteng Vredeburg, bekas benteng kolonial.",
        address: "Jl. Malioboro No.60",
        has_air_con: true,
        has_internet: true,
        price: 900000,
        location: JSON.stringify({
          "city": "Yogyakarta",
          "state": "Danurejan",
          "country": "Indonesia",
          "latitude": -7.790774,
          "longitude": 110.366951,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: "Bar",
          3: "Room service",
          4: "Sarapan",
          5: "Sarapan prasmanan",
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap",
          3: "Penyimpanan bagasi",
          4: "Concierge",
          5: "Mini Market",
          6: "Kurs mata uang",
          7: "Penatu swalayan",
          8: "Elevator",
          9: "Toko suvenir",
          10: "Tata graha"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa"
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Swiss-Belboutique Yogyakarta",
        rating: 4,
        total_occupancy: 3,
        total_bedrooms: 2,
        total_bathroom: 2,
        summary: "Hotel kontemporer ini berada di jalan raya yang rindang di dekat kafe dan tempat makan, serta berjarak 2 km dari pusat perbelanjaan mewah di Jalan Malioboro dan 8 km dari Bandara Internasional Adisutjipto.",
        address: "Jl. Jend. Sudirman No.69",
        has_air_con: false,
        has_internet: true,
        price: 1000000,
        location: JSON.stringify({
          "city": "Yogyakarta",
          "state": "Gondokusuman",
          "country": "Indonesia",
          "latitude": -7.782608,
          "longitude": 110.374238,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Room service",
          4: "Sarapan",
          5: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hotel Tentrem Yogyakarta",
        rating: 5,
        total_occupancy: 4,
        total_bedrooms: 3,
        total_bathroom: 3,
        summary: "Hotel mewah yang dikelilingi pertokoan dan restoran ini berjarak 2,9 km dari pasar di Jalan Malioboro yang ramai, dan 5 km dari kompleks istana Keraton Ngayogyakarta Hadiningrat.",
        address: "Jl. P. Mangkubumi No.72A",
        has_air_con: true,
        has_internet: true,
        price: 1100000,
        location: JSON.stringify({
          "city": "Yogyakarta",
          "state": "Jetis",
          "country": "Indonesia",
          "latitude": -7.773815,
          "longitude": 110.368478,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Makan malam prasmanan",
          4: "Room service",
          5: "Sarapan",
          6: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
          3: "Penyewaan mobil di tempat"
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Discovery Kartika Plaza Hotel 2",
        rating: 3,
        total_occupancy: 1,
        total_bedrooms: 1,
        total_bathroom: 1,
        summary: "Terletak di taman tepi pantai selulas 8 hektar, hotel mewah ini berada di samping Discovery Shopping Mall dan berjarak 4 menit berjalan kaki dari taman rekreasi air Waterbom Bali.",
        address: "Jl. Kartika Plaza,",
        has_air_con: false,
        has_internet: true,
        price: 1000000,
        location: JSON.stringify({
          "city": "Bali",
          "state": "Kuta Selatan",
          "country": "Indonesia",
          "latitude": -8.728917,
          "longitude": 115.165843,
        }),
        foodandbeverage: JSON.stringify({
          1: "Restoran",
          2: 'Bar',
          3: "Makan malam prasmanan",
          4: "Room service",
          5: "Sarapan",
          6: "Sarapan prasmanan"
        }),
        service: JSON.stringify({
          1: "Resepsionist 24jam",
          2: "Penatu layanan lengkap"
        }),
        parkandtransport: JSON.stringify({
          1: "Tempat parkir",
          2: "Jemputan bandara",
          3: "Penyewaan mobil di tempat"
        }),
        healthy: JSON.stringify({
          1: "Gym",
          2: "Spa",
          3: "Sauna"
        }),
        accessibility: true,
        pets_allowed: false,
        cancelation_policy: "this is cancelation policy 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Rooms", null, {});
    
  }
};

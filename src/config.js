export const birthdayConfig = {
  // Ucapan Akhir yang akan tampil di halaman /wishes
  wishesText: "Happy level up ke 25 sayang! May the Force be with you, selalu. Semoga tahun ini penuh dengan petualangan seru kayak Finn & Jake. I love you to the moon and back!",

  // Pop up kado clue
  giftClue: "Coba cek di bawah meja kerjamu, ada sesuatu yang nungguin dari tadi!",

  // Stage 1: Quiz (Bisa ditambah/dikurangi sesuai kebutuhan)
  quizQuestions: [
    {
      question: "Siapa karakter Star Wars favoritku?",
      options: ["Luke Skywalker", "Darth Vader", "Han Solo", "Yoda"],
      correctAnswer: 1, // Index dari options (0 = Luke, 1 = Darth Vader, dst)
    },
    {
      question: "Apa warna lightsaber Mace Windu?",
      options: ["Merah", "Biru", "Hijau", "Ungu"],
      correctAnswer: 3,
    },
    {
      question: "Nama anjing peliharaan di Adventure Time adalah?",
      options: ["BMO", "Jake", "Gunther", "Ice King"],
      correctAnswer: 1,
    }
  ],

  // Stage 2: Riddle
  riddle: {
    question: "Aku tidak bernapas, namun bisa berlari. Aku tidak punya mata, namun bisa melihat ke masa lalu. Apa aku? (Petunjuk: Barang Antik)",
    correctAnswer: "Jam", // Jawaban dibuat tidak case-sensitive di dalam kodenya nanti
  },

  // Stage 4: Puzzle Password
  puzzlePassword: {
    clue: "Masukkan kombinasi angka ulang tahunmu (DDMMYYYY)", // Contoh: 14061998
    correctAnswer: "04062001", // Tanggal lahir Jordan: 4 Juni 2001
  },

  // Konfigurasi tambahan untuk puzzle gambar
  imagePuzzle: {
    gridSize: 5, // 5x5 grid (25 keping) agar lebih rumit
    imageName: "Main", // Gambar utama yang akan digunakan untuk puzzle (dari folder media)
  }
};

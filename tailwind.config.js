/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-image":
          "url('https://live.staticflickr.com/65535/53875160409_87b0d72b9c_h.jpg')",
      },
    },
  },
  plugins: [],
};

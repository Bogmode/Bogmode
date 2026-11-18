export default function manifest() {
  return {
    name: "БОГMODE — vision through the build",
    short_name: "БОГMODE",
    description: "Bogdan Tkachuk's studio: SWARM, Worlds, Lab, Tools and Ventures.",
    start_url: "/",
    display: "standalone",
    background_color: "#131317",
    theme_color: "#131317",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

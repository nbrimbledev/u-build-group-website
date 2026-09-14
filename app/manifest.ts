import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "U Build Group",
    short_name: "U Build Group",
    description: "Specialized construction and development teams serving Manitoba.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fb",
    theme_color: "#0f1e46",
    icons: [
      {
        src: "/brand/ubuild-group-mark.png",
        sizes: "1000x1000",
        type: "image/png",
      },
    ],
  };
}

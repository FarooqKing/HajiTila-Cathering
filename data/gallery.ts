export type GalleryCategory = "Catering" | "Tent Setup" | "Weddings" | "Seating" | "Events";

export interface GalleryItem {
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Aspect ratio as width / height, used by the masonry layout. */
  ratio: number;
  /**
   * Set to true for real Haji Tila photographs. While false, the image is
   * labelled as an illustration so it is never mistaken for actual work.
   */
  isOwnWork: boolean;
}

export const galleryCategories: ("All" | GalleryCategory)[] = ["All", "Catering", "Tent Setup", "Weddings", "Seating", "Events"];

/**
 * Add real event photos to /public/images/gallery/ and list them here.
 * Until at least one photo is listed, the site shows a "Request photos on WhatsApp" panel.
 *
 * Example:
 *   { src: "/images/gallery/gallery-01.webp", alt: "Marquee setup for a wedding in Hayatabad", category: "Tent Setup", ratio: 4 / 5, isOwnWork: true },
 */
export const gallery: GalleryItem[] = [];

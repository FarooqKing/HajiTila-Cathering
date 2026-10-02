export interface Testimonial {
  name: string;
  /** e.g. "Wedding, Hayatabad" */
  event?: string;
  quote: string;
  /** Link to the original review (Google, Facebook) if available. */
  source?: string;
}

/**
 * Add ONLY genuine client feedback here, with permission.
 * While the list is empty the site shows a neutral message instead.
 */
export const testimonials: Testimonial[] = [];

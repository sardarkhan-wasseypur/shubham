import { generatedGalleryItems } from "./gallery.generated";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string; // required
  caption?: string; // optional
  category?: string; // optional
  date?: string; // optional
  width: number;
  height: number;
  blurDataURL?: string;
  verified: boolean;
  featured?: boolean; // optional
  homeOrder?: number; // optional
  focus?: string; // CSS object-position, e.g. "50% 25%" so faces are never cropped
}

// User-defined gallery entries.
// Only items with verified === true and a non-empty alt are rendered.
export const galleryItems: GalleryItem[] = [
  {
    id: "court-complex-mural",
    src: "/images/gallery/shubham-singh-court-complex-mural.jpeg",
    alt: "Advocate Shubham Singh in advocate robes before the architectural mural at court complex",
    caption: "Court appearance before the High Court complex",
    category: "Court Engagements",
    verified: true,
    featured: true,
    homeOrder: 1,
    focus: "50% 20%",
    width: 0,
    height: 0,
  },
  {
    id: "anurag-thakur-felicitation",
    src: "/images/gallery/shubham-singh-anurag-thakur.jpeg",
    alt: "Advocate Shubham Singh presenting a floral bouquet to Union Minister Anurag Thakur",
    caption: "Felicitation and dialogue with Union Minister Anurag Thakur",
    category: "Dignitaries & Addresses",
    verified: true,
    featured: true,
    homeOrder: 2,
    focus: "50% 30%",
    width: 0,
    height: 0,
  },
  {
    id: "law-minister-kiren-rijiju",
    src: "/images/gallery/shubham-singh-law-minister-kiren-rijiju.jpeg",
    alt: "Advocate Shubham Singh meeting with Union Law Minister Kiren Rijiju upon government empanelment",
    caption: "Empanelment delegation meeting with then Union Law Minister Kiren Rijiju",
    category: "Dignitaries & Addresses",
    verified: true,
    featured: true,
    homeOrder: 3,
    focus: "50% 35%",
    width: 0,
    height: 0,
  },
  {
    id: "district-sessions-court",
    src: "/images/gallery/shubham-singh-district-sessions-court.jpeg",
    alt: "Advocate Shubham Singh at District & Sessions Court complex holding case brief",
    caption: "Trial appearance at District & Sessions Court",
    category: "Court Engagements",
    verified: true,
    featured: true,
    homeOrder: 4,
    focus: "50% 25%",
    width: 0,
    height: 0,
  },
  {
    id: "advocate-library-portrait",
    src: "/images/gallery/shubham-singh-advocate-library-portrait.jpeg",
    alt: "Advocate Shubham Singh in court dress seated before chamber law library",
    caption: "Chamber consultation and legal research session, New Delhi",
    category: "Court Engagements",
    verified: true,
    featured: true,
    homeOrder: 5,
    focus: "50% 25%",
    width: 0,
    height: 0,
  },
  {
    id: "manoj-tiwari-forum",
    src: "/images/gallery/shubham-singh-manoj-tiwari.jpeg",
    alt: "Advocate Shubham Singh in discussion with Member of Parliament Manoj Tiwari at a public forum",
    caption: "Interaction with Member of Parliament Manoj Tiwari during community forum",
    category: "Dignitaries & Addresses",
    verified: true,
    width: 0,
    height: 0,
  },
  {
    id: "alipore-sessions-court",
    src: "/images/gallery/shubham-singh-alipore-sessions-court.jpeg",
    alt: "Advocate Shubham Singh standing before the entrance of District Civil & Sessions Court, Alipore",
    caption: "Trial proceedings at District Civil & Sessions Court, Alipore",
    category: "Court Engagements",
    verified: true,
    width: 0,
    height: 0,
  },
  {
    id: "robes-portrait",
    src: "/images/gallery/shubham-singh-robes-portrait.jpeg",
    alt: "Advocate Shubham Singh formal chamber portrait in advocate gown and neck band",
    caption: "Official chamber portrait in advocate court dress",
    category: "Court Engagements",
    verified: true,
    width: 0,
    height: 0,
  },
  {
    id: "chambers-workstation",
    src: "/images/gallery/shubham-singh-chambers-workstation.jpeg",
    alt: "Advocate Shubham Singh and legal associate researching case law in chambers library",
    caption: "Case brief preparation and strategy deliberation in Chambers",
    category: "Chambers & Consultations",
    verified: true,
    width: 0,
    height: 0,
  },
  {
    id: "associates-briefing",
    src: "/images/gallery/shubham-singh-associates-briefing.jpeg",
    alt: "Advocate Shubham Singh seated at chamber desk conducting case briefing with associates",
    caption: "Chamber briefing with research associates on active trial matters",
    category: "Chambers & Consultations",
    verified: true,
    width: 0,
    height: 0,
  },
  {
    id: "criminal-procedure-book",
    src: "/images/gallery/shubham-singh-criminal-procedure-book.jpeg",
    alt: "Advocate Shubham Singh and co-counsel presenting Code of Criminal Procedure treatise in law library",
    caption: "Statutory review and study of criminal procedure jurisprudence",
    category: "Chambers & Consultations",
    verified: true,
    width: 0,
    height: 0,
  },
  {
    id: "seth-law-books",
    src: "/images/gallery/shubham-singh-seth-law-books.jpeg",
    alt: "Advocate Shubham Singh in court dress outside Seth & Co. Law Book Sellers",
    caption: "Research and literature review outside legal publications archive, Delhi",
    category: "Chambers & Consultations",
    verified: true,
    width: 0,
    height: 0,
  },
  {
    id: "chambers-festive",
    src: "/images/gallery/shubham-singh-chambers-festive.jpeg",
    alt: "Advocate Shubham Singh at his chambers workstation decorated for Diwali",
    caption: "Annual festive celebration in Chambers, New Delhi",
    category: "Chambers & Consultations",
    verified: true,
    width: 0,
    height: 0,
  },
  {
    id: "chambers-celebration",
    src: "/images/gallery/shubham-singh-chambers-celebration.jpeg",
    alt: "Advocate Shubham Singh celebrating institutional milestone with chamber colleagues",
    caption: "Chamber colleagues celebrating professional milestone and success",
    category: "Chambers & Consultations",
    verified: true,
    width: 0,
    height: 0,
  },
  {
    id: "chambers-colleague",
    src: "/images/gallery/shubham-singh-chambers-colleague.jpeg",
    alt: "Advocate Shubham Singh with chamber colleague at office conference desk",
    caption: "Professional milestone commemoration with colleagues",
    category: "Chambers & Consultations",
    verified: true,
    width: 0,
    height: 0,
  },
  {
    id: "bar-cricket-tournament",
    src: "/images/gallery/shubham-singh-bar-cricket-tournament.jpeg",
    alt: "Advocate Shubham Singh bowling in the Bar Association Cricket Tournament",
    caption: "Supreme Court Bar Association Cricket Tournament match at Ground 2A",
    category: "Bar & Community",
    verified: true,
    width: 0,
    height: 0,
  },
];

/**
 * Returns only verified gallery items with non-empty alt text.
 * Prefers items generated by npm run gallery:prepare with accurate dimensions,
 * falling back to galleryItems.
 */
export function getVerifiedGalleryItems(): GalleryItem[] {
  const source = generatedGalleryItems.length > 0 ? generatedGalleryItems : galleryItems;
  return source.filter(
    (item) =>
      item.verified === true &&
      typeof item.alt === "string" &&
      item.alt.trim().length > 0
  );
}

/**
 * Returns true if at least 1 verified photo exists.
 */
export function hasVerifiedGalleryItems(): boolean {
  return getVerifiedGalleryItems().length > 0;
}

/**
 * Chooses homepage photos (up to 5):
 * 1. Requires at least 3 verified photos; otherwise returns empty array.
 * 2. Picks items with featured === true, sorted by homeOrder ascending.
 * 3. Appends other newest verified photos if fewer than 5.
 * 4. Returns at most 5 photos.
 */
export function getHomepageGalleryItems(): GalleryItem[] {
  const verified = getVerifiedGalleryItems();
  if (verified.length < 3) return [];

  const featured = verified
    .filter((item) => item.featured === true)
    .sort((a, b) => (a.homeOrder ?? 99) - (b.homeOrder ?? 99));

  const nonFeatured = verified.filter((item) => !item.featured);

  const combined = [...featured, ...nonFeatured];
  return combined.slice(0, 5);
}


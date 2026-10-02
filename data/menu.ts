/**
 * Dishes customers can pick while building a quote request.
 * Edit freely — these are common choices for Peshawar events; the store
 * confirms what it prepares for each booking. No prices are shown.
 */
export interface Dish {
  name: string;
  urdu: string;
}
export interface MenuGroup {
  id: string;
  title: string;
  urdu: string;
  note: string;
  dishes: Dish[];
}

export const menuIntro = {
  title: "Build Your Menu",
  text: "Tick the dishes you'd like for your event. Your choices are added to your WhatsApp quote request — we'll confirm the menu and quantities with you.",
};

export const menu: MenuGroup[] = [
  {
    id: "rice",
    title: "Rice & Deg",
    urdu: "چاول اور دیگ",
    note: "Prepared in deg for large gatherings",
    dishes: [
      { name: "Kabuli Pulao", urdu: "کابلی پلاؤ" },
      { name: "Chicken Biryani", urdu: "چکن بریانی" },
      { name: "Beef Pulao", urdu: "بیف پلاؤ" },
      { name: "Mutton Pulao", urdu: "مٹن پلاؤ" },
    ],
  },
  {
    id: "curries",
    title: "Curries",
    urdu: "سالن",
    note: "Rich, slow-cooked gravies",
    dishes: [
      { name: "Chicken Korma", urdu: "چکن قورمہ" },
      { name: "Mutton Korma", urdu: "مٹن قورمہ" },
      { name: "Chicken Karahi", urdu: "چکن کڑاہی" },
      { name: "Kofta", urdu: "کوفتہ" },
      { name: "Daal Mash", urdu: "دال ماش" },
    ],
  },
  {
    id: "kebabs",
    title: "Kebabs & Sides",
    urdu: "کباب اور سائیڈز",
    note: "To complete the dastarkhwan",
    dishes: [
      { name: "Chapli Kebab", urdu: "چپلی کباب" },
      { name: "Seekh Kebab", urdu: "سیخ کباب" },
      { name: "Naan", urdu: "نان" },
      { name: "Raita & Salad", urdu: "رائتہ اور سلاد" },
    ],
  },
  {
    id: "sweets",
    title: "Sweets",
    urdu: "میٹھا",
    note: "A sweet finish for your guests",
    dishes: [
      { name: "Zarda", urdu: "زردہ" },
      { name: "Kheer", urdu: "کھیر" },
      { name: "Firni", urdu: "فرنی" },
      { name: "Gajar ka Halwa", urdu: "گاجر کا حلوہ" },
    ],
  },
];

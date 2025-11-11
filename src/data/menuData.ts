// data/menuData.ts
import { MenuSection } from "@/types/nemuTypes";

export const menuItems: MenuSection = {
  rings: [
    { name: "All Rings", action: { type: "navigate", target: "/rings" } },
    {
      name: "Engagement Rings",
      action: { type: "navigate", target: "/rings/engagement" },
    },
    {
      name: "Wedding Rings",
      action: { type: "navigate", target: "/rings/wedding" },
    },
    {
      name: "Eternity Bands",
      action: { type: "navigate", target: "/rings/eternity" },
    },
    {
      name: "Cocktail Rings",
      action: { type: "navigate", target: "/rings/cocktail" },
    },
    {
      name: "Gemstone Rings",
      action: { type: "navigate", target: "/rings/gemstone" },
    },
    {
      name: "Gold Rings",
      action: { type: "navigate", target: "/rings/gold" },
    },
  ],
  earrings: [
    {
      name: "All Earrings",
      action: { type: "navigate", target: "/earrings" },
    },
    {
      name: "Studs",
      action: { type: "navigate", target: "/earrings/studs" },
    },
    {
      name: "Hoops",
      action: { type: "navigate", target: "/earrings/hoops" },
    },
    {
      name: "Gemstone Earrings",
      action: { type: "navigate", target: "/earrings/gemstone" },
    },
    {
      name: "Gold Earrings",
      action: { type: "navigate", target: "/earrings/gold" },
    },
    {
      name: "Fashion Earrings",
      action: { type: "navigate", target: "/earrings/fashion" },
    },
  ],
  necklaces: [
    {
      name: "All Necklaces",
      action: { type: "navigate", target: "/necklaces" },
    },
    {
      name: "Tennis Necklaces",
      action: { type: "navigate", target: "/necklaces/tennis" },
    },
    {
      name: "Pendants",
      action: { type: "navigate", target: "/necklaces/pendants" },
    },
    {
      name: "Gemstone Necklaces",
      action: { type: "navigate", target: "/necklaces/gemstone" },
    },
    {
      name: "Gold Necklaces",
      action: { type: "navigate", target: "/necklaces/gold" },
    },
    {
      name: "Fashion Necklaces",
      action: { type: "navigate", target: "/necklaces/fashion" },
    },
  ],
  bracelets: [
    {
      name: "All Bracelets",
      action: { type: "navigate", target: "/bracelets" },
    },
    {
      name: "Tennis Bracelets",
      action: { type: "navigate", target: "/bracelets/tennis" },
    },
    {
      name: "Bangles",
      action: { type: "navigate", target: "/bracelets/bangles" },
    },
    {
      name: "Gemstone Bracelets",
      action: { type: "navigate", target: "/bracelets/gemstone" },
    },
    {
      name: "Gold Bracelets",
      action: { type: "navigate", target: "/bracelets/gold" },
    },
    {
      name: "Fashion Bracelets",
      action: { type: "navigate", target: "/bracelets/fashion" },
    },
  ],
  mens: [
    {
      name: "All Mens",
      action: { type: "navigate", target: "/mens" },
    },
    {
      name: "Men's Rings",
      action: { type: "navigate", target: "/mens/rings" },
    },
    {
      name: "Men's Earrings",
      action: { type: "navigate", target: "/mens/earrings" },
    },
    {
      name: "Men's Chains",
      action: { type: "navigate", target: "/mens/necklaces" },
    },
    {
      name: "Men's Bracelets",
      action: { type: "navigate", target: "/mens/bracelets" },
    },
    {
      name: "Cufflinks",
      action: { type: "navigate", target: "/mens/cufflinks" },
    },
  ],
  education: [
    {
      name: "Our Story",
      action: { type: "navigate", target: "/about#story" },
    },
    {
      name: "Our Mission",
      action: { type: "navigate", target: "/about#mission" },
    },
    { name: "Our Values", action: { type: "navigate", target: "/about#values" } },
    { name: "Our Process", action: { type: "navigate", target: "/about#process" } },
    {
      name: "4 C's of Diamonds",
      action: { type: "navigate", target: "/education#4cs" },
    },
    {
      name: "Lab Grown Diamonds",
      action: { type: "navigate", target: "/education#lab-grown" },
    },
    {
      name: "Lab Grown Gemstones",
      action: { type: "navigate", target: "/education#gemstones" },
    },
    {
      name: "Diamond Shapes",
      action: { type: "navigate", target: "/education#shapes" },
    },
    {
      name: "Ring Size Guide",
      action: { type: "navigate", target: "/ring-size" },
    },
    {
      name: "Bracelet Size Guide",
      action: { type: "navigate", target: "/bracelet-size" },
    },
    {
      name: "Necklace Size Guide",
      action: { type: "navigate", target: "/necklace-size" },
    },
    { name: "FAQ", action: { type: "navigate", target: "/education#faq" } },
  ],
  looseDiamonds: [
    {
      name: "Browse Diamonds",
      action: { type: "navigate", target: "/loose-diamonds" },
    },
    {
      name: "Bespoke Service",
      action: { type: "navigate", target: "/bespoke" },
    },
  ],
  more: [
    {
      name: "Corporate Gifting",
      action: { type: "navigate", target: "/corporate-gifting" },
    },
    {
      name: "Franchise",
      action: { type: "navigate", target: "/franchise-opportunity" },
    },
    {
      name: "Contact Us",
      action: { type: "navigate", target: "/contact-us" },
    },
  ],
};

// Helper function to get education sections
export const getEducationSections = () => ({
  aboutUs: menuItems.education.slice(0, 4),
  diamondGuide: menuItems.education.slice(4, 8),
  jewelryGuide: menuItems.education.slice(8),
});

// Helper function to get all menu sections
export const getAllMenuSections = () => menuItems;

// Helper function to get a specific menu section
export const getMenuSection = (section: keyof MenuSection) => {
  return menuItems[section] || [];
};
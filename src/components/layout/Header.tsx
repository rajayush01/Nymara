// components/Header.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Calendar, ChevronRight } from "lucide-react";
import logomain from "../../assets/logo_main1.png";
import { menuItems, getEducationSections } from "../../data/menuData";
import { Action } from "../../types/nemuTypes";
import { useProducts } from "@/contexts/AppContext";
import HeaderActions from "./HeaderActions";
import VirtualAppointmentModal from "./VirtualAppointmentModal";
import CustomizeJewelryModal from "./CustomizeJewelryModal";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState<string | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilters, resetFilters, setSearchQuery } = useProducts();

  // Get education sections for better organization
  const educationSections = getEducationSections();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveTab("home");
        break;
      case "/about":
        setActiveTab("about");
        break;
      case "/contact-us":
        setActiveTab("contact");
        break;
      default:
        setActiveTab("");
    }
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setOpenDropdown(null);
        setOpenNestedDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const getCategoryFromPath = (path: string): string | null => {
    const pathToCategoryMap: { [key: string]: string } = {
      "/rings": "rings",
      "/rings/engagement": "engagement",
      "/rings/wedding": "wedding",
      "/rings/eternity": "eternity",
      "/rings/cocktail": "cocktail",
      "/rings/gemstone": "gemstone",
      "/rings/gold": "gold",
      "/earrings": "earrings",
      "/earrings/studs": "studs",
      "/earrings/hoops": "hoops",
      "/earrings/gemstone": "gemstone",
      "/earrings/gold": "gold",
      "/earrings/fashion": "fashion",
      "/necklaces": "necklaces",
      "/necklaces/tennis": "tennis",
      "/necklaces/pendants": "pendants",
      "/necklaces/gemstone": "gemstone",
      "/necklaces/gold": "gold",
      "/necklaces/fashion": "fashion",
      "/bracelets": "bracelets",
      "/bracelets/tennis": "tennis",
      "/bracelets/bangles": "bangles",
      "/bracelets/gemstone": "gemstone",
      "/bracelets/gold": "gold",
      "/bracelets/fashion": "fashion",
      "/mens/rings": "mens rings",
      "/mens/earrings": "mens earrings",
      "/mens/necklaces": "mens necklaces",
      "/mens/bracelets": "mens bracelets",
      "/mens/cufflinks": "cufflinks",
      "/loose-diamonds": "loose diamonds"
    };

    return pathToCategoryMap[path] || null;
  };

  const handleNavigation = (tab: string, action: Action) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setOpenNestedDropdown(null);

    switch (action.type) {
      case "scroll":
        scrollToSection(action.target);
        break;
      case "navigate":
        const category = getCategoryFromPath(action.target);
        
        if (category) {
          resetFilters();
          navigate("/products");
          setTimeout(() => {
            setFilters({
              category: [category],
              metalType: [],
              stoneType: [],
              style: [],
              size: [],
              color: [],
              sortBy: "best-seller"
            });
            
            const searchTerms = category.split(" ");
            if (searchTerms.length > 0) {
              setSearchQuery(searchTerms[0]);
            }
          }, 100);
        } else {
          navigate(action.target);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
        }
        break;
      case "external":
        window.open(action.target, "_blank");
        break;
      default:
        break;
    }
  };

  const handleCustomizeClick = () => {
    setIsCustomizeModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleVirtualAppointment = () => {
    setIsAppointmentModalOpen(true);
    setIsMenuOpen(false);
  };

  const toggleDropdown = (dropdown: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    setOpenNestedDropdown(null); // Close nested dropdown when main dropdown changes
  };

  const toggleNestedDropdown = (dropdown: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setOpenNestedDropdown(openNestedDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <header className="fixed w-full z-50 vrai-header">
        {/* Main Header Container */}
        <div
          className={`bg-white/95 vrai-header-scrolled transition-all duration-300 border-b border-gray-200/60 ${
            scrolled ? "py-3" : "py-4"
          }`}
        >
          {/* <div
          className={`bg-[#434D59] vrai-header-scrolled transition-all duration-300 border-b border-gray-200/60 ${
            scrolled ? "py-3" : "py-4"
          }`}
        > */}
          {/* Top Row - Logo and Actions */}
          <div className="mx-auto px-4 lg:px-6 py-3">
            <div className="flex justify-between items-center">
              {/* Left Side - Virtual Appointment */}
              <div className="hidden lg:flex items-center">
                <button
                  onClick={handleVirtualAppointment}
                  className="vrai-action-btn flex items-center space-x-2"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Virtual Appointment</span>
                </button>
              </div>

              {/* Center - Logo */}
              <div className="flex items-center">
                <button
                  onClick={() =>
                    handleNavigation("home", { type: "navigate", target: "/" })
                  }
                  className="cursor-pointer vrai-logo"
                >
                  <img
                    src={logomain}
                    alt="Nymara Jewels"
                    className={`transition-all duration-300 h-32 -mt-8 -mb-10 md:-mb-7 md:pl-12`}
                  />
                </button>
              </div>

              {/* Right Side - Header Actions */}
              <div className="hidden lg:flex items-center">
                <HeaderActions />
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-gray-800 hover:text-black transition-colors"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Navigation - Second Row */}
            <div className="hidden lg:flex justify-center items-center space-x-12 pt-4 mt-2 border-t border-gray-100">
              {/* Customize Button */}
              <div className="vrai-dropdown-container">
                <button 
                  onClick={handleCustomizeClick}
                  className="flex items-center space-x-1 vrai-nav-link py-3"
                >
                  <span>Craft My Model</span>
                </button>
              </div>

              {/* Rings Dropdown */}
              <div className="vrai-dropdown-container">
                <button className="flex items-center space-x-1 vrai-nav-link py-3">
                  <span>Rings</span>
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>
                <div className="vrai-dropdown-menu">
                  {menuItems.rings.map((item, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleNavigation("rings", item.action as Action)
                      }
                      className="vrai-dropdown-item block w-full text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Earrings Dropdown */}
              <div className="vrai-dropdown-container">
                <button className="flex items-center space-x-1 vrai-nav-link py-3">
                  <span>Earrings</span>
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>
                <div className="vrai-dropdown-menu">
                  {menuItems.earrings.map((item, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleNavigation("earrings", item.action as Action)
                      }
                      className="vrai-dropdown-item block w-full text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Necklaces Dropdown */}
              <div className="vrai-dropdown-container">
                <button className="flex items-center space-x-1 vrai-nav-link py-3">
                  <span>Necklaces</span>
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>
                <div className="vrai-dropdown-menu">
                  {menuItems.necklaces.map((item, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleNavigation("necklaces", item.action as Action)
                      }
                      className="vrai-dropdown-item block w-full text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bracelets Dropdown */}
              <div className="vrai-dropdown-container">
                <button className="flex items-center space-x-1 vrai-nav-link py-3">
                  <span>Bracelets</span>
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>
                <div className="vrai-dropdown-menu">
                  {menuItems.bracelets.map((item, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleNavigation("bracelets", item.action as Action)
                      }
                      className="vrai-dropdown-item block w-full text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Men's Jewelry Dropdown */}
              <div className="vrai-dropdown-container">
                <button className="flex items-center space-x-1 vrai-nav-link py-3">
                  <span>Men's</span>
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>
                <div className="vrai-dropdown-menu">
                  {menuItems.mens.map((item, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleNavigation("mens", item.action as Action)
                      }
                      className="vrai-dropdown-item block w-full text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Education Dropdown with Nested Dropdowns */}
              <div className="vrai-dropdown-container">
                <button className="flex items-center space-x-1 vrai-nav-link py-3">
                  <span>Education</span>
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>
                <div
                  className="vrai-dropdown-menu"
                  style={{ minWidth: "280px" }}
                >
                  {/* About Us Section */}
                  <div className="relative">
                    <button
                      onClick={(e) => toggleNestedDropdown("aboutUs", e)}
                      className="vrai-category-title hover:bg-gray-50 flex items-center justify-between w-full p-2 text-left"
                    >
                      <span>About Us</span>
                      <ChevronRight 
                        className={`w-3 h-3 transition-transform duration-200 ${
                          openNestedDropdown === "aboutUs" ? "rotate-90" : ""
                        }`} 
                      />
                    </button>
                    {openNestedDropdown === "aboutUs" && (
                      <div className="ml-4 border-l-2 border-gray-100">
                        {educationSections.aboutUs.map((item, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleNavigation("education", item.action as Action)
                            }
                            className="vrai-dropdown-item block w-full text-left pl-4"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Diamond Guide Section */}
                  <div className="relative">
                    <button
                      onClick={(e) => toggleNestedDropdown("diamondGuide", e)}
                      className="vrai-category-title hover:bg-gray-50 flex items-center justify-between w-full p-2 text-left"
                    >
                      <span>Diamond Guide</span>
                      <ChevronRight 
                        className={`w-3 h-3 transition-transform duration-200 ${
                          openNestedDropdown === "diamondGuide" ? "rotate-90" : ""
                        }`} 
                      />
                    </button>
                    {openNestedDropdown === "diamondGuide" && (
                      <div className="ml-4 border-l-2 border-gray-100">
                        {educationSections.diamondGuide.map((item, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleNavigation("education", item.action as Action)
                            }
                            className="vrai-dropdown-item block w-full text-left pl-4"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Jewelry Guide Section */}
                  <div className="relative">
                    <button
                      onClick={(e) => toggleNestedDropdown("jewelryGuide", e)}
                      className="vrai-category-title hover:bg-gray-50 flex items-center justify-between w-full p-2 text-left"
                    >
                      <span>Jewelry Guide</span>
                      <ChevronRight 
                        className={`w-3 h-3 transition-transform duration-200 ${
                          openNestedDropdown === "jewelryGuide" ? "rotate-90" : ""
                        }`} 
                      />
                    </button>
                    {openNestedDropdown === "jewelryGuide" && (
                      <div className="ml-4 border-l-2 border-gray-100">
                        {educationSections.jewelryGuide.map((item, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleNavigation("education", item.action as Action)
                            }
                            className="vrai-dropdown-item block w-full text-left pl-4"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Loose Diamonds */}
              <div className="vrai-dropdown-container">
                <button className="flex items-center space-x-1 vrai-nav-link py-3">
                  <span>Loose Diamonds</span>
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>
                <div className="vrai-dropdown-menu">
                  {menuItems.looseDiamonds.map((item, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleNavigation(
                          "loose-diamonds",
                          item.action as Action
                        )
                      }
                      className="vrai-dropdown-item block w-full text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* More */}
              <div className="vrai-dropdown-container">
                <button className="flex items-center space-x-1 vrai-nav-link py-3">
                  <span>More</span>
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>
                <div className="vrai-dropdown-menu">
                  {menuItems.more.map((item, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleNavigation(
                          item.name.toLowerCase().replace(" ", "-"),
                          item.action as Action
                        )
                      }
                      className="vrai-dropdown-item block w-full text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden vrai-mobile-menu mx-4 mt-2 max-h-96 overflow-y-auto">
            <div className="p-0 space-y-0">
              <div className="lg:hidden border-b border-gray-200 p-4">
                <HeaderActions />
              </div>
              
              {/* Mobile Virtual Appointment */}
              <div>
                <button 
                  onClick={handleVirtualAppointment}
                  className="flex items-center justify-between w-full text-left vrai-mobile-item py-4 px-6"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Virtual Appointment</span>
                  </div>
                </button>
              </div>
              
              {/* Mobile Customize Button */}
              <div>
                <button 
                  onClick={handleCustomizeClick}
                  className="flex justify-between items-center w-full text-left vrai-mobile-item py-4 px-6"
                >
                  <span>Customize</span>
                </button>
              </div>

              {/* Mobile menu items */}
              {Object.entries(menuItems).map(([category, items]) => {
                if (category === "education") {
                  return (
                    <div key={category}>
                      <button
                        onClick={(e) => toggleDropdown(`mobile-${category}`, e)}
                        className="flex justify-between items-center w-full text-left vrai-mobile-item py-4 px-6"
                      >
                        <span>Education</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openDropdown === `mobile-${category}` ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === `mobile-${category}` && (
                        <div className="bg-gray-50">
                          {/* About Us */}
                          <div>
                            <button
                              onClick={(e) => toggleNestedDropdown("mobile-aboutUs", e)}
                              className="flex justify-between items-center w-full text-left py-3 px-8 font-medium text-gray-800"
                            >
                              <span>About Us</span>
                              <ChevronDown
                                className={`w-3 h-3 transition-transform duration-200 ${
                                  openNestedDropdown === "mobile-aboutUs" ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {openNestedDropdown === "mobile-aboutUs" && (
                              <div className="bg-gray-100">
                                {educationSections.aboutUs.map((item, index) => (
                                  <button
                                    key={index}
                                    onClick={() =>
                                      handleNavigation("education", item.action as Action)
                                    }
                                    className="vrai-mobile-subitem block w-full text-left py-2 px-12"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Diamond Guide */}
                          <div>
                            <button
                              onClick={(e) => toggleNestedDropdown("mobile-diamondGuide", e)}
                              className="flex justify-between items-center w-full text-left py-3 px-8 font-medium text-gray-800"
                            >
                              <span>Diamond Guide</span>
                              <ChevronDown
                                className={`w-3 h-3 transition-transform duration-200 ${
                                  openNestedDropdown === "mobile-diamondGuide" ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {openNestedDropdown === "mobile-diamondGuide" && (
                              <div className="bg-gray-100">
                                {educationSections.diamondGuide.map((item, index) => (
                                  <button
                                    key={index}
                                    onClick={() =>
                                      handleNavigation("education", item.action as Action)
                                    }
                                    className="vrai-mobile-subitem block w-full text-left py-2 px-12"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Jewelry Guide */}
                          <div>
                            <button
                              onClick={(e) => toggleNestedDropdown("mobile-jewelryGuide", e)}
                              className="flex justify-between items-center w-full text-left py-3 px-8 font-medium text-gray-800"
                            >
                              <span>Jewelry Guide</span>
                              <ChevronDown
                                className={`w-3 h-3 transition-transform duration-200 ${
                                  openNestedDropdown === "mobile-jewelryGuide" ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {openNestedDropdown === "mobile-jewelryGuide" && (
                              <div className="bg-gray-100">
                                {educationSections.jewelryGuide.map((item, index) => (
                                  <button
                                    key={index}
                                    onClick={() =>
                                      handleNavigation("education", item.action as Action)
                                    }
                                    className="vrai-mobile-subitem block w-full text-left py-2 px-12"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={category}>
                    <button
                      onClick={(e) => toggleDropdown(`mobile-${category}`, e)}
                      className="flex justify-between items-center w-full text-left vrai-mobile-item py-4 px-6"
                    >
                      <span>
                        {category === "mens" ? "Men's Jewelry" : 
                         category === "looseDiamonds" ? "Loose Diamonds" :
                         category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === `mobile-${category}` ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === `mobile-${category}` && (
                      <div className="bg-gray-50">
                        {items.map((item, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleNavigation(category, item.action as Action)
                            }
                            className="vrai-mobile-subitem block w-full text-left py-3 px-8"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Virtual Appointment Modal */}
      <VirtualAppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />

      {/* Customize Jewelry Modal */}
      <CustomizeJewelryModal
        isOpen={isCustomizeModalOpen}
        onClose={() => setIsCustomizeModalOpen(false)}
      />
    </>
  );
};

export default Header;

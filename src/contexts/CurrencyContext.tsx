import React, { createContext, useContext, useState } from "react";

const countries = [
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR" },
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD" },
  { code: "EU", name: "European Union", flag: "🇪🇺", currency: "EUR" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", currency: "AED" },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", currency: "SGD" },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY" },
];


type Country = typeof countries[number];

type CurrencyContextType = {
  countries: Country[];
  selectedCountry: Country;
  setSelectedCountry: (c: Country) => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find(c => c.code === "IN")!); // default India

  return (
    <CurrencyContext.Provider value={{ countries, selectedCountry, setSelectedCountry }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
};

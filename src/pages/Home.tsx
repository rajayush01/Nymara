import { useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import ProductCategories from "@/components/home/ProductCategories";
// import EducationHubHome from "@/components/home/EducationHubHome";
import DiamondShowcase from "@/components/home/DiamondShowcase";
import Model from "@/components/home/Model";
import RingDesigner from "@/components/home/RingDesigner";
import { ImageFanDynamic } from "@/components/home/CardTypes";
import JewelryCollage from "@/components/home/JewelleryCollage";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
} as const;

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.8,
    },
  },
} as const;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      duration: 0.8,
    },
  },
} as const;

const SectionWrapper = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={sectionVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="overflow-hidden bg-white"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* Hero Section - Added ID for navigation */}
        <motion.div id="hero-section" variants={fadeIn} className="">
          <HeroSection />
        </motion.div>

        <SectionWrapper>
          <ImageFanDynamic />
        </SectionWrapper>

        <SectionWrapper>
          <RingDesigner />
        </SectionWrapper>

        <SectionWrapper>
          <Model />
        </SectionWrapper>

        <SectionWrapper>
          <JewelryCollage />
        </SectionWrapper>

        <SectionWrapper>
          <div id="products">
            <ProductCategories />
          </div>
        </SectionWrapper>

        {/* <SectionWrapper>
          <div id="solutions-section">
            <EducationHubHome />
          </div>
        </SectionWrapper> */}

        {/*<SectionWrapper>
          <div id="career-section">
            <CareerSection />
          </div>
        </SectionWrapper> */}

        {/* <SectionWrapper>
			<OurClients/>
		</SectionWrapper> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;

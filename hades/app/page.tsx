"use client"; // Ensure this is treated as a client component

import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "./components/Header";
import { Hero } from "@/app/components/Hero";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

export default function Home() {
  return (
    <ParallaxProvider>
      <div className={styles.container}>
        {/* Header */}
        <Header />

        {/* Additional Parallax Section (Background Section) */}
        <Parallax speed={-10}>
          <div
            className={styles.parallaxSection}
            style={{
              backgroundImage: `url('/assets/Athena stab books.png')`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              height: "100vh",
              zIndex: -1,
              position: "relative",
            }}
          ></div>
        </Parallax>

        {/* Hero Section */}
        <Parallax speed={5}>
          <div className={styles.heroParallax}>
            <Hero />
          </div>
        </Parallax>
      </div>
    </ParallaxProvider>
  );
}



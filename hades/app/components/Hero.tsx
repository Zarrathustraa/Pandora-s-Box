
import { Parallax } from "react-scroll-parallax";

export const Hero = () => {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center bg-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/Athena stab.png')`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-6">
        {/* Parallax Effect for Text Content */}
        <Parallax speed={-10}>
          <div className="relative z-10 text-center">
            {/* Banner Text */}
            <div className="inline-flex border border-[#222] mt-8 px-3 py-1 rounded-lg tracking-tight">
              Rise of Athena
            </div>
            <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-b from-black to-purple-800 text-transparent bg-clip-text py-2 mt-4">
              Pathway to easier grading!
            </h1>
            <p className="text-xl tracking-tight mt-4">
              It is the new age of sucking the fuck out of Athena's titties and her rewarding you with plausible feedback to help you along your grading journey.
            </p>
            <div className="flex gap-4 mt-10 justify-center">
              <button className="bg-purple-800 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
                Learn more
              </button>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
};

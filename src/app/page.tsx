import { Carousel } from "./components/Carousel";
import { ProviderCardsPanel } from "./components/ProviderCardsPanel";
import { CAROUSEL_IMAGES } from "./data/carouselImages";
import { providers } from "./data/providers";

export default function Home() {
  const sectionClassName =
    "section-below-carousel relative left-1/2 right-1/2 z-10 flex w-screen -translate-x-1/2 -mt-36 flex-col sm:-mt-40 md:mt-0 md:min-h-[calc(100vh-8rem)] md:flex-1 md:items-center md:justify-center md:gap-3 md:py-8";

  return (
    <div className="flex min-h-full flex-col">
      <section className="home-carousel relative left-1/2 right-1/2 w-screen shrink-0 -translate-x-1/2 md:hidden">
        <Carousel images={CAROUSEL_IMAGES} ariaLabel="Featured" />
      </section>

      <section className={sectionClassName} aria-label="Choose your internet provider">
        <h1 className="home-provider-title relative z-20 mb-10 px-4 pt-6 text-center font-sans text-xl font-bold tracking-wide text-white sm:mb-8 sm:pt-8 md:mb-0 md:pt-0 md:text-3xl lg:text-4xl xl:text-5xl">
          Choose Your Internet Provider
        </h1>

        <ProviderCardsPanel providers={providers} />
      </section>
    </div>
  );
}

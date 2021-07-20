import React, { useEffect, useRef, useState } from "react";
import { defineCustomElements as ionDefineCustomElements } from "@ionic/core/loader";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

/* Core CSS required for Ionic components to work properly */
import "@ionic/core/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/core/css/padding.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/display.css";

function MyApp({ Component, pageProps }) {
  const [isBackTransition, setIsBackTransition] = useState(false);
  const currentZIndex = useRef(0);
  const historyStateIndex = useRef(0);

  if (typeof window !== "undefined") {
    historyStateIndex.current = history.state.idx;
  }

  useEffect(() => {
    ionDefineCustomElements(window);
  });

  const router = useRouter();
  useEffect(() => {
    router.beforePopState((args) => {
      const newIndex = (args as any).idx;
      const currentIndex = historyStateIndex.current;
      if (currentIndex === undefined || newIndex < currentIndex) {
        console.log("is a back transition");
        // subtract 2 because we add 1 on any navigation, resulting in net -1
        currentZIndex.current -= 2;
        setIsBackTransition(true);
      }

      return true;
    });

    const handleStart = (args) => {
      currentZIndex.current += 1;
    };
    const handleComplete = (...args) => {
      setIsBackTransition(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, []);

  return (
    <ion-app>
      <AnimatePresence initial={false}>
        <PageAnimator
          key={router.pathname}
          {...{
            Component,
            pageProps,
            zIndex: currentZIndex.current,
            isBackTransition: isBackTransition,
          }}
        />
      </AnimatePresence>
    </ion-app>
  );
}

function PageAnimator({ Component, pageProps, zIndex, isBackTransition }) {
  const [myZIndex] = useState(zIndex);

  return (
    <motion.div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        background: "white",
        zIndex: myZIndex,
      }}
      initial={isBackTransition ? undefined : { y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={isBackTransition ? { y: 200, opacity: 0 } : { opacity: 0.999999 }}
      transition={{ duration: 0.3 }}
    >
      <Component {...pageProps} />
    </motion.div>
  );
}

export default MyApp;

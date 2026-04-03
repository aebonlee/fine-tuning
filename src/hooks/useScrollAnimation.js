import { useEffect } from "react";

export default function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    function observe() {
      document.querySelectorAll("[data-aos]").forEach((el) => {
        if (!el.classList.contains("aos-animate")) {
          observer.observe(el);
        }
      });
    }

    observe();

    const mutationObserver = new MutationObserver(() => {
      observe();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

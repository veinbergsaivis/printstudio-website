export const fadeUp = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: delay
    }
  }
});

export const fadeIn = (delay: number = 0) => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeIn",
      delay: delay
    }
  }
});

export const staggerChildren = (staggerTime: number = 0.1) => ({
  visible: {
    transition: {
      staggerChildren: staggerTime
    }
  }
});

export const scaleUp = (delay: number = 0) => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: delay
    }
  }
});
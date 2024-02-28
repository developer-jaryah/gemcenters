<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/ScrollToPlugin.min.js"></script>

<script>
document.addEventListener("DOMContentLoaded", function() {
  // Check if the screen width is 991px or less
  if (window.innerWidth <= 991) {
    // Flag to determine if the user has interacted
    let userInteracted = false;

    // Function to stop the scroll animation on user interaction
    const stopScrollAnimation = () => {
      userInteracted = true; // Set the flag to true if the user interacts
    };

    // Add event listeners for user interactions
    document.addEventListener('touchstart', stopScrollAnimation);
    document.addEventListener('wheel', stopScrollAnimation); // 'wheel' for mouse scroll

    // Start the GSAP animation to scroll to the #mailing-list element
    const scrollTween = gsap.to(window, {
      duration: 5,
      scrollTo: "#scroll-auto-location",
      ease: "power1.out",
      onStart: () => {
        // Delay adding a scroll event listener to differentiate between user scroll and GSAP scroll
        setTimeout(() => {
          if (!userInteracted) { // If user hasn't interacted yet, add listener to kill animation on scroll
            window.addEventListener('scroll', stopScrollAnimation);
          }
        }, 50); // Delay might need adjustment based on actual behavior
      },
      onComplete: () => {
        // Clean up event listeners after animation completes
        document.removeEventListener('touchstart', stopScrollAnimation);
        window.removeEventListener('scroll', stopScrollAnimation);
        document.removeEventListener('wheel', stopScrollAnimation);
      }
    });

    // Check after a delay if user interacted; if so, kill the animation
    setTimeout(() => {
      if (userInteracted) scrollTween.kill();
    }, 10); // Short delay to catch immediate interactions
  }
});
</script>

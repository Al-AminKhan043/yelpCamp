
  // Get the button
  const backToTopButton = document.getElementById('back-to-top');

  // Show or hide the button based on scroll position
  window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  };

  // Scroll back to top when the button is clicked
  backToTopButton.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


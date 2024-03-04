
        // JavaScript for responsive behavior

        // Function to handle responsive adjustments
        function handleResponsive() {
            const screenWidth = window.innerWidth;

            // Example: Adjust styles based on screen width
            if (screenWidth <= 600) {
                // For screens with width 600 pixels or less
                // You can modify styles or perform other actions here
            } else {
                // For screens with width greater than 600 pixels
                // You can revert styles or perform other actions here
            }
        }

        // Initial call to handleResponsive when the page loads
        handleResponsive();

        // Attach handleResponsive function to window resize event
        window.onresize = handleResponsive;

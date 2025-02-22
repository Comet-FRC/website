const images = document.getElementsByClassName('right')[0].childNodes;
const container = document.getElementsByClassName('whole')[0];

images.forEach((image) => (
    image.addEventListener("click", function() {
        console.log("clicked");
        container.classList.add('whole-active');

        // get image that was clicked
        img = document.createElement('img');
        img.src = "/images/media/alvey-2025/" + image.src.substring(image.src.lastIndexOf('/') + 1);
        img.classList.add("whole-img");

        // add image to the container
        container.appendChild(img);

        // remove/exit image when a click happens
        container.addEventListener("click", function() {
            container.classList.remove('whole-active');
            container.removeChild(img);
        });
    })
));
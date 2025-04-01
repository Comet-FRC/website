const images =Array.from(document.getElementsByClassName('pic-scroll'));

function getNumImagesInFolder(folder) {
    return new Promise((resolve) => {
        let numImages = 0;

        function loadImage() {
            let newImage = new Image();
            newImage.src = folder + (numImages + 1) + '.JPG';
            newImage.onload = function () {
                numImages++;
                loadImage();
            };
            newImage.onerror = function () {
                resolve(numImages);
            };
        }
        loadImage();
    });
}

images.forEach((image) => {
    image.addEventListener("click", async function () {
        let currentIndex = parseInt(image.src.substring(image.src.lastIndexOf('/') + 1, image.src.lastIndexOf('.')));
        let nextIndex = currentIndex + 1;

        let numImages = await getNumImagesInFolder(image.src.substring(0, image.src.lastIndexOf('/') + 1));
        console.log(numImages);

        if (nextIndex >= numImages) {
            nextIndex = 1;
        }
        image.src = image.src.substring(0, image.src.lastIndexOf('/') + 1) + nextIndex + ".JPG";
    });
});
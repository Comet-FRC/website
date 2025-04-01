let list = Array.from(document.getElementById('robot-select').children);
list.forEach((node) => {
    node.addEventListener('click', () => {
        let currentActive = document.getElementsByClassName('active')[0];
        if (currentActive === node) {
            return;
        }
        currentActive.classList.remove('active');
        node.classList.add('active');
        
        // change image on the right
        let image = document.getElementsByClassName('i-active')[0];
        image.classList.remove('i-active');
        let newImage = document.getElementById(node.id + '-img');
        newImage.classList.add('i-active');

        // change text on the left
        let text = document.getElementsByClassName('inf-active')[0];
        text.classList.remove('inf-active');
        let newText = document.getElementById(node.id + '-info');
        newText.classList.add('inf-active');
        
        // TODO: other images accessed through the src attribute using the node.id
        // DISPLAY THEM BENEATH THE MAIN IMAGE AND ON CLICK, REPLACE MAIN IMAGE WITH THEM

        // TODO: Change text (e.g. Meet Melody!)
    });
});
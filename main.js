document.addEventListener("DOMContentLoaded", function() {
    console.log("Сайт завантажено та готовий до використання.");

    const phoneImage = document.getElementById('phoneImage');
    const images = [
        'images/phone.png',
        'images/phone_1.png',
        'images/phone_2.png',
        'images/phone_3.png',
        'images/phone_4.png',
        'images/phone_5.png',
        'images/phone_6.png',
        'images/phone_7.png',
        'images/phone_8.png',
        'images/phone_9.png'
    ];
    let currentImageIndex = 0;

    function changeImage() {
        phoneImage.classList.remove('show');
        setTimeout(() => {
            phoneImage.src = images[currentImageIndex];
            phoneImage.classList.add('show');
            currentImageIndex = (currentImageIndex + 1) % images.length;
        }, 500); // Transition duration should match CSS transition duration
        setTimeout(changeImage, 5000); // Change image every 5 seconds
    }

    changeImage();
});

document.addEventListener("DOMContentLoaded", function () {
    const starContainer = document.body; // Atau gunakan elemen lain sebagai container
    const numStars = 300; // Jumlah bintang

    for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");
        star.classList.add("stars");

        // Posisi acak di seluruh viewport
        let posX = Math.random() * 100; // 0% - 100% lebar
        let posY = Math.random() * 100; // 0% - 100% tinggi
        let duration = Math.random() * 2 + 1.5; // 1.5s - 3.5s

        star.style.top = `${posY}%`;
        star.style.left = `${posX}%`;
        star.style.animationDuration = `${duration}s`;

        starContainer.appendChild(star);
    }

    const planets = document.querySelectorAll(".planet");

    planets.forEach((planet, index) => {
        let randomDegree = Math.floor(Math.random() * 360); // Acak rotasi awal (0 - 360)
        let distance = 120 + index * 30; // Jarak dari pusat

        // Set posisi awal acak
        planet.style.transform = `rotate(${randomDegree}deg) translateX(${distance}px) rotate(-${randomDegree}deg)`;
    });

    

    
});

function createRocket() {
    let rocket = document.createElement("img");
    rocket.src = "../img/roket.png"; // Gambar roket
    rocket.classList.add("rocket");

    let startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, rotation;

    let direction = Math.floor(Math.random() * 4); // 0 = bawah ke atas, 1 = atas ke bawah, 2 = kiri ke kanan, 3 = kanan ke kiri

    switch (direction) {
        case 0: // Dari bawah ke atas
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight + 50;
            endX = Math.random() * window.innerWidth;
            endY = -50;
            cp1X = startX + (endX - startX) * 0.3 + Math.random() * 200 - 100;
            cp1Y = startY - (startY - endY) * 0.3;
            cp2X = startX + (endX - startX) * 0.7 + Math.random() * 200 - 100;
            cp2Y = startY - (startY - endY) * 0.7;
            rotation = 0;
            break;
        case 1: // Dari atas ke bawah
            startX = Math.random() * window.innerWidth;
            startY = -50;
            endX = Math.random() * window.innerWidth;
            endY = window.innerHeight + 50;
            cp1X = startX + (endX - startX) * 0.3 + Math.random() * 200 - 100;
            cp1Y = startY + (endY - startY) * 0.3;
            cp2X = startX + (endX - startX) * 0.7 + Math.random() * 200 - 100;
            cp2Y = startY + (endY - startY) * 0.7;
            rotation = 180;
            break;
        case 2: // Dari kiri ke kanan
            startX = -50;
            startY = Math.random() * window.innerHeight;
            endX = window.innerWidth + 50;
            endY = Math.random() * window.innerHeight;
            cp1X = startX + (endX - startX) * 0.3;
            cp1Y = startY + (endY - startY) * 0.3 + Math.random() * 200 - 100;
            cp2X = startX + (endX - startX) * 0.7;
            cp2Y = startY + (endY - startY) * 0.7 + Math.random() * 200 - 100;
            rotation = 90;
            break;
        case 3: // Dari kanan ke kiri
            startX = window.innerWidth + 50;
            startY = Math.random() * window.innerHeight;
            endX = -50;
            endY = Math.random() * window.innerHeight;
            cp1X = startX - (startX - endX) * 0.3;
            cp1Y = startY + (endY - startY) * 0.3 + Math.random() * 200 - 100;
            cp2X = startX - (startX - endX) * 0.7;
            cp2Y = startY + (endY - startY) * 0.7 + Math.random() * 200 - 100;
            rotation = -90;
            break;
    }

    rocket.style.left = `${startX}px`;
    rocket.style.top = `${startY}px`;
    rocket.style.transform = `rotate(${rotation - 15}deg)`; // Menyesuaikan kemiringan awal

    document.body.appendChild(rocket);

    let startTime = performance.now();
    let duration = 5;

    function animateRocket(time) {
        let elapsedTime = (time - startTime) / 1000;
        let progress = elapsedTime / duration; 

        if (progress < 1) {
            let t = progress;
            let x = Math.pow(1 - t, 3) * startX +
                    3 * Math.pow(1 - t, 2) * t * cp1X +
                    3 * (1 - t) * Math.pow(t, 2) * cp2X +
                    Math.pow(t, 3) * endX;
            let y = Math.pow(1 - t, 3) * startY +
                    3 * Math.pow(1 - t, 2) * t * cp1Y +
                    3 * (1 - t) * Math.pow(t, 2) * cp2Y +
                    Math.pow(t, 3) * endY;

            let angle = Math.atan2(y - parseFloat(rocket.style.top), x - parseFloat(rocket.style.left)) * (180 / Math.PI);

            rocket.style.left = `${x}px`;
            rocket.style.top = `${y}px`;
            rocket.style.transform = `rotate(${angle + 90}deg)`;

            requestAnimationFrame(animateRocket);
        } else {
            rocket.remove();
        }
    }

    requestAnimationFrame(animateRocket);
}

setInterval(createRocket, 6000);


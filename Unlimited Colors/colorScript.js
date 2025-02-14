const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;

        let intervalId;
        
        const startChangingColor = () => {
            if (!intervalId) {
                intervalId = setInterval(() => {
                    document.body.style.backgroundColor = randomColor();
                }, 200);
            }
        };
        
        const stopChangingColor = () => {
            clearInterval(intervalId);
            intervalId = null;
            document.body.style.backgroundColor = "black"; // Reset to default
        };
        
        document.getElementById('start').addEventListener('click', startChangingColor);
        document.getElementById('stop').addEventListener('click', stopChangingColor);
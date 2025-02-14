const fonts = [
    { font: 'Serif, cursive', name: 'Serif Calligraphy' },
    { font: 'Copperplate, cursive', name: 'Copperplate' },
    { font: 'Sans-serif', name: 'Sans-serif Calligraphy' },
    { font: 'Brush Script MT, cursive', name: 'Brush Script' },
    { font: 'Courier New, cursive', name: 'Blackletter (Gothic)' }
];

const lightBackgrounds = [
    '#FFF8DC', '#FAFAD2', '#E0FFFF', '#F0FFF0', '#F5F5DC', '#FFE4B5', '#FFFACD', '#FFFAF0', '#F55FDC', '#F5CDF5'
];

const letterColors = [
    '#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A1', '#A133FF', '#33FFF3', '#F3FF33', '#3F33FF', '#A13FFF', '#3357FF', '#FF3357', '#A1FF33', '#FF33A1', '#FFA133', '#00FF33', '#A544FF', '#F3F3A1'
];

function generateCalligraphy() {
    const container = document.getElementById('display');
    container.innerHTML = '';
    const input = document.getElementById('user-input').value.trim();
    
    if (!input) return;
    
    document.body.style.background = lightBackgrounds[Math.floor(Math.random() * lightBackgrounds.length)];
    
    fonts.forEach((style, index) => {
        const wordBox = document.createElement('div');
        wordBox.classList.add('word-box');
        wordBox.style.animationDelay = `${index * 0.2}s`;
        
        const styleName = document.createElement('div');
        styleName.classList.add('style-name');
        styleName.textContent = `${style.name}:`;
        
        const word = document.createElement('div');
        word.classList.add('word');
        word.style.fontFamily = style.font;
        word.style.color = letterColors[Math.floor(Math.random() * letterColors.length)];
        word.textContent = input;
        
        wordBox.appendChild(styleName);
        wordBox.appendChild(word);
        container.appendChild(wordBox);
    });
}
let userPreference = localStorage.getItem('appearance') || 'auto';
const query = window.matchMedia('(prefers-color-scheme: dark)');
let isDark = userPreference === 'auto' ? query.matches : userPreference === 'dark';

setClass(isDark);

function updateSourceMedia(colorPreference) {
    const pictures = document.querySelectorAll('picture');
   
    pictures.forEach((picture) => {
      const sources =
        picture.querySelectorAll(`
          source[media*="prefers-color-scheme"], 
          source[data-media*="prefers-color-scheme"]
        `);
   
      sources.forEach((source) => {
        // Preserve the source `media` as a data-attribute
        // to be able to switch between preferences
        if (source?.media.includes('prefers-color-scheme')) {
          source.dataset.media = source.media;
        }
   
        if (source?.dataset.media.includes(colorPreference)) {
          source.media = 'all';
        } else if (source) {
          source.media = 'none';
        }
      });
    });
};

function setClass(dark) {
    let themeButton = document.querySelectorAll('.theme-button');
    
    if (dark) {
        document.documentElement.dataset.appearanceMode = "dark";
        themeButton.forEach((button) => {
            button.setAttribute("aria-checked", "true");
        });
        updateSourceMedia('dark');
    } else {
        document.documentElement.removeAttribute('data-appearance-mode');
        themeButton.forEach((button) => {
            button.setAttribute("aria-checked", "false");
        });
        updateSourceMedia('light');
    }
}
  
function toggle() {
    setClass((isDark = !isDark));
    localStorage.setItem(
        'appearance',
        (userPreference = isDark ? (query.matches ? 'auto' : 'dark') : query.matches ? 'light' : 'auto')
    )
}

query.onchange = (e) => {
    if (userPreference === 'auto') {
        setClass((isDark = e.matches));
    }
}
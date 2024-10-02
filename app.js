// Singleton: Gestor de temas
class ThemeManager {
    constructor() {
        if (ThemeManager.instance) {
            return ThemeManager.instance;
        }
        this.theme = 'light';
        ThemeManager.instance = this;
    }

    setTheme(theme) {
        this.theme = theme;
        document.body.className = theme;
    }

    getTheme() {
        return this.theme;
    }
}

const themeManager = new ThemeManager();
document.getElementById('darkModeButton').addEventListener('click', () => {
    themeManager.setTheme('dark');
});
document.getElementById('lightModeButton').addEventListener('click', () => {
    themeManager.setTheme('light');
});

// Carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel img');
const totalSlides = slides.length;

document.getElementById('next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.style.display = (index === currentSlide) ? 'block' : 'none';
    });
}
updateCarousel();

// Factory: Generación de tarjetas
class CardFactory {
    static createCard(type, content) {
        let card;
        switch (type) {
            case 'product':
                card = new ProductCard(content);
                break;
            case 'article':
                card = new ArticleCard(content);
                break;
            default:
                card = new DefaultCard(content);
        }
        return card.create();
    }
}

class ProductCard {
    constructor(content) {
        this.content = content;
    }

    create() {
        return `<div class="card product-card">
                    <h2>${this.content.title}</h2>
                    <p>${this.content.description}</p>
                    <span>Precio: $${this.content.price}</span>
                </div>`;
    }
}

class ArticleCard {
    constructor(content) {
        this.content = content;
    }

    create() {
        return `<div class="card article-card">
                    <h2>${this.content.title}</h2>
                    <p>${this.content.description}</p>
                    <a href="${this.content.link}">Leer más</a>
                </div>`;
    }
}

// Generar una tarjeta
const productContent = { title: "Rosas Eternas", description: "Rosas eternas (color rojo) excelente para regalar a quien desees.", price: 59.99 };
const cardHTML = CardFactory.createCard('product', productContent);
document.getElementById('content').innerHTML = cardHTML;

// Formulario dinámico con Factory
document.getElementById('formSelector').addEventListener('change', (event) => {
    const formType = event.target.value;
    let formHTML;

    // Limpia el contenedor del formulario antes de agregar el nuevo formulario
    document.getElementById('formContainer').innerHTML = '';

    if (formType === 'feedback') {
        formHTML = `<form>
                        <label>Comentarios</label>
                        <textarea></textarea>
                        <button type="submit">Enviar Feedback</button>
                    </form>`;
    } else if (formType === 'support') {
        formHTML = `<form>
                        <label>Problema</label>
                        <input type="text" />
                        <button type="submit">Enviar Soporte</button>
                    </form>`;
    }

    document.getElementById('formContainer').innerHTML = formHTML;
});

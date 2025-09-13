
class HalinowOgloszenia {
    constructor() {
        this.posts = this.initializePosts();
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.displayedPosts = 6;
        this.isLoading = false;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.loadPosts();
        this.updateStats();
    }

    initializePosts() {
        return [
            {
                id: 1,
                title: "Sprzedam rower górski",
                category: "sprzedaz",
                description: "Rower górski w bardzo dobrym stanie, idealny do jazdy po okolicy Halinowa. Ostatnio serwisowany, nowe opony. Cena do uzgodnienia.",
                price: "800 zł",
                location: "Halinów, ul. Główna",
                contact: "123 456 789",
                author: "Jan K.",
                date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 godziny temu
                views: 15
            },
            {
                id: 2,
                title: "Potrzebuję pomocy z zakupami",
                category: "pomoc",
                description: "Czy ktoś mógłby mi pomóc z zakupami? Jestem starszą osobą i mam problemy z chodzeniem. Mieszkam przy ul. Warszawskiej.",
                price: "Za darmo",
                location: "Halinów, ul. Warszawska",
                contact: "987 654 321",
                author: "Maria W.",
                date: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 godziny temu
                views: 8
            },
            {
                id: 3,
                title: "Kupię meble do pokoju",
                category: "kupno",
                description: "Szukam mebli do pokoju młodzieżowego - łóżko, biurko, szafa. Może być używane, ale w dobrym stanie. Cena do 2000 zł za komplet.",
                price: "Do 2000 zł",
                location: "Halinów",
                contact: "555 123 456",
                author: "Anna M.",
                date: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 godzin temu
                views: 12
            },
            {
                id: 4,
                title: "Usługi elektryczne",
                category: "uslugi",
                description: "Elektryk z 15-letnim doświadczeniem. Naprawy, instalacje, przeglądy. Działam na terenie Halinowa i okolic. Gwarancja na wykonane prace.",
                price: "Do uzgodnienia",
                location: "Halinów i okolice",
                contact: "777 888 999",
                author: "Piotr S.",
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // wczoraj
                views: 25
            },
            {
                id: 5,
                title: "Sprzedam lodówkę",
                category: "sprzedaz",
                description: "Lodówka Samsung, 2 lata używania, bardzo dobry stan. Wymiary: 60x65x185 cm. Możliwość transportu za dodatkową opłatą.",
                price: "1200 zł",
                location: "Halinów, ul. Leśna",
                contact: "111 222 333",
                author: "Katarzyna L.",
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // wczoraj
                views: 18
            },
            {
                id: 6,
                title: "Pomoc w opiece nad psem",
                category: "pomoc",
                description: "Czy ktoś mógłby zaopiekować się moim psem przez weekend? Golden retriever, 3 lata, bardzo spokojny. Płacę za opiekę.",
                price: "100 zł/dzień",
                location: "Halinów, ul. Szkolna",
                contact: "444 555 666",
                author: "Tomasz K.",
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dni temu
                views: 7
            },
            {
                id: 7,
                title: "Kupię samochód",
                category: "kupno",
                description: "Szukam samochodu do 15000 zł. Preferuję marki: Toyota, Honda, Volkswagen. Może być używany, ale w dobrym stanie technicznym.",
                price: "Do 15000 zł",
                location: "Halinów",
                contact: "999 888 777",
                author: "Michał P.",
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dni temu
                views: 22
            },
            {
                id: 8,
                title: "Usługi hydrauliczne",
                category: "uslugi",
                description: "Hydraulik - naprawy, instalacje, przeglądy. Działam na terenie Halinowa. Szybka realizacja, konkurencyjne ceny. Telefon 24/7.",
                price: "Od 50 zł",
                location: "Halinów i okolice",
                contact: "666 777 888",
                author: "Marek W.",
                date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 dni temu
                views: 31
            },
            {
                id: 9,
                title: "Sprzedam komplet mebli",
                category: "sprzedaz",
                description: "Komplet mebli do salonu: sofa, stolik kawowy, szafka TV. Stan bardzo dobry, sprzedaję z powodu przeprowadzki. Możliwość negocjacji ceny.",
                price: "2500 zł",
                location: "Halinów, ul. Przemysłowa",
                contact: "333 444 555",
                author: "Agnieszka R.",
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dni temu
                views: 14
            },
            {
                id: 10,
                title: "Pomoc w ogrodzie",
                category: "pomoc",
                description: "Potrzebuję pomocy w przygotowaniu ogrodu na wiosnę. Kopanie, sadzenie, przycinanie. Płacę 20 zł/godzina. Preferuję kogoś z doświadczeniem.",
                price: "20 zł/godzina",
                location: "Halinów, ul. Kościelna",
                contact: "222 333 444",
                author: "Ewa D.",
                date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 dni temu
                views: 9
            }
        ];
    }

    setupEventListeners() {
        // Add post button
        const addPostBtn = document.getElementById('addPostBtn');
        const fabBtn = document.getElementById('fabBtn');
        
        if (addPostBtn) {
            addPostBtn.addEventListener('click', () => this.openModal('addPostModal'));
        }
        
        if (fabBtn) {
            fabBtn.addEventListener('click', () => this.openModal('addPostModal'));
        }

        // Modal close buttons
        document.getElementById('closeModalBtn')?.addEventListener('click', () => this.closeModal('addPostModal'));
        document.getElementById('closeDetailsBtn')?.addEventListener('click', () => this.closeModal('postDetailsModal'));
        document.getElementById('closeContactBtn')?.addEventListener('click', () => this.closeModal('contactModal'));
        document.getElementById('cancelBtn')?.addEventListener('click', () => this.closeModal('addPostModal'));

        // Form submission
        const addPostForm = document.getElementById('addPostForm');
        if (addPostForm) {
            addPostForm.addEventListener('submit', (e) => this.handleAddPost(e));
        }

        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e));
        }

        // Filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMorePosts());
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Close modals on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    loadPosts() {
        const postsContainer = document.getElementById('postsContainer');
        if (!postsContainer) return;

        let filteredPosts = this.getFilteredPosts();
        const postsToShow = filteredPosts.slice(0, this.displayedPosts);

        if (postsToShow.length === 0) {
            postsContainer.innerHTML = this.getEmptyState();
            return;
        }

        postsContainer.innerHTML = postsToShow.map(post => this.createPostCard(post)).join('');

        // Add event listeners to post cards
        this.setupPostEventListeners();

        // Update load more button
        this.updateLoadMoreButton(filteredPosts.length);
    }

    getFilteredPosts() {
        let filtered = this.posts;

        // Filter by category
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(post => post.category === this.currentFilter);
        }

        // Filter by search
        if (this.currentSearch) {
            const searchLower = this.currentSearch.toLowerCase();
            filtered = filtered.filter(post => 
                post.title.toLowerCase().includes(searchLower) ||
                post.description.toLowerCase().includes(searchLower) ||
                post.location.toLowerCase().includes(searchLower)
            );
        }

        // Sort by date (newest first)
        return filtered.sort((a, b) => b.date - a.date);
    }

    createPostCard(post) {
        const timeAgo = this.getTimeAgo(post.date);
        const categoryIcon = this.getCategoryIcon(post.category);
        const categoryName = this.getCategoryName(post.category);

        return `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="post-category ${post.category}">
                        <i class="${categoryIcon}"></i>
                        ${categoryName}
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <div class="post-price">${post.price}</div>
                </div>
                <div class="post-content">
                    <p class="post-description">${post.description}</p>
                    <div class="post-actions">
                        <button class="btn-contact" onclick="halinowOgloszenia.contactPost(${post.id})">
                            <i class="fas fa-phone"></i>
                            Kontakt
                        </button>
                        <button class="btn-details" onclick="halinowOgloszenia.showPostDetails(${post.id})">
                            <i class="fas fa-info-circle"></i>
                            Szczegóły
                        </button>
                    </div>
                </div>
                <div class="post-meta">
                    <div class="post-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${post.location}
                    </div>
                    <div class="post-time">${timeAgo}</div>
                </div>
            </div>
        `;
    }

    setupPostEventListeners() {
        document.querySelectorAll('.post-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const postId = parseInt(card.getAttribute('data-post-id'));
                    this.showPostDetails(postId);
                }
            });
        });
    }

    getEmptyState() {
        return `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Brak ogłoszeń</h3>
                <p>Nie znaleziono ogłoszeń spełniających kryteria wyszukiwania.</p>
                <button class="btn-primary" onclick="halinowOgloszenia.clearFilters()">
                    <i class="fas fa-refresh"></i>
                    Wyczyść filtry
                </button>
            </div>
        `;
    }

    updateLoadMoreButton(totalPosts) {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;

        if (this.displayedPosts >= totalPosts) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
            loadMoreBtn.innerHTML = `
                <i class="fas fa-plus"></i>
                Załaduj więcej (${totalPosts - this.displayedPosts} pozostałych)
            `;
        }
    }

    loadMorePosts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.classList.add('loading');
        }

        // Simulate loading delay
        setTimeout(() => {
            this.displayedPosts += 6;
            this.loadPosts();
            this.isLoading = false;
            
            if (loadMoreBtn) {
                loadMoreBtn.classList.remove('loading');
            }
        }, 500);
    }

    handleSearch(e) {
        this.currentSearch = e.target.value;
        this.displayedPosts = 6; // Reset displayed posts
        this.loadPosts();
    }

    handleFilter(e) {
        const filter = e.currentTarget.getAttribute('data-filter');
        this.currentFilter = filter;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Reset displayed posts and reload
        this.displayedPosts = 6;
        this.loadPosts();
    }

    clearFilters() {
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.displayedPosts = 6;
        
        // Update UI
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        document.getElementById('searchInput').value = '';
        
        this.loadPosts();
    }

    handleAddPost(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newPost = {
            id: Date.now(),
            title: document.getElementById('postTitle').value,
            category: document.getElementById('postCategory').value,
            description: document.getElementById('postDescription').value,
            price: document.getElementById('postPrice').value || 'Do uzgodnienia',
            location: document.getElementById('postLocation').value,
            contact: document.getElementById('postContact').value,
            author: document.getElementById('postName').value || 'Anonimowy',
            date: new Date(),
            views: 0
        };
        
        this.posts.unshift(newPost);
        this.loadPosts();
        this.updateStats();
        this.closeModal('addPostModal');
        
        // Reset form
        e.target.reset();
    }

    showPostDetails(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        const modalTitle = document.getElementById('modalPostTitle');
        const postDetails = document.getElementById('postDetails');
        
        if (modalTitle) {
            modalTitle.textContent = post.title;
        }
        
        if (postDetails) {
            postDetails.innerHTML = `
                <div class="detail-item">
                    <div class="detail-label">Kategoria</div>
                    <div class="detail-value">
                        <span class="post-category ${post.category}">
                            <i class="${this.getCategoryIcon(post.category)}"></i>
                            ${this.getCategoryName(post.category)}
                        </span>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Cena</div>
                    <div class="detail-value">${post.price}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Opis</div>
                    <div class="detail-value">${post.description}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Lokalizacja</div>
                    <div class="detail-value">
                        <i class="fas fa-map-marker-alt"></i>
                        ${post.location}
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Autor</div>
                    <div class="detail-value">${post.author}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Data publikacji</div>
                    <div class="detail-value">${this.formatDate(post.date)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Wyświetlenia</div>
                    <div class="detail-value">${post.views}</div>
                </div>
                <div class="form-actions">
                    <button class="btn-primary" onclick="halinowOgloszenia.contactPost(${post.id})">
                        <i class="fas fa-phone"></i>
                        Skontaktuj się
                    </button>
                </div>
            `;
        }
        
        this.openModal('postDetailsModal');
        
        // Increment views
        post.views++;
    }

    contactPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        const contactInfo = document.getElementById('contactInfo');
        if (contactInfo) {
            contactInfo.innerHTML = `
                <div class="contact-item">
                    <h4>${post.title}</h4>
                    <p>Autor: ${post.author}</p>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <strong>Kontakt:</strong> ${post.contact}
                </div>
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <strong>Lokalizacja:</strong> ${post.location}
                </div>
                <div class="contact-item">
                    <i class="fas fa-tag"></i>
                    <strong>Cena:</strong> ${post.price}
                </div>
                <div class="form-actions">
                    <button class="btn-primary" onclick="halinowOgloszenia.copyContact('${post.contact}')">
                        <i class="fas fa-copy"></i>
                        Skopiuj kontakt
                    </button>
                </div>
            `;
        }
        
        this.openModal('contactModal');
    }

    copyContact(contact) {
        navigator.clipboard.writeText(contact);
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }

    updateStats() {
        const totalPosts = this.posts.length;
        const todayPosts = this.posts.filter(post => {
            const today = new Date();
            const postDate = new Date(post.date);
            return postDate.toDateString() === today.toDateString();
        }).length;
        
        const activeUsers = new Set(this.posts.map(post => post.author)).size;

        document.getElementById('totalPosts').textContent = totalPosts;
        document.getElementById('todayPosts').textContent = todayPosts;
        document.getElementById('activeUsers').textContent = activeUsers;
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(notification);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Utility functions
    getCategoryIcon(category) {
        const icons = {
            'sprzedaz': 'fas fa-tag',
            'kupno': 'fas fa-shopping-cart',
            'pomoc': 'fas fa-hands-helping',
            'uslugi': 'fas fa-tools'
        };
        return icons[category] || 'fas fa-question-circle';
    }

    getCategoryName(category) {
        const names = {
            'sprzedaz': 'Sprzedaż',
            'kupno': 'Kupno',
            'pomoc': 'Pomoc',
            'uslugi': 'Usługi'
        };
        return names[category] || category;
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };
        return icons[type] || 'fa-info-circle';
    }

    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 60) {
            return `${minutes} min temu`;
        } else if (hours < 24) {
            return `${hours} godz. temu`;
        } else {
            return `${days} dni temu`;
        }
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    // Theme functions
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.setupTheme();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.halinowOgloszenia = new HalinowOgloszenia();
});

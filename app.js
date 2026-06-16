// app.js

const versions = [
    {
        version: "v1.0.1",
        apk: "cozy-latest-v1/cozy-latest-v1.zip",
        size: "25.9 MB",
        date: "2026-06-20",
        changelog: {
            features: ["Added dark mode toggle in profile", "New 'Gaming' community space"],
            improvements: ["Faster image loading in chats", "UI adjustments for smaller screens"],
            fixes: ["Fixed a crash when switching spaces quickly"]
        }
    },
    {
        version: "v1.0.0",
        apk: "downloads/cozy-v1.0.0.apk",
        size: "18.0 MB",
        date: "2026-06-15",
        changelog: {
            features: ["Public community spaces", "Private messaging", "Real-time chat"],
            improvements: ["Enhanced UI responsiveness", "Optimized battery usage"],
            fixes: ["Fixed login screen glitch"]
        }
    },
    {
        version: "v0.9.0",
        apk: "downloads/cozy-v0.9.0.apk",
        size: "16.5 MB",
        date: "2026-06-01",
        changelog: {
            features: ["Initial beta release", "Basic profile setup"],
            improvements: [],
            fixes: []
        }
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const latestVersion = versions[0];
    const olderVersions = versions.slice(1);

    // Populate Hero Download button
    const heroDownloadBtn = document.getElementById('hero-download-btn');
    if(heroDownloadBtn) {
        heroDownloadBtn.href = latestVersion.apk;
    }

    // Populate Main Download Section
    const currentVersionEl = document.getElementById('current-version');
    const releaseDateEl = document.getElementById('release-date');
    const apkSizeEl = document.getElementById('apk-size');
    const mainDownloadBtn = document.getElementById('main-download-btn');
    const mainChangelogBtn = document.querySelector('#download .view-changelog-btn');

    if(currentVersionEl) currentVersionEl.textContent = latestVersion.version;
    if(releaseDateEl) releaseDateEl.textContent = latestVersion.date;
    if(apkSizeEl) apkSizeEl.textContent = latestVersion.size;
    if(mainDownloadBtn) mainDownloadBtn.href = latestVersion.apk;
    if(mainChangelogBtn) mainChangelogBtn.dataset.version = latestVersion.version;

    // Populate Older Versions
    const olderVersionsContainer = document.getElementById('older-versions-container');
    if(olderVersionsContainer) {
        olderVersions.forEach(ver => {
            const card = document.createElement('div');
            card.className = 'bg-white shadow-sm p-6 rounded-[2rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:-translate-y-1 transition';
            card.innerHTML = `
                <div>
                    <h3 class="text-xl font-extrabold text-cozy-text flex items-center gap-2 lowercase">${ver.version}</h3>
                    <p class="text-cozy-textlight font-medium text-sm mt-1 lowercase">released: ${ver.date} &bull; size: ${ver.size}</p>
                </div>
                <div class="flex gap-3 w-full sm:w-auto">
                    <button class="view-changelog-btn text-sm font-bold px-6 py-3 rounded-full bg-cozy-bg hover:bg-gray-100 text-cozy-text transition flex-1 sm:flex-none lowercase" data-version="${ver.version}">changelog</button>
                    <a href="${ver.apk}" download class="text-sm font-bold px-6 py-3 rounded-full bg-cozy-pink hover:bg-cozy-pinkdark text-white transition flex items-center justify-center gap-2 flex-1 sm:flex-none lowercase">
                        download
                    </a>
                </div>
            `;
            olderVersionsContainer.appendChild(card);
        });
    }

    // Changelog Modal Logic
    const modal = document.getElementById('changelog-modal');
    const modalCloseBtn = document.getElementById('close-modal-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    
    const modalVersion = document.getElementById('modal-version');
    const modalFeaturesList = document.getElementById('modal-features');
    const modalImprovementsList = document.getElementById('modal-improvements');
    const modalFixesList = document.getElementById('modal-fixes');

    const modalFeaturesContainer = document.getElementById('modal-features-container');
    const modalImprovementsContainer = document.getElementById('modal-improvements-container');
    const modalFixesContainer = document.getElementById('modal-fixes-container');

    const openModal = (versionStr) => {
        const verData = versions.find(v => v.version === versionStr);
        if(!verData) return;

        modalVersion.textContent = `Changelog ${verData.version}`;
        
        // Render features
        if(verData.changelog && verData.changelog.features && verData.changelog.features.length > 0) {
            modalFeaturesContainer.classList.remove('hidden');
            modalFeaturesList.innerHTML = verData.changelog.features.map(f => `<li class="flex items-start gap-3"><span class="text-cozy-pink mt-1">&bull;</span>${f}</li>`).join('');
        } else {
            modalFeaturesContainer.classList.add('hidden');
        }

        // Render improvements
        if(verData.changelog && verData.changelog.improvements && verData.changelog.improvements.length > 0) {
            modalImprovementsContainer.classList.remove('hidden');
            modalImprovementsList.innerHTML = verData.changelog.improvements.map(i => `<li class="flex items-start gap-3"><span class="text-cozy-pink mt-1">&bull;</span>${i}</li>`).join('');
        } else {
            modalImprovementsContainer.classList.add('hidden');
        }

        // Render fixes
        if(verData.changelog && verData.changelog.fixes && verData.changelog.fixes.length > 0) {
            modalFixesContainer.classList.remove('hidden');
            modalFixesList.innerHTML = verData.changelog.fixes.map(f => `<li class="flex items-start gap-3"><span class="text-cozy-pink mt-1">&bull;</span>${f}</li>`).join('');
        } else {
            modalFixesContainer.classList.add('hidden');
        }

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100');
        modal.querySelector('.modal-content').classList.remove('scale-95', 'translate-y-4');
        modal.querySelector('.modal-content').classList.add('scale-100', 'translate-y-0');
        document.body.style.overflow = 'hidden'; // Prevent scrolling in background
    };

    const closeModal = () => {
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('.modal-content').classList.remove('scale-100', 'translate-y-0');
        modal.querySelector('.modal-content').classList.add('scale-95', 'translate-y-4');
        document.body.style.overflow = ''; // Restore scrolling
    };

    document.addEventListener('click', (e) => {
        if(e.target.closest('.view-changelog-btn')) {
            const versionStr = e.target.closest('.view-changelog-btn').dataset.version;
            openModal(versionStr);
        }
    });

    if(modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if(modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Screenshots Carousel Logic
    const screenshots = [
        "screenshots/1.jpg",
        "screenshots/2.jpg",
        "screenshots/3.jpg"
    ];
    let currentIndex = 1;

    const carouselContainer = document.getElementById('screenshot-carousel');
    
    function renderCarousel() {
        if(!carouselContainer) return;
        carouselContainer.innerHTML = '';
        
        screenshots.forEach((src, i) => {
            const div = document.createElement('div');
            div.className = 'absolute transition-all duration-500 ease-out cursor-pointer';
            
            let diff = i - currentIndex;
            if (diff === -2) diff = 1;
            if (diff === 2) diff = -1;

            if (diff === 0) {
                // Center
                div.className += ' z-30 translate-x-0 rotate-0 scale-100 blur-none opacity-100 drop-shadow-2xl';
            } else if (diff === -1) {
                // Left
                div.className += ' z-10 -translate-x-24 md:-translate-x-48 -rotate-12 scale-90 blur-[2px] opacity-60 hover:opacity-100 drop-shadow-lg';
            } else if (diff === 1) {
                // Right
                div.className += ' z-10 translate-x-24 md:translate-x-48 rotate-12 scale-90 blur-[2px] opacity-60 hover:opacity-100 drop-shadow-lg';
            }

            div.addEventListener('click', () => {
                currentIndex = i;
                renderCarousel();
            });

            const img = document.createElement('img');
            img.src = src;
            img.alt = `Screenshot ${i+1}`;
            // Remove border, bg-white, and fixed width to allow transparent corners
            img.className = "h-[450px] md:h-[550px] w-auto object-contain pointer-events-none";
            
            const colors = ['#fef3e9', '#e6f5ea', '#f1e5fa'];
            
            img.onerror = function() {
                this.onerror = null; // Prevent infinite loops
                const fallback = document.createElement('div');
                fallback.className = img.className + " flex flex-col items-center justify-center text-cozy-text/50 font-bold text-lg text-center p-6 shadow-inner";
                fallback.style.backgroundColor = colors[i];
                fallback.innerHTML = `<span class="mb-2">⚠️ Missing Image</span><span>Save as<br>screenshots/${i+1}.jpg</span>`;
                div.replaceChild(fallback, img);
            };

            div.appendChild(img);
            carouselContainer.appendChild(div);
        });
    }

    renderCarousel();

    // FAQ Accordion
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
                content.classList.remove('mt-4');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // Remove loading overlay
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    });
});

/* ============================================================
   EDUBOOST - CORE JAVASCRIPT (FINAL REVISED)
   ============================================================ */

// --- A. FUNGSI GLOBAL MODAL ---
// (Dibuat global agar bisa diakses langsung via onclick di HTML)

window.toggleModal = function(modalId, action) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (action === 'open') {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Stop scroll background
    } else {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Aktifkan scroll lagi
        
        // Khusus Demo Modal: Reset video agar suara berhenti
        if (modalId === 'demoModal') {
            const iframe = modal.querySelector('iframe');
            if (iframe) iframe.src = iframe.src;
        }
    }
};

// Fungsi spesifik untuk mempermudah pemanggilan di HTML
window.openPricing = () => toggleModal('pricingModal', 'open');
window.closePricing = () => toggleModal('pricingModal', 'close');
window.openDemo = () => toggleModal('demoModal', 'open');
window.closeDemo = () => toggleModal('demoModal', 'close');

// Fungsi Auth (Login/Signup)
window.openAuth = (mode) => {
    toggleModal('authModal', 'open');
    switchAuth(mode);
};
window.closeAuth = () => toggleModal('authModal', 'close');

window.switchAuth = (mode) => {
    const loginSection = document.getElementById('loginSection');
    const signupSection = document.getElementById('signupSection');
    if (!loginSection || !signupSection) return;

    if (mode === 'login') {
        loginSection.style.display = 'block';
        signupSection.style.display = 'none';
    } else {
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
    }
};

// --- B. DARK MODE LOGIC ---

window.toggleDarkMode = function() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    const isDark = body.classList.toggle('dark-mode');
    
    // Ganti ikon & simpan preferensi
    if (isDark) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
};

// --- C. EVENT LISTENER (Saat Halaman Siap) ---

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('navLinks');

    // 1. Cek Preferensi Dark Mode dari LocalStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    // 2. Menutup Modal saat Klik Area Gelap (Overlay)
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Matikan video jika yang ditutup adalah demoModal
            if (event.target.id === 'demoModal') {
                const iframe = event.target.querySelector('iframe');
                if (iframe) iframe.src = iframe.src;
            }
        }
    };

    // 3. Navbar Mobile Toggle
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 4. Smooth Scroll & Auto-Close Mobile Menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                if (navLinks) navLinks.classList.remove('active');
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. Consolidated Scroll Reveal Logic
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    console.log("EduBoost: Sistem Aktif & Fitur Lengkap!");
});

const loginForm = document.getElementById('login-form'); // Ganti dengan ID form lu
const loginBtn = document.getElementById('login-btn');
const btnText = loginBtn.querySelector('.btn-text');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah refresh halaman langsung

    // 1. Aktifkan efek loading
    loginBtn.classList.add('loading');
    btnText.innerText = 'Memproses...'; 
    loginBtn.disabled = true;

    // 2. Simulasi proses (misal cek ke database selama 2 detik)
    setTimeout(() => {
        // Di sini biasanya lu masukin logika validasi akun
        // Kalau berhasil, pindah halaman:
        window.location.href = 'dashboard.html'; 
        
        // Kalau gagal, balikin tombolnya (opsional):
        // loginBtn.classList.remove('loading');
        // btnText.innerText = 'Masuk';
        // loginBtn.disabled = false;
    }, 2000); 
});



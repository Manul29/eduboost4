// ==========================================
// 1. DATABASE MATERI (Hierarki 4 Level)
// ==========================================
const dbMateri = {
    classes: [
        { id: 'k10', title: 'Kelas 10 Umum', icon: 'fa-school', color: '#4f46e5', desc: 'Materi Dasar' },
        { id: 'k11', title: 'Kelas 11 Umum', icon: 'fa-microscope', color: '#10b981', desc: 'Kurikulum Merdeka' },
        { id: 'k12', title:'Kelas 12 Umum', icon: '', color: 'orange', desc:'Kurikulum Merdeka'}
    ],
    subjects: {
        'k11': [
            { id: 'bio-11', name: 'Biologi', icon: 'fa-dna' },
            { id: 'fis-11', name: 'Fisika', icon: 'fa-bolt' },
            { id: 'kim-11', name: 'Kimia', icon: 'fa-flask' },
            { id: 'sej-11', name: 'Sejarah', icon: 'fa-history' },
        ]
    },
    // LEVEL BAB
    chapters: {
        'bio-11': [
            { id: 'bio11-b1', title: 'Sel', desc: 'Unit terkecil kehidupan.' },
            { id: 'bio11-b2', title: 'Struktur Jaringan', desc: 'Jaringan tumbuhan dan hewan.' },
        ],

        'kim-11': [
            {id: 'kim11-b1', title: 'Ikatan Kimia ', desc: ''},
            {id: 'kim11-b2', title: 'Stoikiometri', desc: ''},
            {id: 'kim11-b3', title: 'Hidrokarbon ', desc: ''},
            {id: 'kim11-b4', title: 'Termokimia', desc: ''},
            {id: 'kim11-b5', title: 'Kinetika Kimia', desc: ''},
            {id: 'kim11-b6', title: 'Kesetimbangan Kimia', desc: ''},
        ],

        'sej-11': [
            {id: 'sej11-b1', title: 'Belanda Ke Indonesia', desc:''},
        ],
    },
    // LEVEL SUB-BAB (Materi Detail)
    subChapters: {
        'bio11-b1': [
            { id: 'm1', title: 'Komponen Kimiawi Sel', vid: 'https://www.youtube.com/embed/dQw4w9WgXcQ', pdf: '#' },
            { id: 'm2', title: 'Organel Sel Hewan', vid: 'https://www.youtube.com/embed/dQw4w9WgXcQ', pdf: '#' },
            { id: 'm3', title: 'Organel Sel Tumbuhan', vid: 'https://www.youtube.com/embed/dQw4w9WgXcQ', pdf: '#' },
            { id: 'm4', title: 'Transpor Membran', vid: 'https://www.youtube.com/embed/dQw4w9WgXcQ', pdf: '#' }
        ],

        'kim11-b1': [
            { id: 'm1', title:'......', vid: '.....', pdf:'..'}
        ],

        'sej11-b1': [
            { id: 'm1', title:'......', vid: '.....', pdf:'..'}
        ]
    }
};

//===========================================
// ACHIEVMENT
//===========================================
const dbAchievements = [
    { id: 'ach-kim-1', title: 'Newborn Chemist', desc: 'Menyelesaikan Bab 1 Kimia', icon: 'ri-flask-line', color: '#fbbf24', reqSubject: 'kim-11', reqCount: 1 },
    { id: 'ach-bio-1', title: 'Cell Explorer', desc: 'Menyelesaikan Bab 1 Biologi', icon: 'ri-microscope-line', color: '#10b981', reqSubject: 'bio-11', reqCount: 1 },
    { id: 'ach-fis-1', title: 'Newton Junior', desc: 'Menyelesaikan Bab 1 Fisika', icon: 'ri-flashlight-line', color: '#3b82f6', reqSubject: 'fis-11', reqCount: 1 },
    { id: 'ach-master', title: 'Science God', desc: 'Menyelesaikan semua materi', icon: 'ri-medal-fill', color: '#a855f7', reqSubject: 'all', reqCount: 99 }
];

// ==========================================
// 2. STATE & NAVIGATION
// ==========================================
let currentLevel = 'jenjang'; 
let activeClassId = ''; 
let activeSubjectId = '';
let activeChapterId = '';

document.addEventListener('DOMContentLoaded', () => {
    // Navigasi Section Sidebar
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const target = item.getAttribute('data-section');
            if(!target) return;
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(target).classList.add('active');
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });

    renderJenjang();

    document.getElementById('btn-back-materi').addEventListener('click', () => {
        if (currentLevel === 'konten') renderSubChapters(activeChapterId);
        else if (currentLevel === 'subbab') renderChapters(activeSubjectId);
        else if (currentLevel === 'bab') renderMapel(activeClassId);
        else if (currentLevel === 'mapel') renderJenjang();
    });
});

// --- Logika Sidebar ---
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('sidebar-toggle'); // Pastikan ID ini sama dengan di HTML
const mainContent = document.querySelector('.main-content');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        // Cek lebar layar
        if (window.innerWidth > 992) {
            // Mode Desktop: Ciutkan sidebar
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        } else {
            // Mode Mobile: Munculkan/Sembunyikan dari samping
            sidebar.classList.toggle('active');
        }
    });
}
// ==========================================
// 3. RENDER FUNCTIONS
// ==========================================

function renderJenjang() {
    currentLevel = 'jenjang';
    const container = document.getElementById('materi-render-container');
    container.className = "materi-grid";
    document.getElementById('materi-display-title').innerText = "Pilih Jenjang Kelas";
    document.getElementById('btn-back-materi').style.display = 'none';

    container.innerHTML = dbMateri.classes.map(cls => `
        <div class="card-materi" onclick="renderMapel('${cls.id}')">
            <i class="fas ${cls.icon}" style="color: ${cls.color}"></i>
            <h4>${cls.title}</h4>
            <p>${cls.desc}</p>
        </div>
    `).join('');
}

function renderMapel(classId) {
    currentLevel = 'mapel';
    activeClassId = classId;
    const container = document.getElementById('materi-render-container');
    container.className = "materi-grid";
    document.getElementById('materi-display-title').innerText = "Pilih Mata Pelajaran";
    document.getElementById('btn-back-materi').style.display = 'inline-block';

    const subjects = dbMateri.subjects[classId] || [];
    container.innerHTML = subjects.map(sub => `
        <div class="card-materi" onclick="renderChapters('${sub.id}')">
            <i class="fas ${sub.icon}" style="color: var(--primary)"></i>
            <h4>${sub.name}</h4>
        </div>
    `).join('');
}

function renderChapters(subjectId) {
    currentLevel = 'bab';
    activeSubjectId = subjectId;
    const container = document.getElementById('materi-render-container');
    container.className = "materi-grid"; // Bab masih pakai grid biar cakep
    document.getElementById('materi-display-title').innerText = "Pilih Bab";

    const chapters = dbMateri.chapters[subjectId] || [];
    container.innerHTML = chapters.map(bab => `
        <div class="card-materi bab-card" onclick="renderSubChapters('${bab.id}')">
            <i class="fas fa-book-open" style="color: #f59e0b"></i>
            <h4>${bab.title}</h4>
            <p>${bab.desc}</p>
        </div>
    `).join('');
}

function renderSubChapters(chapterId) {
    currentLevel = 'subbab';
    activeChapterId = chapterId;
    const container = document.getElementById('materi-render-container');
    container.className = "learning-container";
    document.getElementById('materi-display-title').innerText = "Daftar Materi / Sub-Bab";

    const listMateri = dbMateri.subChapters[chapterId] || [];
    container.innerHTML = `
        <div class="subject-card">
            ${listMateri.map((m, index) => `
                <div class="material-item subbab-item">
                    <div class="mat-info">
                        <span class="mat-title">${index + 1}. ${m.title}</span>
                    </div>
                    <div class="links">
                        <a href="#" onclick="renderPlayer('${chapterId}', '${m.id}')" class="link-vid">
                            <i class="fas fa-play-circle"></i> Video
                        </a>
                        <a href="${m.pdf}" target="_blank" class="link-pdf">
                            <i class="fas fa-file-pdf"></i> PDF
                        </a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderPlayer(chapterId, materiId) {
    currentLevel = 'konten';
    const container = document.getElementById('materi-render-container');
    const materi = dbMateri.subChapters[chapterId].find(m => m.id === materiId);

    container.innerHTML = `
        <div class="content-viewer" style="background: #fff; padding: 20px; border-radius: 15px; width: 100%;">
            <div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; background: #000;">
                <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="${materi.vid}" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="content-text" style="margin-top: 20px;">
                <h3>${materi.title}</h3>
                <button class="btn-join" onclick="window.open('${materi.pdf}')" style="margin-top:10px; background:#0ea5e9">
                    <i class="fas fa-download"></i> Download PDF Materi
                </button>
            </div>
        </div>
    `;
}
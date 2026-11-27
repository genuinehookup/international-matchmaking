document.addEventListener('DOMContentLoaded', () => {
    const termsModal = document.getElementById('termsModal');
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const proceedBtn = document.getElementById('proceedBtn');

    // LANDING PAGE & HEADER ELEMENTS
    const startBtn = document.getElementById('startBtn');
    const landingHero = document.getElementById('landingHero');
    const mainContent = document.getElementById('mainContent');
    const titleTicker = document.getElementById('titleTicker');
    const locationBtn = document.getElementById('locationBtn');

    // MODALS
    const locationModal = document.getElementById('locationModal');
    const closeLocationBtn = document.getElementById('closeLocationBtn');
    
    // FAQ ELEMENTS
    const faqBtn = document.getElementById('faqBtn');
    const faqModal = document.getElementById('faqModal');
    const closeFaqBtn = document.getElementById('closeFaqBtn');

    // CONNECT & PAYMENT MODAL ELEMENTS
    const connectModal = document.getElementById('connectModal');
    const connectModalTitle = document.getElementById('connectModalTitle');
    const connectFormStep = document.getElementById('connectFormStep');
    const paymentStep = document.getElementById('paymentStep');
    const connectSendStep = document.getElementById('connectSendStep');
    const previewBtn = document.getElementById('previewBtn');
    const confirmPackageBtn = document.getElementById('confirmPackageBtn');
    const backToFormBtn = document.getElementById('backToFormBtn');
    const c_about = document.getElementById('c_about');
    const charCount = document.getElementById('charCount');

    // HOW IT WORKS MODAL ELEMENTS
    const howItWorksModal = document.getElementById('howItWorksModal');
    const howItWorksBtn = document.getElementById('howItWorksBtn');
    const closeHowItWorksBtn = document.getElementById('closeHowItWorksBtn');

    // FLOATING CONTACT ELEMENTS
    const floatingContactBtn = document.getElementById('floatingContactBtn');
    const contactPopup = document.getElementById('contactPopup');
    const floatWhatsapp = document.getElementById('floatWhatsapp');
    const floatTelegram = document.getElementById('floatTelegram');
    const floatEmail = document.getElementById('floatEmail');

    // DIRECTOR'S CONTACT DETAILS
    const DIRECTOR_WHATSAPP = "447828793007"; 
    const DIRECTOR_TELEGRAM = "Contactadminaggrey"; 
    const DIRECTOR_EMAIL = "genuinehookupconnection@gmail.com";

    let currentProfileName = "";
    let allProfilesData = [];
    
    // --- START BUTTON LOGIC ---
    if (startBtn) {
        startBtn.addEventListener('click', async () => {
            // 1. Hide landing page and static title
            landingHero.classList.add('hidden');
            if (titleTicker) titleTicker.classList.add('hidden');
            
            // 2. Show main content
            mainContent.classList.remove('hidden');
            
            // 3. Show the Location link in the header
            if (locationBtn) locationBtn.classList.remove('hidden');
            
            // 4. Scroll to top
            window.scrollTo(0, 0); 

            // 5. Load the profiles immediately
            try {
                const response = await fetch('profiles.json');
                if (!response.ok) throw new Error("Could not load profiles.json.");
                allProfilesData = await response.json();
                displayMatches(allProfilesData);
            } catch (error) {
                console.error("Error:", error);
                alert("Error loading profiles: " + error.message);
            }
        });
    }

    // --- LOCATION MODAL LOGIC ---
    if (locationBtn) {
        locationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            locationModal.classList.remove('hidden');
        });
    }

    if (closeLocationBtn) {
        closeLocationBtn.addEventListener('click', () => {
            locationModal.classList.add('hidden');
        });
    }

    // --- FAQ MODAL LOGIC ---
    if (faqBtn) {
        faqBtn.addEventListener('click', (e) => {
            e.preventDefault();
            faqModal.classList.remove('hidden');
        });
    }

    if (closeFaqBtn) {
        closeFaqBtn.addEventListener('click', () => {
            faqModal.classList.add('hidden');
        });
    }

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.classList.toggle('active');
            
            faqQuestions.forEach(q => {
                if (q !== this && q.parentElement.classList.contains('active')) {
                    q.parentElement.classList.remove('active');
                }
            });
        });
    });

    // --- TESTIMONIALS DATA ---
    const names = ["Sarah", "David", "Amina", "James", "Grace", "Mark", "Elena", "John", "Fatima", "Peter", "Chloe", "Michael", "Zainab", "Robert", "Blessing", "Thomas", "Maria", "Kevin", "Joyce", "Brian", "Ruth", "Daniel", "Esther", "Paul", "Linda", "Samuel", "Fatou", "Victor", "Mercy", "George", "Aisha", "Simon", "Patience", "Emmanuel", "Joy", "Stephen", "Hannah", "Dennis", "Cynthia", "Francis", "Beatrice", "Charles", "Martha", "Isaac", "Lydia", "Patrick", "Rebecca", "Joseph", "Deborah", "Isaac", "Andrew", "Martha", "Philip", "Keziah", "Henry", "Naomi", "Martin", "Priscilla", "Timothy"];
    const locations = ["London, UK", "Toronto, Canada", "Nairobi, Kenya", "Texas, USA", "Lagos, Nigeria", "Sydney, Australia", "Moscow, Russia", "Florida, USA", "Dubai, UAE", "Berlin, Germany", "Paris, France", "Chicago, USA", "Mombasa, Kenya", "Houston, USA", "Abuja, Nigeria", "Auckland, NZ", "Madrid, Spain", "Los Angeles, USA", "Kampala, Uganda", "Dublin, Ireland", "Accra, Ghana", "Vancouver, Canada", "Johannesburg, SA", "Atlanta, USA", "Kigali, Rwanda", "Perth, Australia"];
    const texts = [
        "I was about to give up on love. The Director personally matched me with my beautiful partner. We are now married!",
        "The VIP package was worth every penny. I met my soulmate 3 weeks later. The process was so safe and private.",
        "Very genuine platform. No time wasters. The vetting process is real. Thank you Director!",
        "I never thought I would find a woman who shares my values until I joined this platform.",
        "The Director guided me through the whole process. I am now engaged to a wonderful man.",
        "Professional service. The people here are real and serious about marriage. Highly recommend.",
        "I found my soulmate here. The process was smooth, respectful, and very fast.",
        "Best investment I ever made. Found a loving wife and built a beautiful family.",
        "Respectful, private and very professional. I felt safe the entire time.",
        "The team is amazing. They really listen to what you want in a partner.",
        "I was nervous at first, but the Director was very kind and helpful. Now I am happily married.",
        "No games, no fake profiles. Just genuine people looking for love. Thank you!",
        "My dream came true. I met a God-fearing man who loves me and my family.",
        "The VIP service is worth it. I got personal attention and met my match quickly.",
        "I am so happy I took the chance. The Director is a true matchmaker.",
        "Found a beautiful woman. The cultural differences don't matter when there is love.",
        "Very discreet and professional. I felt respected and valued.",
        "I recommend this to any serious man looking for a real woman. 5 stars!",
        "I was a single mother and thought no one would want me. Now I am happily engaged.",
        "The Director is very honest. He told me exactly what to expect. Great experience.",
        "Thank you for helping me find my best friend and lover. We are planning our wedding.",
        "It's hard to find genuine connections online, but this platform is different.",
        "The safest way to meet a foreign partner. I felt protected throughout.",
        "I found my African queen here. She is everything I prayed for.",
        "This platform changed my life. I finally found the love I deserved.",
        "I love how the Director vets everyone. It makes the process so much easier."
    ];

    async function loadTestimonials() {
        const testimonialTrack = document.getElementById('testimonialTrack');
        if (!testimonialTrack) return;

        try {
            const response = await fetch('https://randomuser.me/api/?results=50');
            const data = await response.json();
            
            let slidesHTML = '';

            data.results.forEach((user) => {
                const name = names[Math.floor(Math.random() * names.length)] + " " + user.name.last.charAt(0) + ".";
                const loc = locations[Math.floor(Math.random() * locations.length)];
                const text = texts[Math.floor(Math.random() * texts.length)];
                const photo = user.picture.medium;

                slidesHTML += `
                    <div class="testimonial-card">
                        <div class="testimonial-header">
                            <img src="${photo}" alt="${name}" class="testimonial-avatar">
                            <div class="testimonial-info">
                                <h4>${name} <span class="verified-badge-small">✔</span></h4>
                                <p>${loc}</p>
                            </div>
                        </div>
                        <p class="testimonial-text">"${text}"</p>
                    </div>
                `;
            });

            testimonialTrack.innerHTML = slidesHTML + slidesHTML;

        } catch (error) {
            console.error("Could not load testimonials", error);
        }
    }

    // Load testimonials immediately on page load (since they are on landing page)
    loadTestimonials();

    // --- LIVE TICKER DATA ---
    const firstNames = ["David", "James", "Michael", "John", "Robert", "William", "Richard", "Joseph", "Thomas", "Charles", "Sarah", "Emma", "Olivia", "Sophia", "Isabella", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
    const times = ["just now", "1 min ago", "3 mins ago", "5 mins ago", "12 mins ago", "30 mins ago", "1 hour ago", "2 hours ago"];

    function getRandomName() {
        const first = firstNames[Math.floor(Math.random() * firstNames.length)];
        const last = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${first} ${last}`;
    }

    function getRandomTime() {
        return times[Math.floor(Math.random() * times.length)];
    }

    function createTickerSlides() {
        const track = document.getElementById('tickerTrack');
        if (!track) return;

        let slidesHTML = '';
        for (let i = 0; i < 15; i++) {
            const man = getRandomName();
            const woman = getRandomName().split(' ')[0]; 
            const time = getRandomTime();
            
            slidesHTML += `
                <div class="ticker-item">
                    <span class="dot">🟢</span>
                    <span>${man} & ${woman} just connected</span>
                    <span class="time">(${time})</span>
                </div>
            `;
        }
        
        track.innerHTML = slidesHTML + slidesHTML;
    }

    // --- HOW IT WORKS LOGIC ---
    howItWorksBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        howItWorksModal.classList.remove('hidden');
    });

    closeHowItWorksBtn.addEventListener('click', () => {
        howItWorksModal.classList.add('hidden');
    });

    // --- FLOATING CONTACT BUTTON LOGIC ---
    const contactMessage = encodeURIComponent("Hello Management, I am on the International-Matchmaking website and I have a question.");
    
    floatWhatsapp.href = `https://wa.me/${DIRECTOR_WHATSAPP}?text=${contactMessage}`;
    floatTelegram.href = `https://t.me/${DIRECTOR_TELEGRAM}`; 
    floatEmail.href = `mailto:${DIRECTOR_EMAIL}?subject=Question about International-Matchmaking`;

    floatingContactBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        contactPopup.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!contactPopup.classList.contains('hidden') && !contactPopup.contains(e.target) && e.target !== floatingContactBtn) {
            contactPopup.classList.add('hidden');
        }
    });

    // --- CHECKBOX LOGIC (Terms) ---
    agreeCheckbox.addEventListener('change', function() {
        proceedBtn.disabled = !this.checked;
    });

    // --- DISPLAY MATCHES (The Men) ---
    function displayMatches(matches) {
        const grid = document.getElementById('profileGrid');
        grid.innerHTML = ''; 

        createTickerSlides();

        matches.forEach(profile => {
            const card = document.createElement('div');
            card.className = 'profile-card';
            
            card.innerHTML = `
                <div class="card-top-bar">
                    <div class="profile-icon-wrapper">
                        <div class="profile-icon-ring">
                            <img class="profile-icon-img" src="${profile.image}" alt="${profile.name}">
                        </div>
                        <div class="active-dot"></div>
                    </div>
                    <div class="card-header-info">
                        <h3>${profile.name} <span style="color: var(--accent-gold); font-size: 0.9rem;">🛡️</span></h3>
                        <p class="active-text">Active Now</p>
                    </div>
                </div>

                <div class="card-image-container">
                    <img src="${profile.image}" alt="${profile.name}">
                </div>
                
                <div class="card-info">
                    <div class="card-header">
                        <h3>${profile.name}, ${profile.age}</h3>
                        <p>📍 ${profile.location} | 💼 ${profile.profession}</p>
                    </div>
                    
                    <div class="quick-stats">
                        <div>✝️ ${profile.religion}</div>
                        <div>👶 ${profile.children}</div>
                    </div>

                    <div class="bio-section">
                        <h4>❤️ What I am looking for</h4>
                        <p>${profile.lookingFor}</p>
                    </div>

                    ${profile.aboutMe ? `
                    <div class="bio-section">
                        <h4>🌹 A Little About Me</h4>
                        <p>${profile.aboutMe}</p>
                    </div>` : ''}

                    <div class="intentions-box">
                        <h4>✈️ My Intentions</h4>
                        <p>${profile.intentions}</p>
                    </div>

                    ${profile.goal ? `
                    <div class="bio-section" style="margin-top: 15px;">
                        <h4>💖 My Goal</h4>
                        <p>${profile.goal}</p>
                    </div>` : ''}

                    <button class="btn-contact" onclick="openConnectForm('${profile.name}')">Connect</button>
                </div>
            `;
            
            grid.appendChild(card);
        });
    }

    // --- CONNECT LOGIC (Terms First, then Form) ---
    window.openConnectForm = function(profileName) {
        currentProfileName = profileName;
        
        // 1. Show the Terms Modal first
        termsModal.classList.remove('hidden');
        
        // 2. Setup the Proceed button to show the Form when clicked
        proceedBtn.onclick = function() {
            termsModal.classList.add('hidden'); // Hide Terms
            
            // Setup the form modal
            connectModalTitle.innerHTML = `Request Connection with ${currentProfileName}`;
            connectFormStep.classList.remove('hidden');
            paymentStep.classList.add('hidden');
            connectSendStep.classList.add('hidden');
            
            // Show the form modal
            connectModal.classList.remove('hidden');
        };
    };

    c_about.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCount.textContent = `${currentLength} / 800 characters`;
        if (currentLength >= 800) {
            charCount.style.color = 'var(--accent-red)';
        } else {
            charCount.style.color = 'var(--text-muted)';
        }
    });

    previewBtn.addEventListener('click', function() {
        if (c_about.value.trim() === "") {
            alert("Please write a short description about yourself.");
            return;
        }

        connectFormStep.classList.add('hidden');
        paymentStep.classList.remove('hidden');
    });

    confirmPackageBtn.addEventListener('click', function() {
        const selectedPackage = document.querySelector('input[name="package"]:checked').value;

        const fullName = document.getElementById('c_fullName').value;
        const age = document.getElementById('c_age').value;
        const gender = document.getElementById('c_gender').value;
        const phone = document.getElementById('c_phone').value;
        const hiv = document.getElementById('c_hiv').value;
        const kids = document.getElementById('c_kids').value;
        const occupation = document.getElementById('c_occupation').value;
        const location = document.getElementById('c_location').value;
        const about = c_about.value;

        const message = 
`Hello Management,

I am interested in connecting with *${currentProfileName}*.

*SELECTED PACKAGE:* ${selectedPackage}

*Full Name:* ${fullName}
*Age:* ${age}
*Gender:* ${gender}
*Phone/WhatsApp:* ${phone}
*HIV Status:* ${hiv}
*Kids:* ${kids}
*Occupation:* ${occupation}
*Location:* ${location}

*About Me:*
${about}`;

        const encodedMessage = encodeURIComponent(message);

        document.getElementById('sendWhatsapp').onclick = () => {
            window.open(`https://wa.me/${DIRECTOR_WHATSAPP}?text=${encodedMessage}`, '_blank');
        };

        document.getElementById('sendTelegram').onclick = () => {
            window.open(`https://t.me/${DIRECTOR_TELEGRAM}`, '_blank');
        };

        document.getElementById('sendEmail').onclick = () => {
            const subject = encodeURIComponent(`Connection Request for ${currentProfileName} - ${selectedPackage}`);
            window.location.href = `mailto:${DIRECTOR_EMAIL}?subject=${subject}&body=${encodedMessage}`;
        };

        paymentStep.classList.add('hidden');
        connectSendStep.classList.remove('hidden');
    });

    backToFormBtn.addEventListener('click', function() {
        connectSendStep.classList.add('hidden');
        connectFormStep.classList.remove('hidden');
    });

    connectModal.addEventListener('click', function(e) {
        if (e.target === connectModal) {
            connectModal.classList.add('hidden');
        }
    });
});

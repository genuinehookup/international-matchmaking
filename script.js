document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('matchForm');
    const termsModal = document.getElementById('termsModal');
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const proceedBtn = document.getElementById('proceedBtn');

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

    // DIRECTOR'S CONTACT DETAILS
    const DIRECTOR_WHATSAPP = "447828793007"; 
    const DIRECTOR_TELEGRAM = "Contactadminaggrey"; 
    const DIRECTOR_EMAIL = "genuinehookupconnection@gmail.com";

    let currentProfileName = "";

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

    // --- CHECKBOX LOGIC ---
    agreeCheckbox.addEventListener('change', function() {
        proceedBtn.disabled = !this.checked;
    });

    // --- MAIN FORM SUBMISSION ---
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const userName = document.getElementById('userName').value;

        try {
            const response = await fetch('profiles.json');
            if (!response.ok) throw new Error("Could not load profiles.json.");
            const allProfiles = await response.json();

            termsModal.classList.remove('hidden');

            proceedBtn.onclick = function() {
                termsModal.classList.add('hidden');
                displayMatches(userName, allProfiles);
            };
        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        }
    });

    function displayMatches(userName, matches) {
        document.getElementById('heroText').style.display = 'none';
        document.getElementById('formContainer').style.display = 'none';

        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.classList.remove('hidden');
        document.getElementById('resultsGreeting').innerHTML = `Hi ${userName}, here are your matches!`;

        createTickerSlides();

        const grid = document.getElementById('profileGrid');
        grid.innerHTML = ''; 

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

    // --- CONNECT & PAYMENT LOGIC ---
    window.openConnectForm = function(profileName) {
        currentProfileName = profileName;
        connectModalTitle.innerHTML = `Request Connection with ${profileName}`;
        
        // Reset steps
        connectFormStep.classList.remove('hidden');
        paymentStep.classList.add('hidden');
        connectSendStep.classList.add('hidden');
        
        // Show modal
        connectModal.classList.remove('hidden');
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

    // Step 1 to Step 2: Move from Details to Payment Screen
    previewBtn.addEventListener('click', function() {
        if (c_about.value.trim() === "") {
            alert("Please write a short description about yourself.");
            return;
        }

        connectFormStep.classList.add('hidden');
        paymentStep.classList.remove('hidden');
    });

    // Step 2 to Step 3: Confirm Package and generate links
    confirmPackageBtn.addEventListener('click', function() {
        // Get the selected package
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

        // Format the message exactly as agreed (No "Aggrey", ends with her description)
        const message = 
`Hello Director,

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
            window.open(`https://t.me/${DIRECTOR_TELEGRAM}?text=${encodedMessage}`, '_blank');
        };

        document.getElementById('sendEmail').onclick = () => {
            const subject = encodeURIComponent(`Connection Request for ${currentProfileName} - ${selectedPackage}`);
            window.location.href = `mailto:${DIRECTOR_EMAIL}?subject=${subject}&body=${encodedMessage}`;
        };

        // Show Step 3
        paymentStep.classList.add('hidden');
        connectSendStep.classList.remove('hidden');
    });

    // Back button from Step 3 to Step 1
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

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('matchForm');

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

    // --- FORM SUBMISSION ---
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const userName = document.getElementById('userName').value;

        try {
            const response = await fetch('profiles.json');
            
            if (!response.ok) {
                throw new Error("Could not load profiles.json. Please check the file name.");
            }

            const allProfiles = await response.json();

            displayMatches(userName, allProfiles);

        } catch (error) {
            console.error("Error loading profiles:", error);
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
            
            // HERE IS THE NEW FACEBOOK-STYLE TOP BAR
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

                    <div class="intentions-box">
                        <h4>✈️ My Intentions</h4>
                        <p>${profile.intentions}</p>
                    </div>

                    <button class="btn-contact" onclick="alert('Chat feature is coming soon!')">Connect</button>
                </div>
            `;
            
            grid.appendChild(card);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('matchForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // DEBUG: Check if the form values are being read
        const userName = document.getElementById('userName').value;
        const seekGender = document.getElementById('seekGender').value;

        if (!userName) {
            alert("DEBUG ERROR: Name is empty!");
            return;
        }

        try {
            // DEBUG: Tell us what the browser is trying to fetch
            console.log("Trying to fetch profiles.json...");
            
            const response = await fetch('profiles.json');
            
            // DEBUG: Check if the file was actually found
            if (!response.ok) {
                throw new Error(`Failed to load profiles.json. Status: ${response.status}. Make sure the file is named exactly profiles.json (all lowercase).`);
            }

            const allProfiles = await response.json();
            console.log("Profiles loaded successfully:", allProfiles);

            // Filter based on who they are seeking
            const matches = allProfiles.filter(profile => profile.gender === seekGender);
            
            // DEBUG: Check if the filter found anyone
            if (matches.length === 0) {
                alert("DEBUG ERROR: The file loaded, but no profiles matched your search. Check if 'gender' is spelled correctly in profiles.json.");
                return;
            }

            displayMatches(userName, matches);

        } catch (error) {
            // THIS WILL SHOW THE EXACT ERROR ON SCREEN
            console.error("THE ACTUAL ERROR IS:", error);
            alert("WE FOUND THE ERROR:\n\n" + error.message + "\n\nPlease check your GitHub files.");
        }
    });

    function displayMatches(userName, matches) {
        document.getElementById('heroText').style.display = 'none';
        document.getElementById('formContainer').style.display = 'none';

        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.classList.remove('hidden');

        resultsContainer.innerHTML = `
            <h2>Hi ${userName}, here are your matches!</h2>
            <p>Scroll down to see verified men who are active online right now.</p>
            <div class="profile-grid" id="profileGrid"></div>
            <button class="btn-secondary" onclick="location.reload()">Search Again</button>
        `;

        const grid = document.getElementById('profileGrid');

        matches.forEach(profile => {
            const card = document.createElement('div');
            card.className = 'profile-card';
            
            card.innerHTML = `
                <div class="card-image-container">
                    <span class="active-badge">${profile.status}</span>
                    <span class="verified-badge">🛡️ Verified Profile</span>
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

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('matchForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // 1. Get the user's name (We only need this to say "Hi [Name]")
        const userName = document.getElementById('userName').value;

        try {
            // 2. Fetch the profiles from the JSON file
            const response = await fetch('profiles.json');
            
            // If the file isn't found, throw an error
            if (!response.ok) {
                throw new Error("Could not load profiles.json. Please check the file name.");
            }

            const allProfiles = await response.json();

            // 3. NO RESTRICTIONS: We just pass ALL profiles to the display function
            displayMatches(userName, allProfiles);

        } catch (error) {
            console.error("Error loading profiles:", error);
            alert("Error: " + error.message);
        }
    });

    function displayMatches(userName, matches) {
        // Hide the form and hero text
        document.getElementById('heroText').style.display = 'none';
        document.getElementById('formContainer').style.display = 'none';

        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.classList.remove('hidden');

        // Build the HTML
        resultsContainer.innerHTML = `
            <h2>Hi ${userName}, here are your matches!</h2>
            <p>Scroll down to see verified men who are active online right now.</p>
            <div class="profile-grid" id="profileGrid"></div>
            <button class="btn-secondary" onclick="location.reload()">Search Again</button>
        `;

        const grid = document.getElementById('profileGrid');

        // Loop through EVERY profile and create a card
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

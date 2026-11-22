document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('matchForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const userName = document.getElementById('userName').value;
        const seekGender = document.getElementById('seekGender').value;

        try {
            const response = await fetch('profiles.json');
            const allProfiles = await response.json();

            // Filter based on who they are seeking
            const matches = allProfiles.filter(profile => profile.gender === seekGender);

            displayMatches(userName, matches);

        } catch (error) {
            console.error("Error loading profiles:", error);
            alert("Sorry, there was an error finding matches. Please try again.");
        }
    });

    function displayMatches(userName, matches) {
        // Hide the form and hero text
        document.getElementById('heroText').style.display = 'none';
        document.getElementById('formContainer').style.display = 'none';

        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.classList.remove('hidden');

        // Build the HTML inside the results container
        resultsContainer.innerHTML = `
            <h2>Hi ${userName}, here are your matches!</h2>
            <p>These members match what you're looking for.</p>
            <div class="profile-grid" id="profileGrid"></div>
            <button class="btn-secondary" onclick="location.reload()">Search Again</button>
        `;

        const grid = document.getElementById('profileGrid');

        matches.forEach(profile => {
            const card = document.createElement('div');
            card.className = 'profile-card';
            
            card.innerHTML = `
                <div class="card-image-container">
                    <span class="active-badge">🟢 ${profile.status}</span>
                    <img src="${profile.image}" alt="${profile.name}">
                </div>
                <div class="card-info">
                    <h3>${profile.name}</h3>
                    <p>📍 ${profile.location} • ${profile.age} yrs</p>
                    <button class="btn-contact">Connect</button>
                </div>
            `;
            
            grid.appendChild(card);
        });
    }
});

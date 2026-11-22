// Wait for the HTML to load before running the script
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('matchForm');

    form.addEventListener('submit', async function(event) {
        // Stop the page from refreshing when the button is clicked
        event.preventDefault();

        // 1. Get the data the user typed in
        const userName = document.getElementById('userName').value;
        const userGender = document.getElementById('userGender').value;
        const seekGender = document.getElementById('seekGender').value;
        const ageRange = document.getElementById('ageRange').value;

        // 2. Fetch the profiles from our JSON file
        try {
            const response = await fetch('profiles.json');
            const allProfiles = await response.json();

            // 3. Filter the profiles based on what the user is seeking
            const matches = allProfiles.filter(profile => {
                // We only want to show profiles where the gender matches what they are seeking
                return profile.gender === seekGender;
            });

            // 4. Create the HTML to display the results
            displayMatches(userName, matches);

        } catch (error) {
            console.error("Error loading profiles:", error);
            alert("Sorry, there was an error finding matches.");
        }
    });

    function displayMatches(userName, matches) {
        // Hide the old form and headline
        document.querySelector('.hero-text').style.display = 'none';
        document.querySelector('.match-form-container').style.display = 'none';

        // Create a new container for the results
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'results-section';

        // Add a personalized welcome message
        resultsContainer.innerHTML = `
            <h2>Hi ${userName}, here are your matches!</h2>
            <p>These members match what you're looking for.</p>
            <div class="profile-grid" id="profileGrid"></div>
            <button class="btn-secondary" onclick="location.reload()">Search Again</button>
        `;

        // Add the results section to the main area
        document.querySelector('main').appendChild(resultsContainer);

        const grid = document.getElementById('profileGrid');

        // Loop through the matches and create a card for each one
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

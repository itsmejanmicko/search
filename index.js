const searchField = document.getElementById('searchField');
const result = document.getElementById('result');
let isLoading = false;

searchField.addEventListener('input', async () => {
    const query = searchField.value.trim();

    isLoading = true;
    result.innerHTML = "<li>Loading...</li>";

    try {
        const matchUsers = await searchPosts(query);
        if (Array.isArray(matchUsers)) {
            if (!query) {

                result.innerHTML = "";
            } else {
              
                const names = matchUsers.map(user => `<li>${user.name}</li>`).join("");
                result.innerHTML = names;
            }
        }
    } catch (error) {
        
        result.innerHTML = `<li>Error: ${error.message}</li>`;
    } finally {
     
        isLoading = false;
    }
});

async function searchPosts(query = "") {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const allUsers = await response.json();
        return allUsers.filter(user =>
            query ? user.name.toLowerCase().includes(query.toLowerCase()) : true
        );
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw error;
    }
}

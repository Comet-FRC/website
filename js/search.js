const searchBar = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');

searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();

  searchResults.innerHTML = 'Michael', 'Uma', 'Sean', 'Sam', 'Sahasra', 'Michelle', 'Lena', 'Lacey', 'Kristina', 'Katelyn', 'Jacob', 'Avi', 'Adriana';
  filteredData.forEach(item => {
    const resultElement = document.createElement('div');
    resultElement.textContent = item.name;
    searchResults.appendChild(resultElement);
  });
});



function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  const search = debounce(query => {

  }, 300);
  
  searchBar.addEventListener('input', () => search(searchBar.value));
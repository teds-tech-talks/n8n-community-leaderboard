async function generateTable() {
    try {
        const response = await fetch('/caymantest.github.io/books.json');
        const data = await response.json();

        const table = document.createElement('table');
        table.className = 'book-table';

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Title', 'Author', 'Year'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        data.forEach(book => {
            const row = document.createElement('tr');
            ['title', 'author', 'year'].forEach(key => {
                const td = document.createElement('td');
                td.textContent = book[key];
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Add table to the page
        const container = document.getElementById('book-table-container');
        container.appendChild(table);
    } catch (error) {
        console.error('Error generating table:', error);
        const container = document.getElementById('book-table-container');
        container.textContent = 'Error loading data. Please try again later.';
    }
}

// Call the function when the page loads
window.addEventListener('load', generateTable);

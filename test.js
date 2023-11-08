const persons = [
    { name: 'John' },
    { name: 'Alice' },
    { name: 'Bob' },
  ];
  
  // Sorting the array in alphabetical order
  persons.sort((a, b) => a.name.localeCompare(b.name));
  
  // Printing the sorted array
  persons.forEach(person => {
    console.log(person.name);
  });
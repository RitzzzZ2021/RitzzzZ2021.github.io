async function fetchCSV(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching ${url}`);
    return await response.text();
}

function parseCSV(data) {
  const lines = data.trim().split('\n');
  const headers = lines.shift().split(',');

  return lines.map(line => {
    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    return headers.reduce((obj, header, index) => {
      obj[header.trim()] = values[index].replace(/"/g, '').trim();
      return obj;
    }, {});
  });
}

const publicationsContainer = document.getElementById('publication-list');
async function loadPublications() {
    try {
        const csvData = await fetchCSV('paper.csv');
        const publicationsList = parseCSV(csvData);
        publicationsList.forEach(publication => {
            const listItem = document.createElement('li');
            listItem.textContent = `${publication.Title}`;
            publicationsContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error loading readings:', error);
    }
}

const experienceContainer = document.getElementById('experience-list');
async function loadExperience() {
    try {
        const csvData = await fetchCSV('experience.csv');
        const experienceList = parseCSV(csvData);
        experienceList.forEach(experience => {
          const experienceItem = document.createElement('div');
          experienceItem.className = 'experience-item';

          // Add Title and Company
          const titleElement = document.createElement('h4');
          titleElement.textContent = `${experience.Title} at ${experience.Company}`;
          experienceItem.appendChild(titleElement);

          // Add Time
          const timeElement = document.createElement('p');
          timeElement.className = 'time';
          console.log(experience.Time);
          timeElement.textContent = `${experience.Time}`;
          experienceItem.appendChild(timeElement);

          // Add Location
          const locationElement = document.createElement('p');
          locationElement.className = 'location';
          console.log(experience.Location);
          locationElement.textContent = `${experience.Location}`;
          experienceItem.appendChild(locationElement);

          experienceContainer.appendChild(experienceItem);
        });
    } catch (error) {
        console.error('Error loading readings:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadPublications);
document.addEventListener('DOMContentLoaded', loadExperience);

const tooltip = document.getElementById('tooltip');
const locations = document.querySelectorAll('.location');

locations.forEach(location => {
  location.addEventListener('mouseover', (e) => {
    const placeName = location.getAttribute('data-name');
    tooltip.textContent = placeName;
    tooltip.style.display = 'block';
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
  });

  location.addEventListener('mousemove', (e) => {
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
  });

  location.addEventListener('mouseout', () => {
    tooltip.style.display = 'none';
  });
});
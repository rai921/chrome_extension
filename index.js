let myLeads;
const inputEl = document.getElementById('input-el');
const saveEl = document.getElementById('input-btn');
const deleteEl = document.getElementById('delete-btn');
const ulEl = document.getElementById('ul-el');
const tabEl = document.getElementById('tab-btn');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

myLeads = leadsFromLocalStorage || [];

render(myLeads);

function saveLead() {
  myLeads.push(inputEl.value);
  render(myLeads);
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
}

saveEl.addEventListener('click', () => {
  saveLead();
});

tabEl.addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteEl.addEventListener('dblclick', () => {
  clearLeads();
  myLeads = [];
  render(myLeads);
  inputEl.value = '';
  ulEl.innerHTML = '';  
});

function render(leads) {
  let listItems = '';
  for (let i = 0; i < leads.length; i++) {
      listItems += `<li><a href="${leads[i]}" target="_blank">${leads[i]}</a></li>`;

      // ulEl.innerHTML += `<li>${myLeads[i]}</li>`;

      // const li = document.createElement('li')
      // li.textContent = myLeads[i];
      // ulEl.append(li);
  };

  ulEl.innerHTML = listItems;
}

function clearLeads() {
  localStorage.clear();
}

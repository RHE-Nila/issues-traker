document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';
  if (description === '' || assignedTo === '' || isNaN(description) == false || isNaN(assignedTo) == false) {
    alert('Provide Correct Information!');
  }
  else {
    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
  }
}
const deleteIssue = id => {
  let issues = JSON.parse(localStorage.getItem('issues'));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const setStatusClosed = (id) => {
  let issues = JSON.parse(localStorage.getItem('issues'));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  let totalIssue = 0;
  let closedIssue = 0;
  for (var i = 0; i < issues.length; i++) {
    totalIssue = issues.length;
    const { id, description, severity, assignedTo, status } = issues[i];
    let strikeToText = '<h3>${desc ription}</h3>'
    if (status === 'Closed') {
      closedIssue++;
      strikeToText = '<h3><strike>${description}</strike></h3>';
    }
    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                               ${strikeToText}
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
  document.getElementById('total-issue').innerHTML = totalIssue;
  let openIssues = totalIssue - closedIssue;
  document.getElementById('open-issue').innerHTML = openIssues;
}
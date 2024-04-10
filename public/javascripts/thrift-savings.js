let groups = []; // Array to store group data

// Function to create a new group
function createGroup() {
    const groupName = document.getElementById('groupNameInput').value;
    const memberIds = document.querySelectorAll('.memberId');
    const memberNames = document.querySelectorAll('.memberName');
    const members = [];
    for (let i = 0; i < memberIds.length; i++) {
        const id = memberIds[i].value;
        const name = memberNames[i].value;
        members.push({ id, name });
    }
    const group = {
        groupName: groupName,
        members: members,
        contributions: {},
        currentCollectorIndex: 0
    };
    groups.push(group);
    displayGroupInfo(group);
    updateGroupDropdown();
}

// Function to update the dropdown menu with group names
function updateGroupDropdown() {
    const groupSelect = document.getElementById('groupSelect');
    groupSelect.innerHTML = ''; // Clear existing options
    groups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.groupName;
        option.text = group.groupName;
        groupSelect.appendChild(option);
    });
}

// Function to display group information
function displayGroupInfo(group) {
    let groupCard = document.getElementById(group.groupName); // Check if the group card already exists
    if (!groupCard) {
        // If the group card doesn't exist, create a new one
        groupCard = document.createElement('div');
        groupCard.classList.add('group-card');
        groupCard.id = group.groupName; // Set the ID of the group card to the group name
        document.getElementById('groupContainer').appendChild(groupCard);
    }
    
    // Update group information inside the existing group card
    groupCard.innerHTML = `
    <div>
        <h3 class="text-center" style="text-transform:uppercase;">${group.groupName}</h3>
        <p>Members: <span  style="text-transform:capitalize;">${group.members.map(member => `${member.name}`).join(', ')}</span></p>
    </div>
    `;
    
    // Display current and upcoming collectors
    const currentCollectorName = group.members[group.currentCollectorIndex].name;
    const upcomingCollectorIndex = (group.currentCollectorIndex + 1) % group.members.length;
    const upcomingCollectorName = group.members[upcomingCollectorIndex].name;
    groupCard.innerHTML += `
        <div class="collectors">
            <p><span class="fw-bold" style="color:#90EE90; text-transform:capitalize;">Current Collector: ${currentCollectorName}</span></p>
            <p>Upcoming Collector: <span class="fw-bold" style="text-transform:capitalize;">${upcomingCollectorName}</span></p>
        </div>
    `;
    
    // Display group balances
    const balanceList = document.createElement('ul');
    balanceList.innerHTML = '<h4 class="text-center">Group Balances</h4>';
    let totalBalance = 0;
    group.members.forEach(member => {
        const balance = group.contributions[member.id] || 0;
        totalBalance += balance;
        const listItem = document.createElement('li');
        listItem.innerText = `${member.id} || ${member.name} = ${balance}`;
        listItem.style=" list-style-type: none;"
        balanceList.appendChild(listItem);
    });
    // Add total balance to the balance list
    const totalListItem = document.createElement('h2');
    totalListItem.innerText = `Total Balance: ${totalBalance}`;
    totalListItem.style="text-align:center; margin:10px 0;"
    balanceList.appendChild(totalListItem);
    
    groupCard.appendChild(balanceList);
}



// Function to handle contribution
function contributeMoney() {
    const groupName = document.getElementById('groupSelect').value;
    const userId = document.getElementById('userId').value;
    const amount = parseInt(document.getElementById('amount').value);
    
    // Find the group by name
    const group = groups.find(group => group.groupName === groupName);
    if (group) {
        if (!group.contributions[userId]) {
            group.contributions[userId] = 0;
        }
        group.contributions[userId] += amount;
        displayGroupInfo(group); // Update group information after contribution
    } else {
        alert('Group not found.');
    }
}
// Function to reset input fields
function resetInputFields() {
    document.getElementById('groupNameInput').value = '';
    document.querySelectorAll('.memberId').forEach(input => input.value = '');
    document.querySelectorAll('.memberName').forEach(input => input.value = '');
}

// Function to initialize the application
function initialize() {
    document.getElementById('contributeBtn').addEventListener('click', () => {
        contributeMoney();
        resetInputFields();
    });

    document.getElementById('addMemberBtn').addEventListener('click', () => {
        const memberId = document.createElement('input');
        memberId.setAttribute('type', 'text');
        memberId.setAttribute('class', 'memberId');
        memberId.setAttribute('placeholder', 'User ID');
        
        const memberName = document.createElement('input');
        memberName.setAttribute('type', 'text');
        memberName.setAttribute('class', 'memberName');
        memberName.setAttribute('placeholder', 'User Name');
        
        document.getElementById('membersInput').appendChild(memberId);
        document.getElementById('membersInput').appendChild(memberName);
    });

    document.getElementById('createGroupBtn').addEventListener('click', () => {
        createGroup();
        resetInputFields();
    });

    // Update the group dropdown initially
    updateGroupDropdown();
}

initialize();
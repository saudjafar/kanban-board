export function groupTickets(tickets, users, groupingOption, priorityMap) {
    const groupedData = {};

    if (groupingOption === 'name') {
        // Group by user names in ascending order
        users.sort((a, b) => a.name.localeCompare(b.name));
        users.forEach(user => {
            groupedData[user.name] = tickets.filter(ticket => ticket.userId === user.id);
        });
    } else if (groupingOption === 'status') {
        // Group by status
        // tickets.forEach(ticket => {
        //     const status = ticket.status;
        //     if (!groupedData[status]) {
        //         groupedData[status] = [];
        //     }
        //     groupedData[status].push(ticket);
        // });

        const allStatusValues = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

        // Iterate through all possible status values and group tickets accordingly
        allStatusValues.forEach(status => {
            groupedData[status] = tickets.filter(ticket => ticket.status === status);
        });

    } else if (groupingOption === 'priority') {
        // tickets.forEach(ticket => {
        //     const priority = ticket.priority;
        //     if (!groupedData[priority]) {
        //         groupedData[priority] = [];
        //     }
        //     groupedData[priority].push(ticket);
        // });
        // Define the custom order for priorities
        const customPriorityOrder = [0, 4, 3, 2, 1];

        customPriorityOrder.forEach(priority => {
            const priorityGroup = tickets.filter(ticket => ticket.priority === priority);
            if (priorityGroup.length > 0) {
                groupedData[priorityMap[priority]] = priorityGroup;
            }
        });
    }

    return groupedData;
}

export function sortGroupedTickets(groupedData, sortingOption) {
    const sortedData = { ...groupedData };

    for (const groupKey in sortedData) {
        if (sortingOption === 'priority') {
            sortedData[groupKey].sort((a, b) => b.priority - a.priority); // Sort by priority in decreasing order
        } else if (sortingOption === 'title') {
            sortedData[groupKey].sort((a, b) => a.title.localeCompare(b.title)); // Sort by title in increasing order
        }
    }

    return sortedData;
}
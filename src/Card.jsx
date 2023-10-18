import React, { useState, useEffect } from 'react';
import { groupTickets, sortGroupedTickets } from './GroupingUtils';
import Plus from './assets/plus.svg';
import Dots from './assets/dots-3-horizontal.svg';
import User from './assets/user2.svg';
import groupKeyImages from './GroupKeyImages';

const Card = ({ groupingOption, orderingOption }) => {

    const [users, setUsers] = useState([]);
    const [tickets, setTickets] = useState([]);


    const priorityMap = {
        4: "Urgent",
        3: "High",
        2: "Medium",
        1: "Low",
        0: "No priority",
    };

    useEffect(() => {

        const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

        // Function to fetch data from the API
        async function fetchData() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setUsers(data.users);
                setTickets(data.tickets);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);


    const groupedData = groupTickets(tickets, users, groupingOption, priorityMap);
    const sortedData = sortGroupedTickets(groupedData, orderingOption);

    return (
        <div className="kanban-board">
            {Object.keys(sortedData).map(groupKey => (
                <div className="card-group" key={groupKey}>
                    <div className="card-header">
                        <div className='card-title'>
                            <img src={`${groupingOption === "name" ? User : groupKeyImages[groupKey]}`}
                                width={24} height={24}
                                style={{ paddingRight: '0.5rem' }} />
                            {groupKey}
                            <span className='card-count'>{sortedData[groupKey].length}</span>
                        </div>

                        <div>
                            <img src={Plus} width={28} height={28} style={{ paddingRight: '0.2rem' }} />
                            <img src={Dots} width={28} height={28} style={{ paddingLeft: '0.2rem' }} />
                        </div>

                    </div>
                    <div className="card-container">
                        {sortedData[groupKey].map((ticket, index) => (
                            <div className="card" key={index}>
                                <div className='id-container'>
                                    <p className='id'>{ticket.id}</p>
                                    {groupingOption !== 'name' &&
                                        <img className='user-icon' src={User} width={24} height={24} />
                                    }
                                </div>
                                <p className='title'>{ticket.title}</p>
                                <div className='tags-container'>
                                    {groupingOption !== 'priority' &&
                                        <img className='tag-img' src={(groupKeyImages[priorityMap[ticket.priority]])} width={16} height={16} />
                                    }
                                    {groupingOption !== 'status' &&
                                        <img className='tag-img' src={(groupKeyImages[ticket.status])} width={16} height={16} />
                                    }
                                    <p className='tag'>
                                        <span className='tag-dot'>⬤</span>
                                        {ticket.tag}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;

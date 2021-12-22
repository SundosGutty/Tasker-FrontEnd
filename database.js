export const boardDb = {
  _id: "b101",
  title: "Sprint 4",
  createdAt: 1589983468418,
  description: "Track your action items and improve for next sprint",
  createdBy: {
    _id: "u101",
    fullname: "Guy Shapira",
    imgUrl: "guy-img.jpg"
  },
  style: {},
  labels: [
    {
      id: "l101",
      title: "Done",
      color: "#61bd4f"
    }
  ],
  members: [
    {
      _id: "u101",
      username: "Guy",
      fullname: "Guy Shapira",
      imgUrl: "guy-img.jpg",
    },
    {
      _id: "u102",
      username: "Sundos",
      fullname: "Sundos Gutty",
      imgUrl: "sundos-img.jpg",
    },
    {
      _id: "u103",
      username: "Ishay",
      fullname: "Ishay Nitzan",
      imgUrl: "ishay-img.jpeg",
    },
  ],
  groups: [
    {
      id: "g101",
      title: "Group 1",
      tasks: [
        {
          id: "t101",
          title: "Replace logo",
          labelId: "Done",
          description: "description",
          comments: [
            {
              id: "ZrePnm",
              txt: "trelleeeleee",
              createdAt: 1638753114117,
              byMember: {
                _id: "u101",
                fullname: "Guy Shapira",
                imgUrl: "guy-img.jpg"
              }
            },
            {
              id: "Z90Pnm",
              txt: "also @yaronb please CR this",
              createdAt: 1620999817436,
              byMember: {
                _id: "u101",
                fullname: "Guy Shapira",
                imgUrl: "guy-img.jpg"
              },
            }
          ]
        },
        {
          id: "t102",
          title: "Have to have full CRUD!",
          labelId: "Work",
          members: [
            {
              _id: "u101",
              username: "Guy",
              fullname: "Guy Shapira",
              imgUrl: "guy-img.jpg"
            }
          ]
        },
        {
          id: "t103",
          title: "Let's do Dungeon & Dragons ",
          labelId: "Stuck",
          members: [
            {
              _id: "u103",
              username: "Ishay",
              fullname: "Ishay Nitzan",
              imgUrl: "ishay-img.jpeg",
            },
          ],
        },
      ],
      style: {
        color: "#579bfc",
      },
    },
    {
      id: "g102",
      title: "Group 2",
      tasks: [
        {
          id: "t201",
          title: "Replace logo",
          labelId: "Stuck"
        },
        {
          id: "t202",
          title: "Add Samples",
          labelId: "Work"
        }
      ],
      style: {
        color: "#579bfc",
      },
    },
    {
      id: "g103",
      title: "Group 3",
      tasks: [
        {
          id: "t301",
          title: "Do that",
          labelId: "Done",
          members: [
            {
              _id: "u102",
              username: "Sundos",
              fullname: "Sundos Gutty",
              imgUrl: "sundos-img.jpg",
            },
            {
              _id: "u103",
              username: "Ishay",
              fullname: "Ishay Nitzan",
              imgUrl:"ishay-img.jpeg"
            },
          ],
        },
        {
          id: "t302",
          title: "Help me",
          description: "description",
          comments: [
            {
              id: "ZdPnm",
              txt: "also @yaronb please CR this",
              createdAt: 1590999817436.0,
              byMember: {
                _id: "u101",
                fullname: "Guy Shapira",
                imgUrl: "guy-img.jpg"
              }
            }
          ],
          checklists: [
            {
              id: "YEhmF",
              title: "Checklist",
              todos: [
                {
                  id: "212jX",
                  title: "To Do 1",
                  isDone: false
                }
              ]
            }
          ],
          members: [
            {
              _id: "u101",
              username: "Guy",
              fullname: "Guy Shapira",
              imgUrl: "guy-img.jpg"
            }
          ],
          labelId: "Done",
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: "u101",
            username: "Guy",
            fullname: "Guy Shapira",
            imgUrl: "guy-img.jpg"
          },
          style: {},
        },
      ],
      style: {
        color: "#579bfc",
      },
    },
    {
      id: "g104",
      title: "Group 4",
      tasks: [
        {
          id: "t01",
          title: "Do that",
          labelId: "Done",
          members: [
            {
              _id: "u102",
              username: "Sundos",
              fullname: "Sundos Gutty",
              imgUrl:"sundos-img.jpg"
            },
            {
              _id: "u103",
              username: "Ishay",
              fullname: "Ishay Nitzan",
              imgUrl:"ishay-img.jpeg"
            },
          ],
        },
        {
          id: "t302",
          title: "Help me",
          description: "description",
          comments: [
            {
              id: "ZdPnm",
              txt: "also @yaronb please CR this",
              createdAt: 1590999817436.0,
              byMember: {
                _id: "u101",
                fullname: "Guy Shapira",
                imgUrl: "guy-img.jpg"
              }
            }
          ],
          checklists: [
            {
              id: "YEhmF",
              title: "Checklist",
              todos: [
                {
                  id: "212jX",
                  title: "To Do 1",
                  isDone: false
                }
              ]
            }
          ],
          members: [
            {
              _id: "u101",
              username: "Guy",
              fullname: "Guy Shapira",
              imgUrl: "guy-img.jpg"
            }
          ],
          labelId: "Done",
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: "u101",
            username: "Guy",
            fullname: "Guy Shapira",
            imgUrl: "guy-img.jpg"
          },
          style: {},
        },
      ],
      style: {
        color: "#579bfc",
      },
    },
    {
      id: "g105",
      title: "Group 5",
      tasks: [
        {
          id: "t01",
          title: "Do that",
          labelId: "Done",
          members: [
            {
              _id: "u102",
              username: "Sundos",
              fullname: "Sundos Gutty",
              imgUrl:"sundos-img.jpg"
            },
            {
              _id: "u103",
              username: "Ishay",
              fullname: "Ishay Nitzan",
              imgUrl:"ishay-img.jpeg"
            },
          ],
        },
        {
          id: "t302",
          title: "Help me",
          description: "description",
          comments: [
            {
              id: "ZdPnm",
              txt: "also @yaronb please CR this",
              createdAt: 1590999817436.0,
              byMember: {
                _id: "u101",
                fullname: "Guy Shapira",
                imgUrl: "guy-img.jpg"
              }
            }
          ],
          checklists: [
            {
              id: "YEhmF",
              title: "Checklist",
              todos: [
                {
                  id: "212jX",
                  title: "To Do 1",
                  isDone: false
                }
              ]
            }
          ],
          members: [
            {
              _id: "u101",
              username: "Guy",
              fullname: "Guy Shapira",
              imgUrl: "guy-img.jpg"
            }
          ],
          labelId: "Done",
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: "u101",
            username: "Guy",
            fullname: "Guy Shapira",
            imgUrl: "guy-img.jpg"
          },
          style: {},
        },
      ],
      style: {
        color: "#579bfc",
      },
    },
  ],
  activities: [
    {
      id: "a101",
      type: "name",
      createdAt: 154514,
      byMember: {
        _id: "u101",
        fullname: "Guy Shapira",
        imgUrl: "guy-img.jpg"
      },
      task: {
        id: "t101",
        title: "Replace Logo"
      }
    },
    {
      id: "a102",
      type: "status",
      createdAt: 154514,
      byMember: {
        _id: "u101",
        fullname: "Guy Shapira",
        imgUrl: "guy-img.jpg"
      },
      task: {
        id: "t101",
        title: "bipboop"
      }
    },
    {
      id: "a103",
      type: "member",
      createdAt: 154514,
      byMember: {
        _id: "u101",
        fullname: "Guy Shapira",
        imgUrl: "guy-img.jpg"
      },
      task: {
        id: "t101",
        title: "say Hi"
      }
    }
  ],
  cmpsOrder: [
    "title-picker",
    "status-picker",
    "member-picker",
    "timeline-picker",
  ],
};

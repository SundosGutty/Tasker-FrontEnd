import { httpService } from "./http.service";
import { utilService } from "./util.service";
import { storageService } from "./storage.service";

const KEY = "gBoards";

export const remoteBoardService = {
  query,
  remove,
  save,
  getById,
  getEmptyGroup,
  getColors,
  getTaskById,
  getTaskRouteIdx,
  filterBy,
  saveFile,
  getEmptyComment,
  getEmptyActivity,
  sortBy,
};

const BASE_URL = process.env.NODE_ENV !== "development" ? "board" : "board";

async function query(filterBy = null) {
  try {
    return await httpService.get(BASE_URL, filterBy);
  } catch (err) {
    console.log("error:", err);
  }
}

async function getById(id) {
  try {
    return await httpService.get(BASE_URL + `/${id}`);
  } catch (err) {
    console.log("error:", err);
  }
}

async function remove(id) {
  try {
    return await httpService.delete(BASE_URL + `/${id}`);
  } catch (err) {
    console.log("error:", err);
  }
}

async function save(board) {
  try {
    return board._id
      ? await httpService.put(BASE_URL + `/${board._id}`, { board })
      : await httpService.post(BASE_URL, { board });
  } catch (err) {
    console.log("error:", err);
  }
}

async function saveFile(file) {
  try {
    const fd = new FormData();
    await httpService.post("/upload", fd);
  } catch (err) {
    console.log(err);
  }
}

function sortBy(sortedBoard, sortByCopy) {
  if (sortByCopy.val === "name") {
    sortedBoard.groups.forEach((group) => {
      if (!group.tasks) return [];
      group.tasks.sort((task1, task2) => {
        if (sortByCopy.order === "ascending") {
          return task1.title.toLowerCase() >= task2.title.toLowerCase()
            ? 1
            : -1;
        } else {
          return task2.title.toLowerCase() >= task1.title.toLowerCase()
            ? 1
            : -1;
        }
      });
    });
  }
  if (sortByCopy.val === "person") {
    sortedBoard.groups.forEach((group) => {
      group.tasks.sort((task1, task2) => {
        var tmpUser1 = false;
        var tmpUser2 = false;
        if (!task1.members || !task1.members.length) {
          tmpUser1 = true;
          task1.members = [{ username: "z" }];
        }
        if (!task2.members || !task2.members.length) {
          tmpUser2 = true;
          task2.members = [{ username: "z" }];
        }
        task1.members.sort((member1, member2) => {
          return member1.username.toLowerCase() >=
            member2.username.toLowerCase()
            ? 1
            : -1;
        });
        task2.members.sort((member1, member2) => {
          return member1.username.toLowerCase() >=
            member2.username.toLowerCase()
            ? 1
            : -1;
        });
        var val =
          task1.members[0].username.toLowerCase() >=
          task2.members[0].username.toLowerCase()
            ? 1
            : -1;
        if (tmpUser1) task1.members = null;
        if (tmpUser2) task2.members = null;
        if (sortByCopy.order === "ascending") {
          return val;
        } else {
          return val * -1;
        }
      });
    });
  }
  if (sortByCopy.val === "status") {
    sortedBoard.groups.forEach((group) => {
      group.tasks.sort((task1, task2) => {
        if (sortByCopy.order === "ascending") {
          if (!task1.status) return;
          return task1.status >= task2.status ? 1 : -1;
        } else {
          return task2.status >= task1.status ? 1 : -1;
        }
      });
    });
  }
  if (sortByCopy.val === "timeline") {
    sortedBoard.groups.forEach((group) => {
      group.tasks.sort((task1, task2) => {
        if (
          !task1.timeline ||
          !task1.timeline.length ||
          !task2.timeline ||
          !task2.timeline.length
        )
          return;
        console.log("task1", task1.timeline);
        console.log("task2", task2.timeline);
        if (sortByCopy.order === "ascending") {
          return new Date(task1.timeline[1]) - new Date(task2.timeline[1]);
        } else {
          return new Date(task2.timeline[1]) - new Date(task1.timeline[1]);
        }
      });
    });
  }
  if (sortByCopy.val === "priority") {
    console.log("priority");
    sortedBoard.groups.forEach((group) => {
      group.tasks.sort((task1, task2) => {
        if (sortByCopy.order === "ascending") {
          if (!task1.priority) return;
          return task1.priority >= task2.priority ? 1 : -1;
        } else {
          return task2.priority >= task1.priority ? 1 : -1;
        }
      });
    });
  }
  return sortedBoard;
}

async function getTaskById(taskId) {
  try {
    const boards = await query();
    var currTask;
    boards.forEach((board) => {
      board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.id === taskId) currTask = task;
        });
      });
    });
    return currTask;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

async function getTaskRouteIdx(task, boardIdx) {
  try {
    const boards = await query();

    var groupIdx = null;
    var taskIdx = null;
    const groups = boards[boardIdx].groups;
    groups.forEach((g, idx) => {
      if (
        g.tasks.some((t, idx) => {
          if (t.id === task.id) {
            taskIdx = idx;
            return true;
          }
        })
      ) {
        groupIdx = idx;
      }
    });
    return {
      task,
      taskIdx,
      groupIdx,
      activity: { type: "title", newVal: task.title },
    };
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

function _getBoardCopy(boardId) {
  const board = todoService.getById(boardId);
  return JSON.parse(JSON.stringify(board));
}

function filterBy(board, filterBy) {
  const regex = new RegExp(filterBy.val, "i");
  var boardCopy = JSON.parse(JSON.stringify(board));
  if (filterBy.filter === "searchKey") {
    if (!filterBy.filter.type) {
      boardCopy.groups = boardCopy.groups.map((group) => {
        group.tasks = group.tasks.filter((task) => {
          if (!filterBy.val) return true;
          return regex.test(task.title)
            ? true
            : regex.test(task.status)
            ? true
            : regex.test(task.priority);
        });
        if (!group.tasks.length) return null;
        return group;
      });
    }
  }
  if (filterBy.filter === "all") {
    return boardCopy;
  } else if (filterBy.filter === "title") {
    if (!filterBy.val) return true;
    boardCopy.groups = boardCopy.groups.filter((group) => {
      return regex.test(group.title);
    });
  } else if (filterBy.filter === "member") {
    boardCopy.groups = boardCopy.groups.map((group) => {
      if (!filterBy.val) return true;
      group.tasks = group.tasks.filter((task) => {
        if (!task.members) return false;
        return task.members.some((member) => {
          return regex.test(member.fullname);
        });
      });
      if (!group.tasks.length) return null;
      return group;
    });
  } else if (filterBy.filter === "status") {
    boardCopy.groups = boardCopy.groups.map((group) => {
      if (!filterBy.val) return true;
      group.tasks = group.tasks.filter((task) => {
        if (!filterBy.val) return true;
        return regex.test(task.status);
      });
      if (!group.tasks.length) return null;
      return group;
    });
  }
  return boardCopy;
}

async function getEmptyGroup() {
  try {
    return {
      title: "New group",
      id: utilService.makeId(),
      tasks: [
        {
          id: utilService.makeId(),
          title: "New Task",
          status: null,
          priority: null,
          timeline: null,
          members: null,
        },
      ],
      style: {
        color: "#579bfc",
      },
    };
  } catch (err) {
    console.log(err);
  }
}

function getEmptyComment() {
  return {
    id: utilService.makeId(),
    txt: "",
    createdAt: Date.now(),
    byMember: {},
    style: [],
    seenBy: [],
    isLike: false,
  };
}

function getEmptyActivity() {
  return {
    txt: "",
    id: utilService.makeId(),
    createdAt: Date.now(),
    byMember: {},
    task: {},
  };
}

function getColors() {
  return [
    {
      name: "darkGreen",
      hexCode: "#359970",
    },
    {
      name: "green",
      hexCode: "#00c875",
    },

    {
      name: "yellowGreen",
      hexCode: "#9cd326",
    },
    {
      name: "beige",
      hexCode: "#cab641",
    },
    {
      name: "yellow",
      hexCode: "#ffcb00",
    },
    {
      name: "darkPurple",
      hexCode: "#784bd1",
    },
    {
      name: "purple",
      hexCode: "#a25ddc",
    },
    {
      name: "turquoise",
      hexCode: "#0086BE",
    },
    {
      name: "blue",
      hexCode: "#579bfc",
    },
    {
      name: "lightBlue",
      hexCode: "#66ccff",
    },
    {
      name: "darkRed",
      hexCode: "#bb3354",
    },
    {
      name: "red",
      hexCode: "#e2445c",
    },
    {
      name: "darkOrange",
      hexCode: "#ff642e",
    },
    {
      name: "orange",
      hexCode: "#fdab3d",
    },
    {
      name: "brown",
      hexCode: "#7f5347",
    },
  ];
}

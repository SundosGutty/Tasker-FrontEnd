import { remoteBoardService } from "@/services/board.service-remote.js";
import { utilService } from "@/services/util.service.js";
import { socketService } from "@/services/socket.service.js";

export const boardStore = {
  state: {
    boards: null,
    currBoard: null,
    currBoardIdx: null,
    sortedBoard: null,
    sortBy: {
      val: "",
      order: "",
    },
    filterBy: null,
    isTaskDetailsHover: false,
  },
  getters: {
    currBoardIdx(state) {
      return state.currBoardIdx;
    },
    allBoards(state) {
      return JSON.parse(JSON.stringify(state.boards));
    },
    currBoard(state) {
      var sortedBoard = JSON.parse(JSON.stringify(state.currBoard));
      // const sortByCopy = JSON.parse(JSON.stringify(state.sortBy))
      if (state.sortBy) {sortedBoard = remoteBoardService.sortBy(sortedBoard, state.sortBy)}
      if (state.filterBy) {sortedBoard = remoteBoardService.filterBy(sortedBoard, state.filterBy);}
      return sortedBoard;
    },
  
    taskHover(state) {
      return state.isTaskDetailsHover;
    },
  },
  mutations: {
    setBoards(state, { boards, currBoardIdx }) {
      state.boards = boards;
      state.currBoard = boards[currBoardIdx];
      state.currBoardIdx = currBoardIdx;
    },
    saveBoard(state, { board }) {
      state.currBoard = board;
    },
    updateBoard(state, { board }) {
      state.currBoard = board;
      state.boards.splice(state.currBoardIdx, 1, board);
    },

    updateTask(state, { boards, currBoardIdx }) {
      state.boards = boards;
      state.currBoard = boards[currBoardIdx];
      state.currBoardIdx = currBoardIdx;
    },

    setSort(state, { sortBy }) {
      state.sortBy = sortBy;
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    hover(state, { isHover }) {
      state.isTaskDetailsHover = isHover;
    },
  },
  actions: {
    async loadBoards({ commit }, { currBoardIdx }) {
      try {
        const boards = await remoteBoardService.query();
        commit({ type: "setBoards", boards: boards, currBoardIdx });
        return boards;
      } catch (err) {
        console.log(err);
      }
    },
    // async saveBoard({ commit }, { board }) {
    //   try {
    //     console.log("board", board);
    //     await remoteBoardService.save(board);
    //     commit({ type: "saveBoard", board });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    async saveBoard({ commit, state }, { board }) {
      // optimistic
      // console.log(board.groups[0].tasks[0])
      const currBoard = JSON.parse(JSON.stringify(state.currBoard));
      const newBoard = JSON.parse(JSON.stringify(board));
      try {
        socketService.emit('board from store', newBoard)
        commit({ type: "saveBoard", board: newBoard });
        await remoteBoardService.save(newBoard);
      } catch (err) {
        console.log(err);
        console.log("Error saveBoard");
        commit({ type: "saveBoard", board: currBoard });
      }
    },
    async updateFromSocket({ commit, state }, { board }) {
      // optimistic
      const currBoard = JSON.parse(JSON.stringify(state.currBoard));
      const newBoard = JSON.parse(JSON.stringify(board));
      try {
        // socketService.emit('board from store', newBoard)
        commit({ type: "saveBoard", board: newBoard });
        await remoteBoardService.save(newBoard);
      } catch (err) {
        console.log(err);
        console.log("Error saveBoard");
        commit({ type: "saveBoard", board: currBoard });
      }
    },

    async editTask({ state, dispatch, commit, rootGetters }, { taskInfo }) {
      // const currUser = JSON.parse(JSON.stringify(commit.getters.loggedinUser));
      try {
        const { task, taskIdx, groupIdx, activity } = taskInfo;
        const boardCopy = JSON.parse(JSON.stringify(state.currBoard));

        if (!task.id) {
          const currTask = {
            id: utilService.makeId(),
            title: task.title,
            priority: null,
            status: null,
            timeline: null,
            members: null,
            seenBy:[rootGetters.loggedinUser]
          }
          boardCopy.groups[groupIdx].tasks.push(currTask);
        }

        else {
          if (task.isCopy) {
            delete task.id
            delete task.isCopy
            task.id = utilService.makeId()
            boardCopy.groups[groupIdx].tasks.splice(taskIdx, 0, task);

          } else {
            boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1, task);
          }
        }



        const newActivity = {
          id: utilService.makeId(),
          type: activity ? activity.type : null,
          newVal: activity ? activity.newVal : null,
          oldVal: activity ? activity.oldVal : null,
          createdAt: Date.now(),
          byMember: state.loggedinUser,
          task: {
            id: task.id,
            title: task.title,
          },

        };

        if (!boardCopy.groups[groupIdx].activityLog) boardCopy.groups[groupIdx].activityLog = []
        boardCopy.groups[groupIdx].activityLog.push(newActivity)


        dispatch({ type: "saveBoard", board: boardCopy });
      } catch (err) {
        console.log(err);
      }
    },

    async removeTask({ state, dispatch, commit }, { taskInfo }) {
      // const currUser = JSON.parse(JSON.stringify(commit.getters.loggedinUser));
      // delete currUser.activities;
      try {
        const { taskIdx, groupIdx } = taskInfo;
        const boardCopy = JSON.parse(JSON.stringify(state.currBoard));
        boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1);

        dispatch({ type: "saveBoard", board: boardCopy });
      } catch (err) {
        console.log(err);
      }
    },

    async editGroup({ state, dispatch, commit }, { groupInfo }) {
      try {
        const { group, groupIdx } = groupInfo;
        const boardCopy = JSON.parse(JSON.stringify(state.currBoard));
        boardCopy.groups.splice(groupIdx, 1, group);

        dispatch({ type: "saveBoard", board: boardCopy });
      } catch (err) {
        console.log(err);
      }
    },

    async addNewGroup({ state, dispatch, commit }, { groupInfo }) {
      try {
        const boardCopy = JSON.parse(JSON.stringify(state.currBoard));

        if (!groupInfo) {
          const newGroup = await remoteBoardService.getEmptyGroup();
          console.log(newGroup);
          boardCopy.groups.unshift(newGroup);
        }
        else {
          const { group, groupIdx } = groupInfo;
          boardCopy.groups.splice(groupIdx, 0, group)
        }

        dispatch({ type: "saveBoard", board: boardCopy });
      } catch (err) {
        console.log(err);
      }
    },

    async removeGroup({ state, dispatch, commit }, { groupInfo }) {
      try {
        const { groupIdx } = groupInfo;
        const boardCopy = JSON.parse(JSON.stringify(state.currBoard));
        boardCopy.groups.splice(groupIdx, 1);

        dispatch({ type: "saveBoard", board: boardCopy });
      } catch (err) {
        console.log(err);
      }
    },

    async addNewBoard({ state, dispatch, commit, rootGetters }, { board }) {
      try {
        board.createdBy = rootGetters.loggedinUser;
        const savedBoard = await remoteBoardService.save(board);
      } catch (err) {
        console.log(err);
      }
    },

    async getTaskById({ state }, { taskId }) {
      try {
        const currTask = await remoteBoardService.getTaskById(taskId);
        return currTask;
      } catch (err) {
        console.log(err);
      }
    },
    async saveGroup({ state, dispatch, commit }, { groupInfo }) {
      try {
        const { group, groupIdx } = groupInfo;
        const boardCopy = JSON.parse(JSON.stringify(state.currBoard));
        boardCopy.groups.splice(groupIdx, 1, group);

        dispatch({ type: "saveBoard", board: boardCopy });
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
};

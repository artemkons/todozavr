import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faTrash,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading";
import SortComponent from "./SortComponent";
import CloseSvg from "../../styles/close-button.svg";
import useReq from "../../hooks/req.hook";
import { differenceInCalendarDays } from "date-fns";
import { Button } from "react-bulma-components";

/**
 * Displays date and time. If deadline's year equals to current year, year isnt displayed.
 * Displays deadline in three ways depending on time left.
 * @param {string} deadline
 * @returns Component to display date.
 */
const DataBlock = ({ deadline }) => {
  let curDate = new Date();
  let date = deadline ? new Date(Number(deadline)) : null;
  let options = {
    ...(curDate.getFullYear() !== date.getFullYear() && { year: "numeric" }),
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  /**
   * Check time before deadline and return corresponding class for tag.
   * @returns {string} danger, warning or primary.
   */
  const checkDeadline = () => {
    let todayDate = new Date(Number(deadline));
    let deadlineDate = new Date();
    let timeLeft = differenceInCalendarDays(todayDate, deadlineDate);

    if (timeLeft < 0) return "danger";
    if (timeLeft <= 1 && timeLeft >= 0) return "warning";
    return "primary";
  };

  return (
    <span className={`tag is-${checkDeadline()} is-light data-block__time-tag`}>
      <FontAwesomeIcon className="svg-icon" icon={faClock} />
      {date.toLocaleDateString("ru-RU", options)}
    </span>
  );
};

/**
 * Creates a todo item. Provides following functionality: check and delete todo.
 * Makes mutation queries: deleteTodo, doneTodo.
 * @param {string} title
 * @param {string} text
 * @param {boolean} done
 * @param {string} deadline
 * @param {string} id
 * @param {function} setTodos
 * @returns Todo item.
 */
const TodoItem = ({ title, text, done, deadline, id, setTodos }) => {
  const [makeMutation, , { loading }] = useReq();

  const handleDelete = async (e) => {
    let mutation = `
    mutation {
      deleteTodo(id:"${id}") {
        id
      }
    }
    `;

    makeMutation(mutation);
    setTodos((prev) => prev.filter((el) => el.id != id));
  };

  const handleCheckbox = async (e) => {
    let mutation = `
    mutation {
      doneTodo(id:"${id}") {
        title
      }
    }
    `;

    makeMutation(mutation);
    setTodos((prev) =>
      prev.map((el) => {
        if (el.id === id) el.done = !el.done;
        return el;
      })
    );
  };

  return (
    <div
      className={`todo-list__item ${
        deadline ? "" : "todo-list__item_no-timetag"
      }`}
    >
      <input
        type="checkbox"
        className="checkbox"
        checked={done}
        onChange={handleCheckbox}
      ></input>
      <Link to={`/item/${id}`} className="link">
        <h3 className="todo-list__item__title">{title}</h3>
        <p className="todo-list__item__text">{text}</p>
      </Link>
      {deadline ? <DataBlock deadline={deadline} /> : ""}
      {loading ? (
        <div className="todo-list__item__loader">Loading...</div>
      ) : (
        <button className="todo-list__item__btn-delete" onClick={handleDelete}>
          {
            <CloseSvg
              width={12}
              height={12}
              className="todo-list__item__btn-delete__svg"
            />
          }
        </button>
      )}
    </div>
  );
};

/**
 * Creates a todo list. Makes following queries: query - allTodos and
 * getSorting during the mounting and unmounting, mutation - unchekAllChecked, deleteAllChecked.
 * @param {array} todos Todos list.
 * @param {function} setTodos Todos state setter.
 * @returns Todo list.
 */
const TodoList = ({ todos, setTodos }) => {
  const [sort, setSort] = useState({
    order: 0,
    parameter: "done",
  });

  const [makeReq, , { loading, error }] = useReq();

  useEffect(() => {
    let query = `
    query {
      allTodos {
        id
        title
        text
        done
        deadline
      }
    }
    `;

    let setFetchedTodos = (result) => {
      setTodos(result.data.allTodos);
    };
    makeReq(query, setFetchedTodos);
  }, []);

  useEffect(() => {
    let query = `
    query {
      getSort {
        order
        parameter
      }
    }
    `;

    let setSortReq = (result) => {
      setSort(result.data.getSort);
    };
    makeReq(query, setSortReq);
  }, []);

  const handleGroupUncheck = () => {
    let query = `
    mutation {
      unchekAllChecked {
        __typename
      }
    }
    `;

    makeReq(query);
    setTodos((prev) =>
      prev.map((e) => {
        if (e.done) e.done = false;
        return e;
      })
    );
  };

  const handleGroupDelete = () => {
    let query = `
    mutation {
      deleteAllChecked {
        __typename
      }
    }
    `;

    makeReq(query);
    setTodos((prev) => {
      return prev.filter((e) => (e.done ? false : true));
    });
  };

  /**
   * Sort todos depending on order and parameter
   * @param {Integer} order Iy may be: 0(descending) or 1(ascending).
   * @param {String} parameter It may be: "deadline", "done" or "title".
   */
  const sortTodos = (order, parameter) => {
    let mnoj = order ? -1 : 1;
    let sortFunc;

    sortFunc = (a, b) => {
      let firstEl = a[parameter];
      let secondEl = b[parameter];
      if (typeof a === "String" && typeof a === "String") {
        firstEl = firstEl.toLowerCase();
        secondEl = secondEl.toLowerCase();
      }
      if (firstEl > secondEl) return 1 * mnoj;
      if (firstEl < secondEl) return -1 * mnoj;
      return 0;
    };

    if (parameter === "deadline") {
      sortFunc = (a, b) => {
        let firstEl = a[parameter];
        let secondEl = b[parameter];
        if (!order) {
          firstEl = firstEl || Infinity;
          secondEl = secondEl || Infinity;
        }
        if (firstEl > secondEl) return 1 * mnoj;
        if (firstEl < secondEl) return -1 * mnoj;
        return 0;
      };
    }

    todos.sort(sortFunc);
  };

  sortTodos(sort.order, sort.parameter);

  if (loading) return <Loading />;

  return (
    <div className="wrapper">
      <div className="todo-list">
        <SortComponent
          order={sort.order}
          parameter={sort.parameter}
          setSort={setSort}
        />
        {error ||
          todos.map((e) => (
            <TodoItem
              title={e.title}
              text={e.text}
              done={e.done}
              deadline={e.deadline}
              key={e.id}
              id={e.id}
              setTodos={setTodos}
            />
          ))}
      </div>
      <div className="todo-list__button-section ">
        <Button
          onClick={handleGroupDelete}
          className="todo-list__button-section__button todo-list__button-section__button_left"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Link
          to="/new"
          className="todo-list__button-section__button todo-list__button-section__main-button"
        >
          Добавить
        </Link>
        <Button
          onClick={handleGroupUncheck}
          className="todo-list__button-section__button todo-list__button-section__button_right"
        >
          <FontAwesomeIcon icon={faCheckSquare} />
        </Button>
      </div>
    </div>
  );
};

export default TodoList;

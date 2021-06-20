import React from "react";
import useReq from "../../hooks/req.hook";
import { Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAmountUp,
  faSortAmountDown,
} from "@fortawesome/free-solid-svg-icons";

// TODO: Дописать доку
/**
 * Render sort menu, which consist of text and two buttons: order, parameter.
 * @param {Integer} order
 * @param {String} parameter
 * @param {Function} setSort
 * @returns Sort menu.
 */
const SortComponent = ({ order, parameter, setSort }) => {
  const { response, makeQuery } = useReq();

  const handleSelect = (e) => {
    let newPar = e.target.value;

    let query = `
    mutation {
      setSort(parameter: "${newPar}") {
        id
      }
    }
    `;

    makeQuery(query);
    setSort((prev) => ({
      ...prev,
      parameter: newPar,
    }));
  };

  const handleOrderButton = () => {
    let newOrder = order === 0 ? 1 : 0;

    let query = `
    mutation {
      setSort(order:${newOrder}) {
        id
      }
    }
    `;

    makeQuery(query);
    setSort((prev) => ({
      ...prev,
      order: newOrder,
    }));
  };

  return (
    <div className="sort-menu">
      <Button onClick={handleOrderButton} className="sort-menu__order-button">
        {order === 1 ? (
          <FontAwesomeIcon icon={faSortAmountUp} />
        ) : (
          <FontAwesomeIcon icon={faSortAmountDown} />
        )}
      </Button>
      Сортировать по
      <select
        defaultValue={parameter}
        onChange={handleSelect}
        className="sort-menu__select"
      >
        <option value="deadline">дате</option>
        <option value="done">выполнению</option>
        <option value="title">алфавиту</option>
      </select>
    </div>
  );
};

export default SortComponent;

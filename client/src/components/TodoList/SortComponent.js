import React from "react";
import useReq from "../../hooks/req.hook";
import { Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAmountUp,
  faSortAmountDownAlt,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Render sort menu, which consist of text and two buttons: order, parameter.
 * Makes following queries: mutation - setSort.
 * @param {Integer} order It may be 0(descending) or 1(ascending).
 * @param {String} parameter Which is used for sorting.
 * @param {Function} setSort
 * @returns Sort menu.
 */
const SortComponent = ({ order, parameter, setSort }) => {
  const [makeMutation, ,] = useReq();

  const handleSelect = (e) => {
    let newPar = e.target.value;

    let mutation = `
    mutation {
      setSort(parameter: "${newPar}") {
        id
      }
    }
    `;

    makeMutation(mutation);
    setSort((prev) => ({
      ...prev,
      parameter: newPar,
    }));
  };

  const handleOrderButton = () => {
    let newOrder = order === 0 ? 1 : 0;

    let mutation = `
    mutation {
      setSort(order:${newOrder}) {
        id
      }
    }
    `;

    makeMutation(mutation);
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
          <FontAwesomeIcon icon={faSortAmountDownAlt} />
        )}
      </Button>
      Сортировать по
      <select
        value={parameter}
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

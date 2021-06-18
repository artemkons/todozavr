import React from "react";
import { Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAmountUp,
  faSortAmountDown,
} from "@fortawesome/free-solid-svg-icons";

// TODO: Написать доку
/**
 * Render sort menu, which consist of text and two buttons: order, parameter.
 * @returns Sort menu.
 */
const SortComponent = () => {
  return (
    <div className="sort-menu">
      <Button className="sort-menu__order-button">
        {/* TODO: Сделать сменяющуюся иконку */}
        <FontAwesomeIcon icon={faSortAmountUp} />
      </Button>
      Сортировать по
      <select className="sort-menu__select">
        {/* TODO: Подумать над value */}
        <option value="j">дате</option>
        <option selected value="j">
          выполнению
        </option>
      </select>
    </div>
  );
};

export default SortComponent;

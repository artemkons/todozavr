import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles/date.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bulma-components";

/**
 * Render element for setting and displaying deadline date.
 * @param {function} setDate
 * @returns Fields for date setting.
 */
const DataField = ({ setDate, value }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <div className="date-input">
      <input type="time" />
      <Button onClick={() => setIsModalActive(true)} size="small" type="button">
        <FontAwesomeIcon icon={faCalendarAlt} />
      </Button>
      <Modal show={isModalActive} onClose={() => setIsModalActive(false)}>
        <Modal.Content>
          <Calendar minDate={new Date()} onChange={setDate} value={value} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default DataField;

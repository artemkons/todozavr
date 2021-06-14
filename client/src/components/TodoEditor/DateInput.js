import React, { useState } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bulma-components";

/**
 * Renders input form for date/time.
 * @param {string} time String in following format: "HH:MM".
 * @param {function} handleTime
 * @param {Date} date
 * @param {function} setDate
 * @returns input block
 */
const DateInput = ({ time, handleTime, date, setDate }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <div className="date-input">
      <input type="time" value={time} onChange={handleTime} />
      <Button onClick={() => setIsModalActive(true)} size="small" type="button">
        <FontAwesomeIcon icon={faCalendarAlt} />
      </Button>
      <Modal show={isModalActive} onClose={() => setIsModalActive(false)}>
        <Modal.Content>
          <Calendar minDate={new Date()} onChange={setDate} value={date} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default DateInput;

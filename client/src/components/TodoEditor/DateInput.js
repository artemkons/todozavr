import React, { useState } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bulma-components";

// FIXME: Fix docs
/**
 * Renders input form for date/time.
 * @param {string} time String in following format: "HH:MM".
 * @param {function} handleTime
 * @param {Date} date
 * @param {function} setDate
 * @returns input block
 */
const DateInput = ({
  hasDeadline,
  setHasDeadline,
  time,
  handleTime,
  date,
  setDate,
}) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const handleDeadline = (e) => {
    console.log(e.target.checked);
    setHasDeadline(e.target.checked);
  };

  return (
    <div className="date-input">
      <div className="date-input__text-block">
        <label className="checkbox">
          <h1>Добавить дедлайн</h1>
          <input
            type="checkbox"
            checked={hasDeadline}
            onChange={handleDeadline}
          />
        </label>
      </div>
      <div
        className={`date-input__time-block_${
          hasDeadline ? "active" : "disabled"
        }`}
      >
        <input type="time" value={time} onChange={handleTime} />
        <Button
          onClick={() => setIsModalActive(true)}
          size="small"
          type="button"
        >
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Button>
        <Modal show={isModalActive} onClose={() => setIsModalActive(false)}>
          <Modal.Content>
            <Calendar minDate={new Date()} onChange={setDate} value={date} />
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
};

export default DateInput;

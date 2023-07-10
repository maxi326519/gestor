import { useState, useEffect } from "react";

import styles from "./DateFilter.module.css";

const months = [
  { value: "", name: "Todos" },
  { value: "01", name: "Enero" },
  { value: "02", name: "Febrero" },
  { value: "03", name: "Marzo" },
  { value: "04", name: "Abril" },
  { value: "05", name: "Mayo" },
  { value: "06", name: "Junio" },
  { value: "07", name: "Julio" },
  { value: "08", name: "Agosto" },
  { value: "09", name: "Septiembre" },
  { value: "10", name: "Octubre" },
  { value: "11", name: "Noviembre" },
  { value: "12", name: "Deciembre" },
];

interface Filter {
  year: string;
  month: string | null;
  day: string | null;
}

interface Porps {
  years: string[] | number[];
  handleFilterDate: ({ year, month, day }: Filter) => void;
}

export default function DateFilter({ years, handleFilterDate }: Porps) {
  const [days, setDays] = useState<string[] | number[]>([]);
  const [filter, setFilter] = useState<Filter>({
    year: new Date().toLocaleDateString().split("/")[2],
    month: "",
    day: "",
  });

  useEffect(() => {
    // If any month selected
    if (filter.month !== "") {
      // Number of days
      var days = new Date(
        Number(filter.year),
        Number(filter.month),
        0
      ).getDate();
      let dayArr = [];
      for (let i = 1; i <= days; i++) {
        dayArr.push(i);
      }
      setDays(dayArr);
    } else {
      setDays([]);
    }
  }, [filter]);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.name === "month" && event.target.value === "") {
      setFilter({ ...filter, month: "", day: "" });
    } else {
      setFilter({ ...filter, [event.target.name]: event.target.value });
    }
  }

  function handleApply() {
    const year = filter.year;
    const month = filter.month === "" ? null : filter.month;
    const day = filter.day === "" ? null : filter.day;

    handleFilterDate({ year, month, day });
  }

  return (
    <div className={styles.dateFilter}>
      <div className={`form-floating mb-3 ${styles.date}`}>
        <select
          id="year"
          name="year"
          className="form-select"
          value={filter.year}
          onChange={handleChange}
        >
          {years.length > 0 ? (
            years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))
          ) : (
            <option>{new Date().toLocaleDateString().split("/")[2]}</option>
          )}
        </select>
        <label htmlFor="year">Año</label>
      </div>
      <div className={`form-floating mb-3 ${styles.date}`}>
        <select
          id="month"
          name="month"
          className="form-select"
          value={filter.month || ""}
          onChange={handleChange}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
        <label htmlFor="month">Mes</label>
      </div>
      <div className={`form-floating mb-3 ${styles.date}`}>
        <select
          id="day"
          name="day"
          className="form-select"
          value={filter.day || ""}
          onChange={handleChange}
        >
          <option value="">Todos</option>
          {days.map((day) => (
            <option key={day} value={`0${day}`.slice(-2)}>
              {`0${day}`.slice(-2)}
            </option>
          ))}
        </select>
        <label htmlFor="day">Dia</label>
      </div>
      <button className="btn btn-success" type="button" onClick={handleApply}>
        Aplicar
      </button>
    </div>
  );
}

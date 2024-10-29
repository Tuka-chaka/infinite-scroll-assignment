import styles from "./Controls.module.css"
import entries from "../../store/entries";
import { Select, Typography } from "antd";

const Controls = () => {

    const selectOptions = [
      { value: 'stars', label: 'Звёзды' },
      { value: 'updated', label: 'Дата изменения' },
    ]

    return (
      <div className={styles.controls}>
        <div className={styles.selectContainer}>
        <div className={styles.controlsLabel}>
          Сортировать:
        </div>
        <Select options={selectOptions}
          defaultValue={"Звёзды"}
          popupMatchSelectWidth={false}
          onSelect={(value) => entries.setSort(value)}/>
        </div>
      </div>
    );
  };
  
  export default Controls;
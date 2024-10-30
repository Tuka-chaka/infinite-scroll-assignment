import styles from "./Controls.module.css"
import entries from "../../store/entries";
import { Select } from "antd";
import { observer } from "mobx-react-lite";

const Controls = observer(() => {

    const sortOptions = [
      { value: 'stars', label: 'Звёзды' },
      { value: 'updated', label: 'Дата изменения' },
    ]

    const orderOptions = [
      { value: true, label: 'Возрастанию' },
      { value: false, label: 'Убыванию' },
    ]

    return (
      <div className={styles.controls}>
        <div className={styles.selectContainer}>
          <div className={styles.controlsLabel}>
            Сортировать:
          </div>
          <Select options={sortOptions}
            defaultValue={"stars"}
            popupMatchSelectWidth={false}
            onSelect={(value) => entries.setSort(value)}/>
        </div>
        <div className={styles.selectContainer}>
          <div className={styles.controlsLabel}>
            По:
          </div>
          <Select options={orderOptions}
            defaultValue={false}
            popupMatchSelectWidth={false}
            onSelect={(value) => entries.setIsAscending(value)}/>
        </div>
      </div>
    );
  });
  
  export default Controls;
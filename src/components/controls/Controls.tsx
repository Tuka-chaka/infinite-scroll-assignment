import styles from "./Controls.module.css"
import entries from "../../store/entries";
import { Select, Switch } from "antd";
import { observer } from "mobx-react-lite";

const Controls = observer(() => {

    const sortOptions = [
      { value: 'stars', label: 'Звёзды' },
      { value: 'updated', label: 'Дата изменения' },
    ]

    return (
      <div className={styles.controls}>
        <div className={styles.selectContainer}>
          <div className={styles.controlsLabel}>
            Сортировать:
          </div>
          <Select options={sortOptions}
            size="small"
            defaultValue={"stars"}
            popupMatchSelectWidth={false}
            onSelect={(value) => entries.setSort(value)}/>
        </div>
        <div className={styles.selectContainer}>
          <Switch
            defaultChecked={false}
            checkedChildren="По возрастанию"
            unCheckedChildren="По убыванию"
            onChange={(checked) => entries.setIsAscending(checked)}
          />
        </div>
      </div>
    );
  });
  
  export default Controls;
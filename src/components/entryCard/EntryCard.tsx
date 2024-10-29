import { Card, Avatar, Button } from "antd";
import { Entry } from "../../exports";
import { DeleteOutlined } from "@ant-design/icons";
import styles from "./EntryCard.module.css"
import entries from "../../store/entries";

const EntryCard = ({entry}: {entry: Entry}) => {

  return (
    <Card className={styles.card}
      title={<a target="_blank" rel="noopener noreferrer"href={entry.url}>
      {entry.name}
      </a>}
      extra={<Button shape="circle" danger icon={<DeleteOutlined />} onClick={() => entries.deleteEntry(entry.id)}/>}
    >
      <Card.Meta
        avatar={<Avatar src={entry.avatar_url}/>}
        title={<a target="_blank" rel="noopener noreferrer" href={entry.owner_url}>{entry.owner}</a>}/>
    </Card>
  );
};

export default EntryCard;

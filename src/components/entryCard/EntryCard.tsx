import { Card, Avatar, Button } from "antd";
import { Entry } from "../../exports";
import { DeleteOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import styles from "./EntryCard.module.css"
import entries from "../../store/entries";

const EntryCard = ({entry}: {entry: Entry}) => {

  return (
    <Card className={styles.card}
      title={<a target="_blank" rel="noopener noreferrer"href={entry.url}>
        {entry.name}
      </a>}
      extra={<div className={styles.actionsContainer}>
        <Button shape="circle" color="primary" variant="outlined" icon={entry.liked ? <HeartFilled /> : <HeartOutlined/>} onClick={() => entries.likeEntry(entry.id)}/>
        <Button shape="circle" danger icon={<DeleteOutlined />} onClick={() => entries.deleteEntry(entry.id)}/>
      </div>}>
      {entry.stars}
      {entry.updated_at.toDateString()}
      <Card.Meta
        avatar={<Avatar src={entry.avatar_url}/>}
        title={<a target="_blank" rel="noopener noreferrer" href={entry.owner_url}>{entry.owner}</a>}/>
    </Card>
  );
};

export default EntryCard;

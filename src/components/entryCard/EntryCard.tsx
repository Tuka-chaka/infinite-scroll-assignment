import { Card, Avatar, Button } from "antd";
import { Entry } from "../../exports";
import { ClockCircleFilled, DeleteOutlined, HeartFilled, HeartOutlined, StarFilled } from "@ant-design/icons";
import styles from "./EntryCard.module.css"
import entries from "../../store/entries";
import { useState } from "react";
import { observer } from "mobx-react-lite";

const EntryCard = observer(({entry}: {entry: Entry}) => {

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    console.log('handle')
    setIsDeleting(true)
    setTimeout(() => entries.deleteEntry(entry.id), 500)
  }

  return (
    <Card className={!isDeleting ? styles.card : styles.card + " " + styles.deleting}
      title={<a target="_blank" rel="noopener noreferrer"href={entry.url}>
        {entry.name}
      </a>}
      extra={<div className={styles.actionsContainer}>
        <Button shape="circle" color="primary" variant="outlined" icon={entry.liked ? <HeartFilled /> : <HeartOutlined/>} onClick={() => entries.likeEntry(entry)}/>
        <Button shape="circle" danger icon={<DeleteOutlined />} onClick={() => handleDelete()}/>
      </div>}>
      <div className={styles.cardContent}>
        <Card.Meta
          className={styles.author}
          title={<>By <a target="_blank" rel="noopener noreferrer" href={entry.owner_url}>{entry.owner}</a></>}
          avatar={<Avatar src={entry.avatar_url} size="large"/>}
          />
        <div className={styles.cardColumn}>
          <div>
            {entry.stars} <StarFilled/>
          </div>
          <div>
            {entry.updated_at.toLocaleDateString()} <ClockCircleFilled/> 
          </div>
        </div>
      </div>
    </Card>
  );
});

export default EntryCard;

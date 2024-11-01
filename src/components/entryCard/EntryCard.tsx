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
    setIsDeleting(true)
    setTimeout(() => entries.deleteEntry(entry.id), 500)
  }

  return (
    <Card data-testid="entryCard" className={!isDeleting ? styles.card : styles.card + " " + styles.deleting}
      title={<a data-testid="repoName" target="_blank" rel="noopener noreferrer"href={entry.url}>
        {entry.name}
      </a>}
      extra={<div className={styles.actionsContainer}>
        <Button data-testid="likeButton" shape="circle" color="primary" variant="outlined" icon={entry.liked ? <HeartFilled /> : <HeartOutlined/>} onClick={() => entries.likeEntry(entry)}/>
        <Button data-testid="deleteButton" shape="circle" danger icon={<DeleteOutlined />} onClick={() => handleDelete()}/>
      </div>}>
      <div className={styles.cardContent}>
        <Card.Meta
          className={styles.author}
          title={<>By <a data-testid="authorName" target="_blank" rel="noopener noreferrer" href={entry.owner_url}>{entry.owner}</a></>}
          avatar={<Avatar src={entry.avatar_url} size="large"/>}
          />
        <div className={styles.cardColumn}>
          <div data-testid="stars">
            {entry.stars} <StarFilled/>
          </div>
          <div data-testid="date">
            {entry.updated_at.toLocaleDateString()} <ClockCircleFilled/> 
          </div>
        </div>
      </div>
    </Card>
  );
});

export default EntryCard;

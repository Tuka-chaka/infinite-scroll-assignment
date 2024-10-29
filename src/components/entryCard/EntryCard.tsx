import { Card, Avatar } from "antd";
import { Entry } from "../../exports";
import styles from "./EntryCard.module.css"

const EntryCard = ({entry}: {entry: Entry}) => {

  return (
    <Card className={styles.card} title={entry.name}>
      <Card.Meta avatar={<Avatar src={entry.avatar_url}/>}/>
    </Card>
  );
};

export default EntryCard;
